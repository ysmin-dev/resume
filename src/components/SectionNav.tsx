"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "소개" },
  { id: "skills", label: "기술 스택" },
  { id: "career", label: "경력" },
  { id: "projects", label: "프로젝트" },
  { id: "education", label: "학력" },
  { id: "certifications", label: "자격증" },
] as const;

export function SectionNav() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="이력서 섹션"
      className="no-print sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80"
    >
      <ul className="mx-auto flex max-w-[950px] justify-center gap-1 overflow-x-auto px-6 sm:px-12">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block border-b-2 px-3 py-3 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-zinc-900 font-semibold text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
