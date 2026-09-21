import React, { ReactNode } from "react";

export interface CareerEntry {
  year: string;
  title: string;
  company: string;
  description: ReactNode;
  stack: string[];
  current?: boolean;
}

const Chip = ({ label }: { label: string }) => (
  <span className="mono-label text-[10.5px] border border-chip-border text-chip-text bg-chip px-2 py-1 mr-2 mb-2 inline-block">
    {label}
  </span>
);

function TimelineRow({ item }: { item: CareerEntry }) {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[110px_30px_1fr] gap-2 sm:gap-6 border-b border-border py-8 sm:items-start">
      {/* Mobile: year + dot stack as row one, content as row two.
          sm:contents drops this wrapper so year/dot become direct grid
          items again, restoring the original 3-column layout. */}
      <div className="flex items-center gap-3 sm:contents">
        <span className="font-serif text-lg text-brand-text sm:pt-0.5">{item.year}</span>
        <span
          aria-hidden="true"
          className={`h-2.5 w-2.5 rounded-full border sm:mt-2 ${
            item.current ? "border-brand bg-brand" : "border-brand"
          }`}
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`font-display text-xl sm:text-[1.75rem] font-medium tracking-[-0.02em] ${
              item.current ? "text-brand-text" : "text-ink"
            }`}
          >
            {item.title}
          </h3>
          {item.current && (
            <span className="mono-label text-[10px] text-ink-mute border border-border px-1.5 py-0.5">
              current
            </span>
          )}
        </div>
        <p className="text-sm text-ink-mute font-medium mt-0.5 mb-3">{item.company}</p>
        <div className="text-sm leading-relaxed text-ink-soft max-w-2xl">{item.description}</div>
        <div className="mt-4">
          {item.stack.map((s) => (
            <Chip key={s} label={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CareerTimeline({ items }: { items: CareerEntry[] }) {
  return (
    <div className="border-t border-border">
      {items.map((item) => (
        <TimelineRow key={item.year} item={item} />
      ))}
    </div>
  );
}
