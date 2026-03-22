import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/posts/article-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authors, getAuthorBySlug, getPostsByAuthor } from "@/lib/content";

export async function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata(
  props: PageProps<"/author/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const author = getAuthorBySlug(slug);

  return {
    title: author ? author.name : "Author",
    description: author?.bio,
  };
}

export default async function AuthorPage(props: PageProps<"/author/[slug]">) {
  const { slug } = await props.params;
  const author = getAuthorBySlug(slug);

  if (!author) notFound();

  const posts = getPostsByAuthor(slug);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="grid gap-8 rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-sm lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:p-8 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
        <Avatar size="lg" className="size-24">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-600 dark:text-amber-300">
            Author Profile
          </p>
          <h1 className="mt-4 font-serif text-3xl tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            {author.name}
          </h1>
          <p className="mt-3 text-base font-medium text-zinc-600 dark:text-zinc-300">
            {author.role} · {author.location}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
            {author.bio}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium text-zinc-700 dark:text-zinc-200">
            <Link href={`mailto:${author.email}`}>{author.email}</Link>
            {author.socials.website ? (
              <a href={author.socials.website} target="_blank" rel="noreferrer">
                Website
              </a>
            ) : null}
            {author.socials.linkedin ? (
              <a
                href={`https://linkedin.com/${author.socials.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Published stories
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            All posts by {author.name}
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
