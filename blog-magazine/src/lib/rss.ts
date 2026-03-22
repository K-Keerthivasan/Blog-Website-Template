import { siteConfig } from "@/lib/site";
import type { EnrichedPost } from "@/lib/types";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRssFeed(posts: EnrichedPost[]) {
  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/article/${post.slug}`;
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${escapeXml(post.excerpt)}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          <author>${escapeXml(post.author.email)} (${escapeXml(post.author.name)})</author>
          <category>${escapeXml(post.category.name)}</category>
        </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
}
