import type { TableOfContentsItem } from "@/lib/types";

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  if (!items.length) return null;

  return (
    <aside className="rounded-[1.75rem] border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-zinc-900/80">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        Table of Contents
      </p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a href={`#${item.id}`} className="transition hover:text-orange-600 dark:hover:text-amber-300">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
