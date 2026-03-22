"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import type { Hit } from "instantsearch.js";
import Link from "next/link";
import {
  ClearRefinements,
  Configure,
  CurrentRefinements,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  Stats,
} from "react-instantsearch";

import { getAlgoliaConfig } from "@/lib/algolia";

type SearchHit = Hit<{
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
}>;

function HitCard({ hit }: { hit: SearchHit }) {
  return (
    <article className="rounded-[1.75rem] border border-black/10 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        {hit.category} · {hit.author}
      </p>
      <Link href={`/article/${hit.slug}`} className="mt-2 block">
        <h3 className="font-serif text-xl tracking-tight text-zinc-950 sm:text-2xl dark:text-zinc-50">
          <Highlight hit={hit} attribute="title" />
        </h3>
      </Link>
      <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        <Highlight hit={hit} attribute="excerpt" />
      </p>
    </article>
  );
}

export function SearchClient() {
  const config = getAlgoliaConfig();

  if (!config.appId || !config.searchKey || !config.indexName) {
    return (
      <div className="rounded-[2rem] border border-dashed border-black/15 bg-zinc-50 p-8 text-sm leading-7 text-zinc-600 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-300">
        Search is configured for Algolia InstantSearch, but no public Algolia
        environment variables are set yet. Add
        `NEXT_PUBLIC_ALGOLIA_APP_ID`, `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY`, and
        `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` to enable live search.
      </div>
    );
  }

  const searchClient = algoliasearch(config.appId, config.searchKey);

  return (
    <InstantSearch searchClient={searchClient} indexName={config.indexName}>
      <Configure hitsPerPage={6} />
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
        <aside className="space-y-5 rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
          <SearchBox
            placeholder="Search articles, tags, or authors"
            classNames={{
              root: "space-y-3",
              form: "relative",
              input:
                "h-12 w-full rounded-xl border border-black/10 bg-zinc-50 px-4 text-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-zinc-100",
              submit:
                "absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400",
              reset: "hidden",
            }}
          />
          <Stats
            classNames={{
              root: "text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400",
            }}
          />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Categories
            </p>
            <RefinementList
              attribute="category"
              classNames={{
                list: "space-y-2 text-sm text-zinc-700 dark:text-zinc-300",
                checkbox: "mr-2",
                count:
                  "ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[0.65rem] text-zinc-500 dark:bg-white/10 dark:text-zinc-400",
              }}
            />
          </div>
          <CurrentRefinements
            classNames={{
              root: "text-sm",
              list: "flex flex-wrap gap-2",
              item: "rounded-full bg-zinc-100 px-3 py-1.5 text-zinc-700 dark:bg-white/10 dark:text-zinc-300",
              delete: "ml-2 text-zinc-500 dark:text-zinc-400",
            }}
          />
          <ClearRefinements
            classNames={{
              button:
                "rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 disabled:opacity-40 dark:border-white/10 dark:text-zinc-200",
            }}
          />
        </aside>
        <div className="space-y-6">
          <Hits<SearchHit> hitComponent={HitCard} classNames={{ list: "grid gap-5" }} />
          <Pagination
            classNames={{
              root: "pt-2",
              list: "flex flex-wrap gap-2",
              item: "rounded-full border border-black/10 text-sm dark:border-white/10 dark:text-zinc-200",
              link: "block px-4 py-2",
              selectedItem: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
            }}
          />
        </div>
      </div>
    </InstantSearch>
  );
}
