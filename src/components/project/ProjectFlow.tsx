import React from "react";
import { cn } from "@/lib/utils";

type Tone = "ink" | "sand" | "blue";

type Orientation = "vertical" | "horizontal";

// Compact system-flow diagram for a project's visual panel — the Theme 2
// element. Communicates how the system works, not the tech stack, in place
// of a purely decorative mark.
//
// "horizontal" stacks vertically on narrow screens (avoids overflow in a
// tight card column) and lays out left-to-right from md up, where the
// case-study page has the full container width to use.
//
// "vertical" (the card's own flow panel) is itself responsive: below md it's
// a single horizontally-scrollable row (fixed height regardless of step
// count, avoids the tall wall-of-chips a full vertical stack becomes on a
// narrow card), and reverts to the original stacked column from md up.
export default function ProjectFlow({
  steps,
  label,
  orientation = "vertical",
  className,
}: {
  steps: string[];
  label?: string;
  tone?: Tone;
  orientation?: Orientation;
  className?: string;
}) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="list"
      aria-label={label ? `System flow for ${label}` : "System flow"}
      className={cn(
        isHorizontal
          ? "flex flex-col items-start gap-0 md:flex-row md:flex-wrap md:items-center"
          : "flex flex-row items-center gap-0 overflow-x-auto snap-x snap-proximity flex-nowrap pr-8 pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-28px),transparent)] [-webkit-mask-image:linear-gradient(to_right,black_calc(100%-28px),transparent)] md:pr-0 md:pb-0 md:snap-none md:[mask-image:none] md:[-webkit-mask-image:none] md:flex-col md:items-start md:overflow-visible",
        className
      )}
    >
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <span
            role="listitem"
            className="mono-label text-[10px] leading-none whitespace-nowrap shrink-0 snap-start border border-border px-2.5 py-2 text-ink-mute transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--brand-text)_40%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--brand-text)_8%,transparent)] group-hover:text-ink"
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
                  : "text-[10px] mx-1.5 shrink-0 text-brand-text opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:mx-0 md:my-1 md:ml-2.5"
              }
            >
              {isHorizontal ? (
                <>
                  <span className="md:hidden">&#8595;</span>
                  <span className="hidden md:inline">&#8594;</span>
                </>
              ) : (
                <span className="inline-block -rotate-90 md:rotate-0">&#8595;</span>
              )}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
