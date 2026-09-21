import Link from "next/link";
import React from "react";
import { IconArrowUpRight } from "@tabler/icons-react";

interface WorkCardCompactProps {
  order: string;
  title: string;
  description: string;
  href?: string;
  technologies: string[];
  eyebrow: string;
}

// Lighter-weight project card for the homepage "more builds" row — same
// visual language as WorkCard, but no flow-diagram panel.
export default function WorkCardCompact({
  order,
  title,
  description,
  href,
  technologies,
  eyebrow,
}: WorkCardCompactProps) {
  const body = (
    <article className="group relative border border-border p-7 md:p-8 flex flex-col justify-between min-h-[260px] h-full bg-transparent transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--brand-text)_7%,transparent)]">
      <div>
        <div className="flex items-center justify-between gap-4 mono-label text-[10px] text-ink-mute mb-6">
          <span className="text-brand-text">{order}</span>
          <span>{eyebrow}</span>
          <IconArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] text-ink group-hover:text-brand-text transition-colors mb-3">
          {title}
        </h3>
        <p className="text-sm text-ink-mute leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-[10px] uppercase tracking-wide text-ink-mute border border-border px-2.5 py-2"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );

  if (!href) return body;

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={title} className="block">
      {body}
    </Link>
  );
}
