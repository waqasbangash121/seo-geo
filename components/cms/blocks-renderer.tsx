import type { ReactNode } from "react";

import { toCmsMediaUrl } from "@/lib/cms/strapi-client";
import type { RichTextBlock, RichTextChild } from "@/lib/cms/types";

type BlocksRendererProps = {
  blocks: RichTextBlock[];
};

function renderInlineChildren(children: RichTextChild[] = [], keyPrefix: string): ReactNode[] {
  return children.map((child, index) => {
    const key = `${keyPrefix}-${index}`;

    if (typeof child.text === "string") {
      let node: ReactNode = child.text;

      if (child.code) node = <code className="rounded bg-background px-1.5 py-0.5 text-sm" key={key}>{node}</code>;
      if (child.bold) node = <strong key={key}>{node}</strong>;
      if (child.italic) node = <em key={key}>{node}</em>;
      if (child.underline) node = <span className="underline" key={key}>{node}</span>;
      if (child.strikethrough) node = <span className="line-through" key={key}>{node}</span>;

      return node;
    }

    const nestedChildren = renderInlineChildren(child.children, key);

    if (child.type === "link" && typeof child.url === "string") {
      return (
        <a
          className="font-medium text-primary underline underline-offset-4"
          href={child.url}
          key={key}
          rel={child.url.startsWith("http") ? "noreferrer" : undefined}
          target={child.url.startsWith("http") ? "_blank" : undefined}
        >
          {nestedChildren}
        </a>
      );
    }

    return nestedChildren;
  });
}

export function BlocksRenderer({ blocks }: BlocksRendererProps) {
  return (
    <div className="space-y-6 text-muted-foreground leading-8">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        const children = renderInlineChildren(block.children, key);

        if (block.type === "heading") {
          const level = Math.min(Math.max(block.level ?? 2, 2), 6);
          const Heading = `h${level}` as "h2" | "h3" | "h4" | "h5" | "h6";
          return <Heading className="pt-3 text-2xl font-semibold tracking-tight text-foreground" key={key}>{children}</Heading>;
        }

        if (block.type === "list") {
          const List = block.format === "ordered" ? "ol" : "ul";
          return (
            <List className={block.format === "ordered" ? "list-decimal space-y-2 pl-6" : "list-disc space-y-2 pl-6"} key={key}>
              {children}
            </List>
          );
        }

        if (block.type === "list-item") {
          return <li key={key}>{children}</li>;
        }

        if (block.type === "quote") {
          return <blockquote className="border-l-2 border-primary pl-5 text-lg italic" key={key}>{children}</blockquote>;
        }

        if (block.type === "code") {
          return <pre className="overflow-x-auto rounded-[10px] border border-border bg-surface p-5 text-sm leading-7 text-foreground" key={key}><code>{children}</code></pre>;
        }

        if (block.type === "image") {
          const imageUrl = toCmsMediaUrl(block.image?.url);

          return imageUrl ? (
            // Strapi hosts editor-managed media on a runtime-configured domain.
            // A plain image element avoids hard-coding an image host into Next config.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={block.image?.alternativeText || ""}
              className="w-full rounded-[10px] border border-border"
              height={block.image?.height ?? undefined}
              key={key}
              loading="lazy"
              src={imageUrl}
              width={block.image?.width ?? undefined}
            />
          ) : null;
        }

        return <p key={key}>{children}</p>;
      })}
    </div>
  );
}
