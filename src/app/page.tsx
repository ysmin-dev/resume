import Image from "next/image";
import Link from "next/link";
import {
  careers,
  certifications,
  education,
  profile,
  projects,
  skills,
} from "@/data/resume";
import { PrintButton } from "@/components/PrintButton";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  );
}

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-[950px] bg-white px-6 py-16 sm:px-12 print:px-0 print:py-0 dark:bg-black">
        {/* Header */}
        <header className="mb-16 flex flex-col gap-6 border-b border-zinc-200 pb-10 sm:flex-row sm:items-start dark:border-zinc-800">
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
            <div className="h-7" aria-hidden="true" />
            <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
              {renderBold(profile.summary)}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
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
        <section className="mb-14">
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
        <section className="mb-14">
          <SectionTitle>경력</SectionTitle>
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
        <section className="mb-14">
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
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                  {project.highlights.map((highlight) => {
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
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-14">
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
        <section>
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
