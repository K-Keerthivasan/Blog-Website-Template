import Link from "next/link";

import { formatDate } from "@/lib/markdown";
import type { EnrichedPost } from "@/lib/types";

export function ArticleCard({
  post,
  priority = false,
}: {
  post: EnrichedPost;
  priority?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
      <Link href={`/article/${post.slug}`} className="block">
        <div
          className="h-44 w-full sm:h-56"
          style={{ backgroundImage: post.coverImage }}
          aria-hidden
        />
      </Link>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
          <Link href={`/category/${post.category.slug}`}>{post.category.name}</Link>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingTime}</span>
          {priority ? <span>Featured</span> : null}
        </div>
        <div>
          <Link href={`/article/${post.slug}`}>
            <h3 className="font-serif text-xl leading-tight tracking-tight text-zinc-950 transition group-hover:text-orange-600 sm:text-2xl dark:text-zinc-50 dark:group-hover:text-amber-300">
              {post.title}
            </h3>
          </Link>
          <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">{post.dek}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href={`/author/${post.author.slug}`} className="font-medium text-zinc-700 dark:text-zinc-200">
            {post.author.name}
          </Link>
          {post.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.slug}`}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 transition hover:bg-zinc-900 hover:text-white dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
