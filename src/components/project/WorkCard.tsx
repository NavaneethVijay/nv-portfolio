import Link from "next/link";
import React from "react";
import { IconArrowUpRight, IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import ProjectFlow from "./ProjectFlow";

type Tone = "ink" | "sand" | "blue";

interface WorkCardProps {
  order: string;
  tone: Tone;
  title: string;
  description: string;
  href?: string;
  caseStudyHref?: string;
  /** Set false where space is tight and the whole card already links to the
   * case study (e.g. the homepage) — the full-card overlay then becomes the
   * accessible link itself instead of staying aria-hidden behind the label. */
  showCaseStudyLink?: boolean;
  technologies: string[];
  caption: string;
  flow: string[];
  eyebrow: string;
}

export default function WorkCard({
  order,
  tone,
  title,
  description,
  href,
  caseStudyHref,
  showCaseStudyLink = true,
  technologies,
  caption,
  flow,
  eyebrow,
}: WorkCardProps) {
  const isGithub = href?.includes("github.com");
  const externalLabel = isGithub ? "GitHub" : "Visit site";
  const ExternalIcon = isGithub ? IconBrandGithub : IconExternalLink;

  const body = (
    <article className="group relative grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[420px] md:min-h-[400px] bg-transparent transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--brand-text)_7%,transparent)]">
      {caseStudyHref && showCaseStudyLink && (
        <Link href={caseStudyHref} aria-hidden="true" tabIndex={-1} className="absolute inset-0 z-0" />
      )}
      {caseStudyHref && !showCaseStudyLink && (
        <Link href={caseStudyHref} aria-label={title} className="absolute inset-0 z-0" />
      )}
      {!caseStudyHref && href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 z-0"
        />
      )}
      <div className="border border-border md:border-r-0 p-7 md:p-8 flex flex-col justify-between text-ink">
        <span className="font-serif text-sm">{order}</span>
        <div className="flex-1 flex items-center py-8">
          <ProjectFlow steps={flow} label={title} tone={tone} />
        </div>
        <span className="mono-label text-[10px] uppercase text-ink-mute">{caption}</span>
      </div>

      <div className="border border-border p-8 md:p-8 lg:p-10 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-4 mono-label text-[10px] text-ink-mute mb-6">
          <span>{eyebrow}</span>
          <IconArrowUpRight className="h-[17px] w-[17px] shrink-0" aria-hidden="true" />
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] text-ink group-hover:text-brand-text transition-colors mb-4">
          {title}
        </h3>
        <p className="text-sm text-ink-mute leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wide text-ink-mute border border-border px-2.5 py-2"
            >
              {tech}
            </span>
          ))}
        </div>

        {((caseStudyHref && showCaseStudyLink) || href) && (
          <div className="relative z-10 flex items-center gap-4 mt-6 pt-6 border-t border-border">
            {caseStudyHref && showCaseStudyLink && (
              <Link
                href={caseStudyHref}
                className="inline-flex items-center gap-1.5 mono-label text-xs font-medium text-ink hover:text-brand-text transition-colors"
              >
                Read case study
                <IconArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {caseStudyHref && showCaseStudyLink && href && (
              <span className="h-4 w-px bg-border" aria-hidden="true" />
            )}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mono-label text-xs font-medium text-ink-mute hover:text-brand-text transition-colors"
              >
                {externalLabel}
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );

  // The stretched-link overlay above already makes the whole card
  // clickable, and the footer row carries the real, visible anchor(s) —
  // no outer <Link>/<a> wrapper here, since that would nest an <a> inside
  // another <a>.
  return body;
}
