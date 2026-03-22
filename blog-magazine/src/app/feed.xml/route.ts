import { getAllPosts } from "@/lib/content";
import { buildRssFeed } from "@/lib/rss";

export async function GET() {
  const feed = buildRssFeed(getAllPosts());

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
