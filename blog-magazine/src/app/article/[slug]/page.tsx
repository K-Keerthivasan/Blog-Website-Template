import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { mdxComponents } from "@/components/article/mdx-components";
import { SocialShare } from "@/components/article/social-share";
import { TableOfContents } from "@/components/article/table-of-contents";
import { ArticleCard } from "@/components/posts/article-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { formatDate } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/article/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      url: `${siteConfig.url}/article/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function ArticlePage(props: PageProps<"/article/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post);
  const { content } = await compileMDX({
    source: post.mdx,
    components: mdxComponents,
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
        <article className="min-w-0">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-amber-300">
            <Link href={`/category/${post.category.slug}`}>{post.category.name}</Link>
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl leading-tight tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-zinc-50">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl sm:leading-9 dark:text-zinc-300">
            {post.dek}
          </p>

          <div className="mt-8 flex flex-col gap-5 rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
            <div className="flex items-start gap-4 sm:items-center">
              <Avatar size="lg">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/author/${post.author.slug}`} className="text-base font-semibold text-zinc-950 dark:text-zinc-100">
                  {post.author.name}
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {post.author.role} · {post.readingTime} · {formatDate(post.publishedAt)}
                </p>
                {post.updatedAt ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Updated {formatDate(post.updatedAt)}
                  </p>
                ) : null}
              </div>
            </div>
            <SocialShare
              title={post.title}
              url={`${siteConfig.url}/article/${post.slug}`}
            />
          </div>

          <div
            className="mt-8 h-[220px] rounded-[2rem] sm:h-[320px] lg:h-[380px] lg:rounded-[2.5rem]"
            style={{ backgroundImage: post.coverImage }}
            aria-hidden
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10">
            <div className="min-w-0">
              <div className="prose prose-zinc max-w-none dark:prose-invert">
                {content}
              </div>
            </div>
            <div className="space-y-5">
              <TableOfContents items={post.toc} />
              <div className="rounded-[1.75rem] border border-black/10 bg-zinc-50 p-5 dark:border-white/10 dark:bg-zinc-900/80">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Tagged
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="rounded-full bg-white px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-black/10 transition hover:bg-zinc-950 hover:text-white dark:bg-white/10 dark:text-zinc-300 dark:ring-white/10 dark:hover:bg-white dark:hover:text-zinc-950"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              About the author
            </p>
            <h2 className="mt-3 font-serif text-2xl tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
              {post.author.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{post.author.bio}</p>
            <Link
              href={`/author/${post.author.slug}`}
              className="mt-5 inline-block text-sm font-semibold text-orange-700 dark:text-amber-300"
            >
              View profile
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <div className="mb-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Continue reading
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            Related stories
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {related.map((item) => (
            <ArticleCard key={item.id} post={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
