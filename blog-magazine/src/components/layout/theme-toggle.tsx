"use client";

import { useEffect, useState } from "react";

function getInitialTheme() {
  if (typeof window === "undefined") return "light" as const;

  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-black/10 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-700 transition hover:bg-zinc-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white dark:hover:text-zinc-950"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
