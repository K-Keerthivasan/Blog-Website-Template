import { SearchClient } from "@/components/search/search-client";

export const metadata = {
  title: "Search",
  description: "Search the publication with Algolia InstantSearch.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-600">
          Search
        </p>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
          Search every story, author, and topic.
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
          InstantSearch is configured with hit highlighting, filters, and
          pagination for editorial archives that keep growing.
        </p>
      </header>
      <SearchClient />
    </div>
  );
}
