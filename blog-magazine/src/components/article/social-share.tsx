"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SocialShare({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="lg">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer"
        >
          Share on X
        </a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>Email</a>
      </Button>
      <Button type="button" variant="default" size="lg" onClick={handleCopy}>
        {copied ? "Copied" : "Copy Link"}
      </Button>
    </div>
  );
}
