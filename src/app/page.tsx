import Image from "next/image";
import Link from "next/link";
import {
  careers,
  careerYear,
  certifications,
  education,
  profile,
  projects,
  skills,
  type Highlight,
} from "@/data/resume";
import { PrintButton } from "@/components/PrintButton";
import { SectionNav } from "@/components/SectionNav";
import { ProfileSummary } from "@/components/ProfileSummary";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  );
}

function HighlightList({ highlights }: { highlights: Highlight[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
      {highlights.map((highlight) => {
        if (typeof highlight === "string") {
          return <li key={highlight}>{highlight}</li>;
        }
        return (
          <li key={highlight.text}>
            <Link
              href={highlight.href}
              className="font-semibold underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {highlight.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <SectionNav />
      <main className="w-full max-w-[950px] bg-white px-6 py-16 sm:px-12 print:px-0 print:py-0 dark:bg-black">
        {/* Header */}
        <header
          id="about"
          className="mb-16 flex scroll-mt-20 flex-col gap-6 border-b border-zinc-200 pb-10 sm:flex-row sm:items-start dark:border-zinc-800"
        >
          <Image
            src="/profile.jpg"
            alt={profile.name}
            width={360}
            height={504}
            priority
            className="h-[160px] w-[158px] shrink-0 rounded-full object-cover object-center"
          />
          <div className="flex flex-1 flex-col gap-3">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              {profile.name}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              만 {profile.age}세, {profile.birthYear}년생
            </p>
            <ProfileSummary summary={profile.summary} />
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <a
                href={`tel:${profile.phone.replace(/-/g, "")}`}
                className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
              >
                {profile.phone}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
              >
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
              >
                GitHub
              </a>
              <Link
                href="/posts"
                className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
              >
                이슈 기록
              </Link>
            </div>
          </div>
        </header>

        {/* Skills */}
        <section id="skills" className="mb-14 scroll-mt-20">
          <SectionTitle>기술 스택</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Career */}
        <section id="career" className="mb-14 scroll-mt-20">
          <SectionTitle>경력 ({careerYear}년차)</SectionTitle>
          <div className="flex flex-col gap-8">
            {careers.map((career) => (
              <div key={career.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {career.company}{" "}
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">
                      · {career.role}
                    </span>
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {career.period}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  {career.department ? `${career.department} · ` : ""}
                  {career.duration}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                  {career.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-14 scroll-mt-20">
          <SectionTitle>프로젝트</SectionTitle>
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {project.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {project.period}
                  </p>
                </div>
                {(project.client || project.affiliation) && (
                  <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {project.client ? `클라이언트: ${project.client}` : ""}
                    {project.affiliation ? `소속: ${project.affiliation}` : ""}
                  </p>
                )}
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {project.description}
                </p>
                {project.highlights && (
                  <HighlightList highlights={project.highlights} />
                )}
                {project.groups?.map((group) => (
                  <div key={group.label} className="mt-4">
                    <p className="flex flex-wrap items-baseline gap-x-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {group.label}
                      {group.period && (
                        <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                          {group.period}
                        </span>
                      )}
                    </p>
                    <HighlightList highlights={group.highlights} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mb-14 scroll-mt-20">
          <SectionTitle>학력</SectionTitle>
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div
                key={edu.school}
                className="flex flex-wrap items-baseline justify-between gap-x-4"
              >
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {edu.degree}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="scroll-mt-20">
          <SectionTitle>자격증</SectionTitle>
          <div className="flex flex-col gap-2">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-wrap items-baseline justify-between gap-x-4"
              >
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {cert.name}{" "}
                  <span className="font-normal text-zinc-500 dark:text-zinc-400">
                    · {cert.issuer}
                  </span>
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PrintButton />
    </div>
  );
}
