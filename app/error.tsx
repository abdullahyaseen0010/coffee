"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center md:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Something went wrong</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">This page failed to load.</h1>
      <button type="button" onClick={() => reset()} className="mt-6 rounded-full bg-[#2d1b12] px-6 py-3 text-sm font-semibold text-[#f8efe7]">
        Try again
      </button>
    </div>
  );
}
