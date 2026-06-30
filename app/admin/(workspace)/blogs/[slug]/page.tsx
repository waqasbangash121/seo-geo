import { notFound } from "next/navigation";

import { DeleteContentButton } from "@/components/admin/delete-content-button";
import { BlogEditorForm } from "@/components/blog-editor-form";
import { getStudioBlogPostBySlug } from "@/lib/content-store";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getStudioBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <BlogEditorForm initialPost={post} originalSlug={slug} />
      <section className="rounded-lg border border-rose-200 bg-rose-50/70 p-5 dark:border-rose-400/25 dark:bg-rose-400/10">
        <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-50">Danger zone</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-900/90 dark:text-rose-100/85">
          Remove this article from the database and the public blog. Restore it only from a database backup.
        </p>
        <div className="mt-4 max-w-xs">
          <DeleteContentButton type="blog" slug={slug} title={post.title} redirectTo="/admin/blogs" />
        </div>
      </section>
    </div>
  );
}
