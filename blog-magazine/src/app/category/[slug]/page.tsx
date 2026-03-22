import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/posts/article-card";
import { PaginationNav } from "@/components/posts/pagination-nav";
import {
  getCategoryBySlug,
  getCategoryStats,
  getPostsByCategory,
  paginatePosts,
} from "@/lib/content";

export async function generateStaticParams() {
  return getCategoryStats().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata(
  props: PageProps<"/category/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const category = getCategoryBySlug(slug);

  return {
    title: category ? `${category.name} category` : "Category",
    description: category?.description,
  };
}

export default async function CategoryPage(props: PageProps<"/category/[slug]">) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const page = Number(searchParams.page ?? "1");
  const pagination = paginatePosts(getPostsByCategory(slug), page);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-amber-300">
          Category
        </p>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
          {category.name}
        </h1>
        <p className="mt-4 text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
          {category.description}
        </p>
      </header>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {pagination.items.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationNav
        basePath={`/category/${category.slug}`}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}
