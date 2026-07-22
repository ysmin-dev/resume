import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | 민연식` : "이슈 기록 | 민연식",
    description: post?.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-[950px] bg-white px-6 py-16 sm:px-12 dark:bg-black">
        <Link
          href="/posts"
          className="text-sm text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← 이슈 기록 목록
        </Link>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h1>

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

        <p className="mt-8 whitespace-pre-line leading-relaxed text-zinc-700 dark:text-zinc-300">
          {post.content}
        </p>
      </main>
    </div>
  );
}
