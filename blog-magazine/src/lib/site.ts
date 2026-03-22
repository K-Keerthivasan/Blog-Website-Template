export const siteConfig = {
  name: "K2 Digital Media",
  title: "K2 Dispatch",
  description:
    "A modern blog, news, and magazine template for editorial teams publishing long-form reporting and fast-moving coverage.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  newsletterFrom:
    process.env.NEWSLETTER_FROM_EMAIL ?? "K2 Dispatch <news@example.com>",
  newsletterReplyTo: process.env.NEWSLETTER_REPLY_TO ?? "editor@example.com",
  social: {
    x: "k2digitalmedia",
    linkedin: "company/k2-digital-media",
    instagram: "k2digitalmedia",
  },
};

export const POSTS_PER_PAGE = 4;
