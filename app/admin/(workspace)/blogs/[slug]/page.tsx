import { notFound } from "next/navigation";

import { BlogEditorForm } from "@/components/blog-editor-form";
import { getRemotePost } from "@/lib/editor-github";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getRemotePost(slug);

  if (!post) notFound();

  const { sourcePath: _sourcePath, ...initialPost } = post;
  return <BlogEditorForm initialPost={initialPost} originalSlug={slug} />;
}
