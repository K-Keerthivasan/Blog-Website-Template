import Link from "next/link";

export function PaginationNav({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex flex-wrap items-center gap-3 pt-6 text-sm">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded-full border border-black/10 px-4 py-2 transition hover:bg-zinc-950 hover:text-white dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white dark:hover:text-zinc-950"
        >
          Previous
        </Link>
      ) : null}
      <span className="rounded-full bg-zinc-100 px-4 py-2 text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-full border border-black/10 px-4 py-2 transition hover:bg-zinc-950 hover:text-white dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white dark:hover:text-zinc-950"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}
