import Link from "next/link";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getCategoryStats } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const categories = getCategoryStats().slice(0, 3);

  return (
    <header className="border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-950/85">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-amber-300">
              K2 Digital Media
            </p>
            <Link href="/" className="inline-block">
              <h1 className="font-serif text-3xl leading-none tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
                K2 Dispatch
              </h1>
            </Link>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              A blog, news, and magazine template for editorial teams shipping
              long-form stories, searchable archives, and newsletter growth.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:max-w-sm lg:justify-end">
            <nav className="flex flex-wrap gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              {[
                ["/archive", "Archive"],
                ["/search", "Search"],
                ["/newsletter", "Newsletter"],
                ["/feed.xml", "RSS"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-full border border-black/10 px-3 py-2 transition hover:border-black/20 hover:bg-zinc-950 hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-zinc-950",
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-black/10 pt-4 text-sm dark:border-white/10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-full bg-zinc-100 px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-900 hover:text-white dark:bg-white/[0.08] dark:text-zinc-300 dark:hover:bg-white dark:hover:text-zinc-950"
            >
              {category.name} ({category.count})
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

