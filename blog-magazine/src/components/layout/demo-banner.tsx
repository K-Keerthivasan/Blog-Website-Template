"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const backUrl =
  process.env.NEXT_PUBLIC_K2_BACK_URL ?? "https://k2digitalmedia.ca";

function DemoPanel() {
  return (
    <>
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
        <Image
          src="/Logo.png"
          alt="K2 Digital Media"
          width={52}
          height={52}
          className="h-[52px] w-[52px] object-contain"
          priority
        />
      </div>
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-cyan-300">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
        Demo Site
      </div>
      <p className="text-center text-sm leading-6 text-white/72">
        This site is a demo built by <strong className="font-semibold text-white">K2 Digital Media</strong>.
      </p>
      <a
        href={backUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-sky-600 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_28px_rgba(8,145,178,0.34)] transition hover:scale-[0.98] hover:opacity-90"
      >
        Back to K2DM
      </a>
    </>
  );
}

export function DemoBanner() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] border-b border-cyan-400/20 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)]">
        <div className="mx-auto flex min-h-[var(--demo-banner-top-offset)] max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 py-2 text-center text-[0.62rem] uppercase tracking-[0.24em] text-white/60 sm:px-6 sm:text-[0.68rem] lg:px-8">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          <span className="hidden sm:inline">This is a demo site built by</span>
          <span className="sm:hidden">Demo by</span>
          <a
            href={backUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan-300 underline decoration-cyan-400/40 underline-offset-4 transition hover:text-white"
          >
            K2 Digital Media
          </a>
          <span className="hidden text-white/25 sm:inline">|</span>
          <a
            href={backUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-400/35 px-3 py-1 font-semibold text-white/70 transition hover:border-cyan-300 hover:text-white"
          >
            Go Back
          </a>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-cyan-400/15 bg-slate-950/92 text-white backdrop-blur">
        <div className="mx-auto flex min-h-[var(--demo-banner-bottom-offset)] max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 py-2 text-center text-[0.6rem] uppercase tracking-[0.22em] text-white/45 sm:px-6 sm:text-[0.65rem] lg:px-8">
          <Image
            src="/Logo.png"
            alt="K2 Digital Media"
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain opacity-80"
          />
          <span>Demo by</span>
          <a
            href={backUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan-300 transition hover:text-white"
          >
            K2 Digital Media
          </a>
          <span className="hidden text-white/20 sm:inline">|</span>
          <a
            href={backUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white/55 transition hover:text-white"
          >
            Visit Main Site
          </a>
        </div>
      </div>

      <div className="fixed right-0 top-1/2 z-[75] hidden -translate-y-1/2 items-center md:flex">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="k2-demo-panel-desktop"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 rounded-l-xl border border-r-0 border-cyan-400/30 bg-slate-950 px-2 py-4 text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-cyan-300 transition hover:bg-cyan-400/10"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span
            className={cn(
              "text-sm transition-transform",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          >
            {">"}
          </span>
          Demo
        </button>
        <div
          id="k2-demo-panel-desktop"
          className={cn(
            "flex origin-right flex-col items-center gap-4 overflow-hidden rounded-l-3xl border border-r-0 border-cyan-400/20 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[-8px_0_30px_rgba(15,23,42,0.28)] transition-all duration-300",
            isOpen
              ? "w-72 px-5 py-6 opacity-100"
              : "w-0 border-transparent px-0 py-0 opacity-0",
          )}
        >
          <DemoPanel />
        </div>
      </div>

      <div className="fixed bottom-[calc(var(--demo-banner-bottom-offset)+0.75rem)] right-3 z-[75] md:hidden">
        {isOpen ? (
          <div
            id="k2-demo-panel-mobile"
            className="mb-3 flex w-[min(18rem,calc(100vw-1.5rem))] flex-col items-center gap-4 rounded-3xl border border-cyan-400/20 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.32)]"
          >
            <DemoPanel />
          </div>
        ) : null}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="k2-demo-panel-mobile"
          onClick={() => setIsOpen((open) => !open)}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-950/95 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cyan-300 shadow-[0_10px_25px_rgba(15,23,42,0.26)] backdrop-blur transition hover:bg-cyan-400/10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          Demo
          <span className={cn("text-sm transition-transform", isOpen && "rotate-45")}>
            +
          </span>
        </button>
      </div>
    </>
  );
}
