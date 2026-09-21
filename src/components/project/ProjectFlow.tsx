import React from "react";

type Tone = "ink" | "sand" | "blue";

type Orientation = "vertical" | "horizontal";

// Compact system-flow diagram for a project's visual panel — the Theme 2
// element. Communicates how the system works, not the tech stack, in place
// of a purely decorative mark.
//
// "horizontal" stacks vertically on narrow screens (avoids overflow in a
// tight card column) and lays out left-to-right from md up, where the
// case-study page has the full container width to use.
export default function ProjectFlow({
  steps,
  label,
  orientation = "vertical",
}: {
  steps: string[];
  label?: string;
  tone?: Tone;
  orientation?: Orientation;
}) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="list"
      aria-label={label ? `System flow for ${label}` : "System flow"}
      className={
        isHorizontal
          ? "flex flex-col items-start gap-0 md:flex-row md:flex-wrap md:items-center"
          : "flex flex-col items-start gap-0"
      }
    >
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <span
            role="listitem"
            className="mono-label text-[10px] leading-none whitespace-nowrap border border-border px-2.5 py-2 text-ink-mute transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--brand-text)_40%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--brand-text)_8%,transparent)] group-hover:text-ink"
          >
            <span className="text-brand-text">{String(i + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-[color-mix(in_srgb,var(--ink-mute)_40%,transparent)] transition-colors duration-300 group-hover:text-[color-mix(in_srgb,var(--brand-text)_40%,transparent)]">
              ·
            </span>
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={
                isHorizontal
                  ? "text-[10px] my-1 ml-2.5 text-brand-text opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:my-0 md:mx-2"
                  : "text-[10px] my-1 ml-2.5 text-brand-text opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              }
            >
              <span className={isHorizontal ? "md:hidden" : undefined}>&#8595;</span>
              {isHorizontal && <span className="hidden md:inline">&#8594;</span>}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
