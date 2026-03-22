import { NewsletterSignupForm } from "@/components/forms/newsletter-signup-form";

export const metadata = {
  title: "Newsletter Signup",
  description: "Subscribe to K2 Dispatch updates via Supabase and Resend.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.2fr_0.9fr] lg:px-8">
      <section className="rounded-[2rem] border border-black/10 bg-zinc-950 p-5 text-white sm:p-8 dark:border-white/10 dark:bg-zinc-900">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-orange-200">
          Newsletter
        </p>
        <h1 className="mt-4 font-serif text-3xl tracking-tight sm:text-5xl">
          Join the editorial briefing.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
          Save subscribers to Supabase, trigger a confirmation email with
          Resend, and give the publication a direct reader relationship that
          does not depend on platform algorithms.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            "Confirmation email sent via Resend",
            "Subscriber saved in Supabase",
            "Ready for segmentation and automations",
          ].map((item) => (
            <div key={item} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 text-sm leading-7">
              {item}
            </div>
          ))}
        </div>
      </section>
      <div className="self-center">
        <NewsletterSignupForm />
      </div>
    </div>
  );
}
