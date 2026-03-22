import type { TableOfContentsItem } from "@/lib/types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getReadingTime(content: string) {
  const words = content
    .replace(/<[^>]+>/g, " ")
    .replace(/[`#>*_\-\[\]\(\)]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const items: TableOfContentsItem[] = [];

  for (const line of content.split("\n")) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    items.push({
      id: slugify(match[2].replace(/[*_`]/g, "").trim()),
      text: match[2].replace(/[*_`]/g, "").trim(),
      level: match[1] === "##" ? 2 : 3,
    });
  }

  return items;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
