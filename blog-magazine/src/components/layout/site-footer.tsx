import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-zinc-950 text-zinc-200 dark:border-white/10 dark:bg-black">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-orange-300">
            {siteConfig.name}
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-white">
            Editorial infrastructure, designed for velocity.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
            This template includes MDX article pages, taxonomies, Algolia
            search, RSS generation, and a newsletter workflow backed by
            Supabase and Resend.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-zinc-400">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/archive" className="transition hover:text-white">
            Archive
          </Link>
          <Link href="/search" className="transition hover:text-white">
            Search
          </Link>
          <Link href="/newsletter" className="transition hover:text-white">
            Newsletter
          </Link>
          <Link href="/feed.xml" className="transition hover:text-white">
            RSS Feed
          </Link>
        </div>
      </div>
    </footer>
  );
}
