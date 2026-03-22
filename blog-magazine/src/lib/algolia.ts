import { siteConfig } from "@/lib/site";
import type { EnrichedPost } from "@/lib/types";

export function getAlgoliaConfig() {
  return {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
    searchKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? "",
    adminKey: process.env.ALGOLIA_ADMIN_API_KEY ?? "",
    indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "posts",
  };
}

export function toAlgoliaRecord(post: EnrichedPost) {
  return {
    objectID: post.id,
    slug: post.slug,
    title: post.title,
    dek: post.dek,
    excerpt: post.excerpt,
    category: post.category.name,
    categorySlug: post.category.slug,
    author: post.author.name,
    authorSlug: post.author.slug,
    tags: post.tags.map((tag) => tag.name),
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    url: `${siteConfig.url}/article/${post.slug}`,
  };
}
