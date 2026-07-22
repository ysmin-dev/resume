import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "이슈 기록 | 민연식",
  description: "실무에서 마주친 문제를 발생-원인-해결 순으로 정리한 기록",
};

export default function PostsPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-[950px] bg-white px-6 py-16 sm:px-12 dark:bg-black">
        <header className="mb-12 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 이력서로 돌아가기
          </Link>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            이슈 기록
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            실무에서 마주친 문제를 발생-원인-해결 순으로 정리했습니다.
          </p>
        </header>

        <ul className="flex flex-col gap-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="group block">
                <h2 className="text-xl font-bold text-zinc-900 group-hover:underline dark:text-zinc-50">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
