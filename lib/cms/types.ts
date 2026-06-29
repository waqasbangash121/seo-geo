export type JsonPrimitive = boolean | number | string | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export type RichTextChild = {
  type?: string;
  text?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: RichTextChild[];
  [key: string]: unknown;
};

export type RichTextBlock = {
  type: string;
  level?: number;
  format?: "ordered" | "unordered";
  url?: string;
  image?: StrapiMedia | null;
  children?: RichTextChild[];
  [key: string]: unknown;
};

export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

export type SeoFields = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  openGraphTitle?: string | null;
  openGraphDescription?: string | null;
  openGraphImage?: StrapiMedia | null;
  jsonLd?: JsonValue | null;
  enableArticleSchema?: boolean | null;
};

export type BlogPost = {
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: RichTextBlock[];
  coverImage?: StrapiMedia | null;
  authorName?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  seo?: SeoFields | null;
};

export type CmsPage = {
  documentId: string;
  title: string;
  slug: string;
  intro?: string | null;
  content: RichTextBlock[];
  heroImage?: StrapiMedia | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  seo?: SeoFields | null;
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

export type CmsSitemapEntry = {
  path: string;
  lastModified?: string | null;
};
