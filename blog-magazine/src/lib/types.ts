export type Author = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  avatar: string;
  socials: {
    x?: string;
    linkedin?: string;
    website?: string;
    instagram?: string;
  };
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  accent: string;
};

export type Tag = {
  id: string;
  slug: string;
  name: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  categoryId: string;
  authorId: string;
  tagIds: string[];
  mdx: string;
};

export type TableOfContentsItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type EnrichedPost = Post & {
  author: Author;
  category: Category;
  tags: Tag[];
  readingTime: string;
  toc: TableOfContentsItem[];
};

export type PaginatedPosts = {
  page: number;
  totalPages: number;
  totalItems: number;
  items: EnrichedPost[];
};

export type NewsletterActionState = {
  status: "idle" | "success" | "error";
  message: string;
};
