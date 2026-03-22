import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

function headingId(children: ReactNode) {
  return String(children ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function CustomHeading({
  as: Tag,
  children,
  className,
}: {
  as: "h2" | "h3";
  children?: ReactNode;
  className?: string;
}) {
  const id = headingId(children);

  return (
    <Tag id={id} className={className}>
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
    </Tag>
  );
}

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: "note" | "tip" | "warning";
  title?: string;
  children: ReactNode;
}) {
  const accents = {
    note: "border-sky-300 bg-sky-50 text-sky-950",
    tip: "border-emerald-300 bg-emerald-50 text-emerald-950",
    warning: "border-amber-300 bg-amber-50 text-amber-950",
  };

  return (
    <aside className={cn("rounded-3xl border px-5 py-4", accents[type])}>
      {title ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]">
          {title}
        </p>
      ) : null}
      <div className="text-sm leading-7">{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <CustomHeading
      as="h2"
      className="mt-12 scroll-mt-24 font-serif text-3xl tracking-tight text-zinc-950"
      {...props}
    >
      {children}
    </CustomHeading>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <CustomHeading
      as="h3"
      className="mt-10 scroll-mt-24 font-serif text-2xl tracking-tight text-zinc-950"
      {...props}
    >
      {children}
    </CustomHeading>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-lg leading-8 text-zinc-700" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-orange-700 underline decoration-orange-300 underline-offset-4"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc space-y-3 pl-6 text-lg leading-8 text-zinc-700" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal space-y-3 pl-6 text-lg leading-8 text-zinc-700" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-orange-400 pl-5 font-serif text-2xl italic leading-9 text-zinc-800"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="overflow-x-auto rounded-[1.5rem] bg-zinc-950 px-5 py-4 text-sm leading-7 text-zinc-100"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.95em] text-zinc-900" {...props} />
  ),
  Callout,
};
