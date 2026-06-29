import "server-only";

import { createSign } from "node:crypto";

import {
  BlogInputError,
  createBlogRegistry,
  parseMdxPost,
  serializeMdxPost,
} from "@/lib/blog-admin";
import type { BlogPostInput, RemoteBlogPost } from "@/lib/blog-admin-types";
import {
  ManagedContentInputError,
  contentDirectory,
  contentRegistryPath,
  createManagedContentRegistry,
  parseManagedContent,
  serializeManagedContent,
} from "@/lib/content-admin";
import type {
  ManagedContentInput,
  ManagedContentType,
  RemoteManagedContent,
} from "@/lib/content-admin-types";

type GitHubAppConfig = {
  appId: string;
  installationId: string;
  privateKey: string;
  owner: string;
  repository: string;
  branch: string;
};

type GitHubFile = {
  path: string;
  name: string;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
};

type GitHubRef = { object: { sha: string } };
type GitHubCommit = { tree: { sha: string } };
type GitHubToken = { token: string; expires_at: string };
type FileChange = { path: string; content?: string };

let cachedToken: { value: string; expiresAt: number } | null = null;

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function configuration(): GitHubAppConfig {
  return {
    appId: requiredEnvironment("GITHUB_APP_ID"),
    installationId: requiredEnvironment("GITHUB_APP_INSTALLATION_ID"),
    privateKey: Buffer.from(requiredEnvironment("GITHUB_APP_PRIVATE_KEY_BASE64"), "base64").toString("utf8"),
    owner: requiredEnvironment("GITHUB_REPO_OWNER"),
    repository: requiredEnvironment("GITHUB_REPO_NAME"),
    branch: process.env.GITHUB_REPO_BRANCH?.trim() || "main",
  };
}

function base64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function appJwt(config: GitHubAppConfig): string {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: config.appId }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  signer.end();
  const signed = signer.sign(config.privateKey, "base64url");
  return `${header}.${payload}.${signed}`;
}

async function installationToken(config: GitHubAppConfig): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const response = await fetch(
    `https://api.github.com/app/installations/${config.installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${appJwt(config)}`,
        "User-Agent": "Hyper-Content-Studio",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub App authentication failed (${response.status}).`);
  }

  const data = (await response.json()) as GitHubToken;
  cachedToken = { value: data.token, expiresAt: new Date(data.expires_at).getTime() };
  return data.token;
}

async function githubRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const config = configuration();
  const token = await installationToken(config);
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Hyper-Content-Studio",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub request failed (${response.status}): ${body.slice(0, 250)}`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

function repositoryPath(path: string): string {
  const config = configuration();
  return `/repos/${config.owner}/${config.repository}${path}`;
}

function decodeFile(file: GitHubFile): string {
  if (!file.content || file.encoding !== "base64") {
    throw new Error(`GitHub did not return file content for ${file.path}.`);
  }

  return Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
}

export async function readRepositoryFile(path: string): Promise<string> {
  const config = configuration();
  const file = await githubRequest<GitHubFile>(
    `${repositoryPath(`/contents/${path}`)}?ref=${encodeURIComponent(config.branch)}`,
  );
  return decodeFile(file);
}

export async function listRemotePosts(): Promise<RemoteBlogPost[]> {
  const config = configuration();
  const entries = await githubRequest<GitHubFile[]>(
    `${repositoryPath("/contents/content/blog")}?ref=${encodeURIComponent(config.branch)}`,
  );
  const files = entries.filter((entry) => entry.type === "file" && entry.name.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const source = await readRepositoryFile(file.path);
      const post = parseMdxPost(source);
      return { ...post, sourcePath: file.path } satisfies RemoteBlogPost;
    }),
  );

  return posts.sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
}

export async function getRemotePost(slug: string): Promise<RemoteBlogPost | null> {
  try {
    const sourcePath = `content/blog/${slug}.mdx`;
    const source = await readRepositoryFile(sourcePath);
    return { ...parseMdxPost(source), sourcePath };
  } catch (error) {
    if (error instanceof BlogInputError) throw error;
    if (error instanceof Error && error.message.includes("(404)")) return null;
    throw error;
  }
}

export async function listRemoteManagedContent(type: ManagedContentType): Promise<RemoteManagedContent[]> {
  const config = configuration();
  const directory = contentDirectory(type);

  const entries = await githubRequest<GitHubFile[]>(
    `${repositoryPath(`/contents/${directory}`)}?ref=${encodeURIComponent(config.branch)}`,
  );
  const files = entries.filter((entry) => entry.type === "file" && entry.name.endsWith(".mdx"));

  const items = await Promise.all(
    files.map(async (file) => {
      const source = await readRepositoryFile(file.path);
      const item = parseManagedContent(source, type);
      return { ...item, sourcePath: file.path } satisfies RemoteManagedContent;
    }),
  );

  return items.sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
}

export async function getRemoteManagedContent(
  type: ManagedContentType,
  slug: string,
): Promise<RemoteManagedContent | null> {
  try {
    const sourcePath = `${contentDirectory(type)}/${slug}.mdx`;
    const source = await readRepositoryFile(sourcePath);
    return { ...parseManagedContent(source, type), sourcePath };
  } catch (error) {
    if (error instanceof ManagedContentInputError) throw error;
    if (error instanceof Error && error.message.includes("(404)")) return null;
    throw error;
  }
}

async function createCommit(message: string, changes: FileChange[]): Promise<string> {
  const config = configuration();
  const reference = await githubRequest<GitHubRef>(
    repositoryPath(`/git/ref/heads/${encodeURIComponent(config.branch)}`),
  );
  const parentSha = reference.object.sha;
  const parentCommit = await githubRequest<GitHubCommit>(repositoryPath(`/git/commits/${parentSha}`));

  const tree = await Promise.all(
    changes.map(async (change) => {
      if (typeof change.content !== "string") {
        return { path: change.path, mode: "100644", type: "blob", sha: null };
      }

      const blob = await githubRequest<{ sha: string }>(repositoryPath("/git/blobs"), {
        method: "POST",
        body: JSON.stringify({ content: change.content, encoding: "utf-8" }),
      });
      return { path: change.path, mode: "100644", type: "blob", sha: blob.sha };
    }),
  );

  const createdTree = await githubRequest<{ sha: string }>(repositoryPath("/git/trees"), {
    method: "POST",
    body: JSON.stringify({ base_tree: parentCommit.tree.sha, tree }),
  });

  const commit = await githubRequest<{ sha: string }>(repositoryPath("/git/commits"), {
    method: "POST",
    body: JSON.stringify({ message, tree: createdTree.sha, parents: [parentSha] }),
  });

  await githubRequest(repositoryPath(`/git/refs/heads/${encodeURIComponent(config.branch)}`), {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });

  return commit.sha;
}

export async function saveRemotePost(input: BlogPostInput, originalSlug?: string): Promise<{ sha: string }> {
  const existingPosts = await listRemotePosts();
  const existingBySlug = new Map(existingPosts.map((post) => [post.slug, post]));

  if (!originalSlug && existingBySlug.has(input.slug)) {
    throw new BlogInputError("A post with this slug already exists.");
  }

  if (originalSlug && !existingBySlug.has(originalSlug)) {
    throw new BlogInputError("This post no longer exists in the repository.");
  }

  const today = new Date().toISOString().slice(0, 10);
  const nextPost = { ...input, updatedAt: today };
  const posts = existingPosts
    .filter((post) => post.slug !== originalSlug)
    .map(({ sourcePath: _sourcePath, ...post }) => post);
  posts.push(nextPost);

  const changes: FileChange[] = [
    { path: `content/blog/${nextPost.slug}.mdx`, content: serializeMdxPost(nextPost) },
    { path: "content/blog/posts.ts", content: createBlogRegistry(posts) },
  ];

  if (originalSlug && originalSlug !== nextPost.slug) {
    changes.push({ path: `content/blog/${originalSlug}.mdx` });
  }

  const action = nextPost.draft ? "Save draft" : "Publish";
  const sha = await createCommit(`${action}: ${nextPost.title}`, changes);
  return { sha };
}

export async function saveRemoteManagedContent(
  item: ManagedContentInput,
  originalSlug?: string,
): Promise<{ sha: string }> {
  const existingItems = await listRemoteManagedContent(item.type);
  const existingBySlug = new Map(existingItems.map((entry) => [entry.slug, entry]));

  if (!originalSlug && existingBySlug.has(item.slug)) {
    throw new ManagedContentInputError(`A ${item.type} with this slug already exists.`);
  }

  if (originalSlug && !existingBySlug.has(originalSlug)) {
    throw new ManagedContentInputError("This item no longer exists in the repository.");
  }

  const today = new Date().toISOString().slice(0, 10);
  const nextItem = { ...item, updatedAt: today };
  const items = existingItems
    .filter((entry) => entry.slug !== originalSlug)
    .map(({ sourcePath: _sourcePath, ...entry }) => entry);
  items.push(nextItem);

  const directory = contentDirectory(item.type);
  const changes: FileChange[] = [
    { path: `${directory}/${nextItem.slug}.mdx`, content: serializeManagedContent(nextItem) },
    { path: contentRegistryPath(item.type), content: createManagedContentRegistry(item.type, items) },
  ];

  if (originalSlug && originalSlug !== nextItem.slug) {
    changes.push({ path: `${directory}/${originalSlug}.mdx` });
  }

  const action = nextItem.draft ? "Save draft" : "Publish";
  return { sha: await createCommit(`${action}: ${nextItem.title}`, changes) };
}

export function githubCommitUrl(sha: string): string {
  const config = configuration();
  return `https://github.com/${config.owner}/${config.repository}/commit/${sha}`;
}
