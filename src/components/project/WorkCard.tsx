import Link from "next/link";
import React from "react";

interface WorkCardProps {
  title: string;
  description: string;
  href?: string;
  technologies: string[];
  logoSvg?: React.ReactNode;
  tag?: string;
}

export default function WorkCard({
  title,
  description,
  href,
  technologies,
  logoSvg,
  tag,
}: WorkCardProps) {
  const content = (
    <div className="relative h-full">
      <div className="flex flex-col items-start rounded-xl p-6 relative h-full">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="h-11 w-11 rounded-xl bg-[color-mix(in_srgb,var(--brand)_16%,var(--card))] flex items-center justify-center text-brand-text">
            {logoSvg}
          </div>
          {tag && (
            <span className="font-hand text-lg text-brand-text -rotate-6">{tag}</span>
          )}
        </div>
        <div className="font-body">
          <h4 className="text-lg font-display font-bold tracking-tight text-ink">
            {title}
          </h4>
          <p className="leading-6 pt-3 text-sm text-ink-soft">{description}</p>
          <div className="pt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-chip border border-chip-border text-chip-text text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const className =
    "group hover:-translate-y-1 hover:border-brand rounded-xl transition duration-200 relative border border-border bg-card w-full h-full";

  if (!href) {
    return (
      <div className={className} aria-label={title}>
        {content}
      </div>
    );
  }

  return (
    <Link
      className={className}
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </Link>
  );
}
