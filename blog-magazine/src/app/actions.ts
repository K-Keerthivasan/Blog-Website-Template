"use server";

import { z } from "zod";

import { subscribeToNewsletter } from "@/lib/newsletter";
import type { NewsletterActionState } from "@/lib/types";

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  name: z.string().trim().max(120).optional(),
});

export async function newsletterSignupAction(
  _previousState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const parsed = newsletterSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    name: String(formData.get("name") ?? ""),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid signup details.",
    };
  }

  const result = await subscribeToNewsletter(
    parsed.data.email,
    parsed.data.name || undefined,
  );

  return {
    status: result.ok ? "success" : "error",
    message: result.message,
  };
}
