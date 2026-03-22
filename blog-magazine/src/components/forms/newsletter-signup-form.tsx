"use client";

import { useActionState } from "react";

import { newsletterSignupAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NewsletterActionState } from "@/lib/types";

const initialState: NewsletterActionState = {
  status: "idle",
  message: "",
};

export function NewsletterSignupForm() {
  const [state, action, pending] = useActionState(
    newsletterSignupAction,
    initialState,
  );

  return (
    <form action={action} className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-none">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Name
        </label>
        <Input id="name" name="name" placeholder="Alex Morgan" className="h-11 text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="h-11 text-sm"
        />
      </div>
      <Button type="submit" size="lg" disabled={pending} className="h-11 text-sm">
        {pending ? "Submitting..." : "Join the newsletter"}
      </Button>
      {state.message ? (
        <p
          className={
            state.status === "success"
              ? "text-sm text-emerald-700 dark:text-emerald-300"
              : "text-sm text-red-600 dark:text-red-300"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
