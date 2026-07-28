"use client";

import { Fragment, useEffect, useState } from "react";
import { philosophy } from "@/data/resume";

function renderBold(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>
    ),
  );
}

export function ProfileSummary({ summary }: { summary: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const parts = summary.split(philosophy.title);

  return (
    <>
      <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
        {parts.map((part, i) => (
          <Fragment key={i}>
            {renderBold(part, `p${i}`)}
            {i < parts.length - 1 && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="font-bold text-zinc-900 underline decoration-dotted underline-offset-2 hover:text-zinc-600 print:no-underline dark:text-zinc-50 dark:hover:text-zinc-300"
              >
                {philosophy.title}
              </button>
            )}
          </Fragment>
        ))}
      </p>

      {open && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="개발 철학"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ✕
            </button>
            <p className="pr-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              &ldquo;{philosophy.title}&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {philosophy.intro}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {philosophy.principles.map((principle) => (
                <div
                  key={principle.en}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                      {principle.title}
                    </h3>
                    <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                      {principle.en}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
