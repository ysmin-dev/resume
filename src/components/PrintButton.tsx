"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print fixed right-6 bottom-6 z-10 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      PDF로 저장
    </button>
  );
}
