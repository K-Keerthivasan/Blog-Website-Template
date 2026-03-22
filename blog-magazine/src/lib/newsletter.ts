"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

export async function subscribeToNewsletter(email: string, name?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      ok: false,
      message:
        "Missing Supabase configuration. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email,
      name: name || null,
      confirmed_at: new Date().toISOString(),
    },
    {
      onConflict: "email",
      ignoreDuplicates: false,
    },
  );

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  if (!resendApiKey) {
    return {
      ok: true,
      message:
        "Saved subscriber in Supabase. Add RESEND_API_KEY to send confirmation emails.",
    };
  }

  const resend = new Resend(resendApiKey);

  const response = await resend.emails.send({
    from: siteConfig.newsletterFrom,
    replyTo: siteConfig.newsletterReplyTo,
    to: email,
    subject: `You are subscribed to ${siteConfig.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111827;">
        <p style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">${siteConfig.title}</p>
        <h1 style="font-size: 28px; margin: 0 0 16px;">Subscription confirmed</h1>
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 12px;">
          ${name ? `Hi ${name},` : "Hi,"} thanks for subscribing. You will now receive updates when new stories and editorial roundups go live.
        </p>
        <p style="font-size: 16px; line-height: 1.6; margin: 0;">
          Visit <a href="${siteConfig.url}" style="color: #2563eb;">${siteConfig.title}</a> to keep reading.
        </p>
      </div>
    `,
  });

  if (response.error) {
    return {
      ok: false,
      message: response.error.message,
    };
  }

  return {
    ok: true,
    message: "Subscription confirmed. Check your inbox for the welcome email.",
  };
}
