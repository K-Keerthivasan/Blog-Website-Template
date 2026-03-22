import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-600">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight text-zinc-950">
        This page is not in the issue queue.
      </h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600">
        The route does not exist, or the content has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Return home
      </Link>
    </div>
  );
}
