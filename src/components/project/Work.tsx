import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import WorkCard from "./WorkCard";
import SectionHeadings from "./SectionHeadings";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { projects, TONES } from "@/data/projects";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

// Homepage shows a curated four — the full catalog (including Roost and
// Finance Analyst) lives on /projects.
const featured = projects.slice(0, 4);

export default function Work() {
  return (
    <div>
      <SectionHeadings
        index="02"
        eyebrow="Selected work"
        title="Things I've built."
        emphasize="built."
        descriptionSlot={
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mono-label text-xs font-medium text-ink hover:text-brand-text transition-colors"
          >
            View all projects
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-8 lg:gap-10"
      >
        {featured.map((project, i) => (
          <motion.div key={project.title} variants={fadeUpItem} className="h-full">
            <WorkCard
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
          </motion.div>
        ))}
      </motion.div>

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
