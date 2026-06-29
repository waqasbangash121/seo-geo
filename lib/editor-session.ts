import "server-only";

export const editorSessionName = "hyper_blog_editor";
export const editorStateName = "hyper_blog_state";
export const editorSessionSeconds = 60 * 60 * 8;

type EditorIdentity = {
  login: string;
  expiresAt: number;
};

export function isPermittedEditor(login: string): boolean {
  const names = (process.env.ADMIN_ALLOWED_GITHUB_USERS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return names.includes(login.toLowerCase());
}

export type { EditorIdentity };
