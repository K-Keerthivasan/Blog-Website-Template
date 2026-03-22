import Link from "next/link";

import { getArchiveGroups } from "@/lib/content";
import { formatDate } from "@/lib/markdown";

export const metadata = {
  title: "Archive",
  description: "Chronological archive of all published stories.",
};

export default function ArchivePage() {
  const groups = getArchiveGroups();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-amber-300">
          Archive
        </p>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
          The publication timeline
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
          A chronological archive designed for exploration, not just storage.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.key}>
            <div className="mb-4 flex items-center gap-4">
              <h2 className="font-serif text-2xl tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
                {group.label}
              </h2>
              <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            </div>
            <div className="grid gap-4">
              {group.posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/article/${post.slug}`}
                  className="grid gap-3 rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none"
                >
                  <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {formatDate(post.publishedAt)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      {post.category.name}
                    </p>
                    <h3 className="mt-2 font-serif text-xl tracking-tight text-zinc-950 sm:text-2xl dark:text-zinc-50">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
