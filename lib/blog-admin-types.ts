export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  focusKeyword?: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  readingTime: number;
  draft: boolean;
  content: string;
}

export interface RemoteBlogPost extends BlogPostInput {
  sourcePath: string;
}
