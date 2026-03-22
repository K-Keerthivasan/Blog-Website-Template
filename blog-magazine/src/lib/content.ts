import { extractTableOfContents, getReadingTime } from "@/lib/markdown";
import { POSTS_PER_PAGE } from "@/lib/site";
import type {
  Author,
  Category,
  EnrichedPost,
  PaginatedPosts,
  Post,
  Tag,
} from "@/lib/types";

export const authors: Author[] = [
  {
    id: "author-elena-park",
    slug: "elena-park",
    name: "Elena Park",
    role: "Editor in Chief",
    bio: "Elena leads K2 Dispatch's coverage strategy, with a focus on digital publishing operations, media revenue, and audience design.",
    location: "Toronto, Canada",
    email: "elena@k2dispatch.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    socials: {
      x: "elenapark",
      linkedin: "in/elena-park",
      website: "https://example.com/elena-park",
    },
  },
  {
    id: "author-julian-cross",
    slug: "julian-cross",
    name: "Julian Cross",
    role: "Senior Reporter",
    bio: "Julian reports on the systems behind modern editorial teams, from search distribution to CMS migration strategy and workflow automation.",
    location: "Chicago, United States",
    email: "julian@k2dispatch.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    socials: {
      x: "juliancross",
      linkedin: "in/julian-cross",
    },
  },
  {
    id: "author-maya-okafor",
    slug: "maya-okafor",
    name: "Maya Okafor",
    role: "Culture and Trends Writer",
    bio: "Maya covers shifts in audience behavior, creator economies, and the design patterns that make editorial products feel alive.",
    location: "New York, United States",
    email: "maya@k2dispatch.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    socials: {
      instagram: "mayaokafor",
      website: "https://example.com/maya",
    },
  },
];

export const categories: Category[] = [
  {
    id: "cat-strategy",
    slug: "strategy",
    name: "Strategy",
    description: "Editorial planning, business models, and audience development.",
    accent: "from-amber-300 via-orange-300 to-rose-300",
  },
  {
    id: "cat-platform",
    slug: "platform",
    name: "Platform",
    description: "Search, discovery, infrastructure, and content operations.",
    accent: "from-sky-300 via-cyan-300 to-emerald-300",
  },
  {
    id: "cat-culture",
    slug: "culture",
    name: "Culture",
    description: "Audience trends, creative direction, and internet culture.",
    accent: "from-fuchsia-300 via-pink-300 to-orange-200",
  },
];

export const tags: Tag[] = [
  { id: "tag-algolia", slug: "algolia", name: "Algolia" },
  { id: "tag-seo", slug: "seo", name: "SEO" },
  { id: "tag-newsletters", slug: "newsletters", name: "Newsletters" },
  { id: "tag-mdx", slug: "mdx", name: "MDX" },
  { id: "tag-supabase", slug: "supabase", name: "Supabase" },
  { id: "tag-analytics", slug: "analytics", name: "Analytics" },
  { id: "tag-design", slug: "design", name: "Design" },
  { id: "tag-workflows", slug: "workflows", name: "Workflows" },
];

export const posts: Post[] = [
  {
    id: "post-editorial-stack",
    slug: "editorial-stack-for-modern-magazines",
    title: "Building the Editorial Stack for a Modern Magazine",
    dek: "Inside the architecture decisions that let a small newsroom publish polished long-form stories without slowing down daily coverage.",
    excerpt:
      "A practical blueprint for pairing MDX, App Router, Supabase, and search infrastructure without overbuilding.",
    coverImage:
      "linear-gradient(135deg, rgba(250,204,21,0.95), rgba(251,146,60,0.92), rgba(244,114,182,0.92))",
    publishedAt: "2026-03-14T08:00:00.000Z",
    updatedAt: "2026-03-18T09:30:00.000Z",
    featured: true,
    categoryId: "cat-strategy",
    authorId: "author-elena-park",
    tagIds: ["tag-mdx", "tag-supabase", "tag-workflows"],
    mdx: `## Why this stack works

The strongest publishing platforms solve two different problems at once: they make the homepage feel alive for readers, and they keep editors out of operational debt.

> **Editorial principle:** build for the newsroom's pace, not just the product team's ideal architecture.

## The content model

A lightweight schema keeps the system composable:

- authors own their bios and identity
- categories shape primary navigation
- tags give search and archive pages more range
- posts stay portable because the article body remains MDX

### Keep metadata explicit

When dek, excerpt, canonical slug, and publish date are first-class fields, the site can generate cards, feeds, and search records without scraping the article body.

<Callout type="note" title="Practical default">
Treat the article body as presentation content and metadata as product data. That separation keeps RSS, search, and newsletters reliable.
</Callout>

## Rendering long-form stories

MDX gives editors a strong middle ground between raw HTML and limited rich text blocks.

### Reading experience

Long-form article pages should answer three questions immediately:

1. what is this story about?
2. who wrote it?
3. how deep does it go?

## Distribution layer

Search and newsletter are not side features. They are distribution surfaces.

## Closing argument

If the system keeps writers publishing, editors packaging, and readers discovering more stories, it is doing the job.`,
  },
  {
    id: "post-algolia-ops",
    slug: "algolia-workflows-that-dont-break-newsrooms",
    title: "Algolia Workflows That Do Not Break Newsrooms",
    dek: "Search only works when indexing keeps pace with publishing. The implementation details matter more than the demo.",
    excerpt:
      "A search strategy for magazines that need clean records, highlight support, and dependable syncs from the content database.",
    coverImage:
      "linear-gradient(135deg, rgba(56,189,248,0.95), rgba(34,197,94,0.9), rgba(16,185,129,0.92))",
    publishedAt: "2026-03-10T10:00:00.000Z",
    featured: true,
    categoryId: "cat-platform",
    authorId: "author-julian-cross",
    tagIds: ["tag-algolia", "tag-workflows", "tag-analytics"],
    mdx: `## Search is product infrastructure

Readers expect search to understand headlines, body copy, authors, and taxonomies.

## Use a dedicated sync path

The safest pattern is a database trigger that calls a Supabase Edge Function.

### Why not index in the web app?

Because indexing should not depend on a user request finishing successfully.

<Callout type="warning" title="Operational note">
Do not send unpublished drafts to Algolia unless the index is explicitly private.
</Callout>

## Design your records for highlight output

Use a flat record with predictable fields:

- objectID
- title
- excerpt
- category
- tags
- author
- publishedAt
- url

## Ranking strategy

A magazine template usually benefits from a mix of textual relevance and freshness.`,
  },
  {
    id: "post-newsletter-loops",
    slug: "newsletter-loops-for-reader-retention",
    title: "Newsletter Loops for Reader Retention",
    dek: "A newsletter signup form is easy. A newsletter system that reinforces the editorial brand takes more intent.",
    excerpt:
      "How to capture subscribers, send confirmations, and treat email as a product loop instead of a footer checkbox.",
    coverImage:
      "linear-gradient(135deg, rgba(244,114,182,0.92), rgba(251,146,60,0.92), rgba(253,224,71,0.92))",
    publishedAt: "2026-03-08T11:00:00.000Z",
    featured: false,
    categoryId: "cat-strategy",
    authorId: "author-elena-park",
    tagIds: ["tag-newsletters", "tag-seo", "tag-analytics"],
    mdx: `## The signup form is not the strategy

A newsletter form should feel like an editorial promise.

## Confirmation matters

Saving the email to Supabase gives the publication a durable system of record.

### Keep the email simple

The best confirmation email is short, branded, and specific about cadence.

## What to measure

- conversion rate by placement
- completion rate by page type
- subscriber source
- churn by newsletter edition`,
  },
  {
    id: "post-mdx-storytelling",
    slug: "mdx-patterns-for-richer-storytelling",
    title: "MDX Patterns for Richer Storytelling",
    dek: "Custom article components let a magazine template carry a visual identity without locking editors into a heavy CMS.",
    excerpt:
      "A guide to heading overrides, code presentation, and semantic callouts that improve long-form readability.",
    coverImage:
      "linear-gradient(135deg, rgba(244,114,182,0.92), rgba(192,132,252,0.9), rgba(125,211,252,0.92))",
    publishedAt: "2026-03-05T12:00:00.000Z",
    featured: false,
    categoryId: "cat-culture",
    authorId: "author-maya-okafor",
    tagIds: ["tag-mdx", "tag-design"],
    mdx: `## The page should feel authored

When every article page looks generic, the site loses editorial personality.

## Heading overrides

Custom heading components create anchors, power a table of contents, and improve scannability.

## Code blocks and utility explainers

\`\`\`ts
export function estimateReadTime(words: number) {
  return Math.max(1, Math.ceil(words / 220));
}
\`\`\`

## Callouts

<Callout type="tip" title="Use callouts sparingly">
Callouts should elevate context, not become the article.
</Callout>`,
  },
  {
    id: "post-archive-design",
    slug: "archive-pages-that-invite-exploration",
    title: "Archive Pages That Invite Exploration",
    dek: "Archives should not feel like storage. They should feel like the publication's memory working for the reader.",
    excerpt:
      "Better archive pages combine chronology, taxonomy, and strong excerpts so old stories still move.",
    coverImage:
      "linear-gradient(135deg, rgba(253,224,71,0.95), rgba(163,230,53,0.9), rgba(45,212,191,0.9))",
    publishedAt: "2026-02-26T09:00:00.000Z",
    featured: false,
    categoryId: "cat-culture",
    authorId: "author-maya-okafor",
    tagIds: ["tag-design", "tag-seo"],
    mdx: `## Archives are still discovery

Readers often reach archive pages through search or internal navigation.

## Show the shape of the publication

Grouping stories by month or year gives readers a quick sense of pace.

## Add context to the list

Archive cards need enough metadata to be useful:

- publish date
- category
- author
- excerpt`,
  },
  {
    id: "post-seo-metadata",
    slug: "metadata-systems-for-article-seo",
    title: "Metadata Systems for Article SEO",
    dek: "The metadata API, RSS, and sitemaps work best when post metadata is structured once and reused everywhere.",
    excerpt:
      "A reusable metadata layer keeps article pages, feeds, and search previews aligned across the publishing stack.",
    coverImage:
      "linear-gradient(135deg, rgba(251,191,36,0.92), rgba(96,165,250,0.92), rgba(45,212,191,0.92))",
    publishedAt: "2026-02-20T07:30:00.000Z",
    featured: false,
    categoryId: "cat-platform",
    authorId: "author-julian-cross",
    tagIds: ["tag-seo", "tag-mdx", "tag-algolia"],
    mdx: `## One metadata source

Publishing systems get fragile when title, description, and canonical URL logic are duplicated.

## What should be generated

- page metadata for article routes
- RSS feed entries
- search records
- sitemap URLs

### Why it matters

When all surfaces use the same base post data, the publication avoids conflicting descriptions and stale URLs.`,
  },
];

function enrichPost(post: Post): EnrichedPost {
  const author = authors.find((item) => item.id === post.authorId);
  const category = categories.find((item) => item.id === post.categoryId);

  if (!author || !category) {
    throw new Error(`Missing relationships for post: ${post.slug}`);
  }

  return {
    ...post,
    author,
    category,
    tags: tags.filter((item) => post.tagIds.includes(item.id)),
    readingTime: getReadingTime(post.mdx),
    toc: extractTableOfContents(post.mdx),
  };
}

export function getAllPosts() {
  return posts
    .map(enrichPost)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}

export function getLatestPosts(limit = POSTS_PER_PAGE) {
  return getAllPosts().slice(0, limit);
}

export function getPostBySlug(slug: string) {
  const post = posts.find((item) => item.slug === slug);
  return post ? enrichPost(post) : null;
}

export function getRelatedPosts(post: EnrichedPost, limit = 3) {
  return getAllPosts()
    .filter(
      (item) =>
        item.id !== post.id &&
        (item.categoryId === post.categoryId ||
          item.tagIds.some((tagId) => post.tagIds.includes(tagId))),
    )
    .slice(0, limit);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((item) => item.slug === slug) ?? null;
}

export function getTagBySlug(slug: string) {
  return tags.find((item) => item.slug === slug) ?? null;
}

export function getAuthorBySlug(slug: string) {
  return authors.find((item) => item.slug === slug) ?? null;
}

export function getPostsByCategory(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  return getAllPosts().filter((post) => post.categoryId === category.id);
}

export function getPostsByTag(slug: string) {
  const tag = getTagBySlug(slug);
  if (!tag) return [];
  return getAllPosts().filter((post) => post.tagIds.includes(tag.id));
}

export function getPostsByAuthor(slug: string) {
  const author = getAuthorBySlug(slug);
  if (!author) return [];
  return getAllPosts().filter((post) => post.authorId === author.id);
}

export function paginatePosts(items: EnrichedPost[], page: number): PaginatedPosts {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    page: currentPage,
    totalPages,
    totalItems,
    items: items.slice(start, start + POSTS_PER_PAGE),
  };
}

export function getArchiveGroups() {
  const groups = new Map<string, { label: string; posts: EnrichedPost[] }>();

  for (const post of getAllPosts()) {
    const date = new Date(post.publishedAt);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);

    if (!groups.has(key)) {
      groups.set(key, { label, posts: [] });
    }

    groups.get(key)?.posts.push(post);
  }

  return Array.from(groups.entries()).map(([key, value]) => ({
    key,
    ...value,
  }));
}

export function getCategoryStats() {
  return categories.map((category) => ({
    ...category,
    count: getAllPosts().filter((post) => post.categoryId === category.id).length,
  }));
}

export function getTagStats() {
  return tags.map((tag) => ({
    ...tag,
    count: getAllPosts().filter((post) => post.tagIds.includes(tag.id)).length,
  }));
}
