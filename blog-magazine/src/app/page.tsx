import Link from "next/link";

import { NewsletterSignupForm } from "@/components/forms/newsletter-signup-form";
import { ArticleCard } from "@/components/posts/article-card";
import {
  getCategoryStats,
  getFeaturedPosts,
  getLatestPosts,
  getTagStats,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedPosts();
  const latest = getLatestPosts(4);
  const categories = getCategoryStats();
  const tagStats = getTagStats().slice(0, 6);
  const lead = featured[0];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-zinc-950 text-white dark:border-white/10 dark:bg-zinc-900">
          <div
            className="min-h-[340px] bg-cover bg-center p-5 sm:min-h-[420px] sm:p-8 lg:p-10"
            style={{ backgroundImage: lead.coverImage }}
          >
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-black/45 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-6">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-200">
                  Featured Story
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                  {lead.dek}
                </p>
              </div>
              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href={`/article/${lead.slug}`}
                  className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:bg-orange-200"
                >
                  Read the article
                </Link>
                <Link
                  href="/archive"
                  className="rounded-full border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Browse archive
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900/80 sm:p-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Why this template
            </p>
            <h3 className="mt-4 font-serif text-2xl tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
              Built for search, newsletters, and long-form reading.
            </h3>
            <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tagStats.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-950 hover:text-white dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
          <NewsletterSignupForm />
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Latest
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              New reporting and editorial analysis
            </h2>
          </div>
          <Link href="/search" className="text-sm font-medium text-orange-700 dark:text-amber-300">
            Search all articles
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {latest.map((post, index) => (
            <ArticleCard key={post.id} post={post} priority={index === 0} />
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none"
          >
            <div className={`h-3 bg-gradient-to-r ${category.accent}`} />
            <div className="p-5 sm:p-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                Category
              </p>
              <h3 className="mt-3 font-serif text-2xl tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
                {category.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
                {category.description}
              </p>
              <p className="mt-6 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                {category.count} published stories
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
