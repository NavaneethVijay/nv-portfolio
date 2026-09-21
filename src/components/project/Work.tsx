import React from "react";
import Link from "next/link";
import WorkCard from "./WorkCard";
import WorkCardCompact from "./WorkCardCompact";
import SectionHeadings from "./SectionHeadings";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { projects, TONES } from "@/data/projects";

// Homepage shows a curated six: the first four get the full flow-diagram
// treatment, the next two are shown lighter-weight. The full catalog lives
// on /projects.
const featured = projects.slice(0, 4);
const more = projects.slice(4, 6);

export default function Work() {
  return (
    <div>
      <SectionHeadings
        index="02"
        eyebrow="Selected work"
        title="Things I've built."
        emphasize="built."
        description="Projects are where architecture meets reality. These are a few places I've spent time making the invisible systems visible, useful, and resilient."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-10 lg:gap-y-10">
        {featured.map((project, i) => (
          <WorkCard
            key={project.title}
            order={String(i + 1).padStart(2, "0")}
            tone={TONES[i % TONES.length]}
            title={project.title}
            description={project.description}
            href={project.websiteUrl ?? project.githubUrl}
            caseStudyHref={project.slug ? `/projects/${project.slug}` : undefined}
            showCaseStudyLink={false}
            technologies={project.techStack}
            flow={project.flow}
            eyebrow={project.eyebrow}
            caption={project.caption}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:mt-10">
        {more.map((project, i) => (
          <WorkCardCompact
            key={project.title}
            order={String(featured.length + i + 1).padStart(2, "0")}
            title={project.title}
            description={project.description}
            href={project.websiteUrl ?? project.githubUrl}
            technologies={project.techStack}
            eyebrow={project.eyebrow}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 mono-label text-xs font-medium text-ink-soft hover:text-brand-text transition-colors"
        >
          View all projects
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
        <span className="hidden sm:inline h-4 w-px bg-border" aria-hidden="true" />
        <a
          href="https://github.com/NavaneethVijay"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mono-label text-xs font-medium text-ink-soft hover:text-brand-text transition-colors"
        >
          <IconBrandGithub className="h-4 w-4" />
          More on GitHub
        </a>
      </div>
    </div>
  );
}
