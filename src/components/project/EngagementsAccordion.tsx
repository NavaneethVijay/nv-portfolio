import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";

export interface Engagement {
  company: string;
  role: string;
  highlights: string[];
  stack: string[];
}

const Chip = ({ label }: { label: string }) => (
  <span className="leading-5 border border-chip-border text-chip-text bg-chip rounded-md text-sm mr-2 mb-2 px-2 py-0.5 inline-block">
    {label}
  </span>
);

export default function EngagementsAccordion({ engagements }: { engagements: Engagement[] }) {
  // All open by default — both for a fuller first impression and so the
  // detail text is present in the initial render for crawlers.
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(engagements.map((_, i) => i))
  );

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden font-body">
      {engagements.map((engagement, index) => {
        const isOpen = openSet.has(index);
        return (
          <div key={engagement.company}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-paper-alt transition-colors"
            >
              <div>
                <h3 className="font-display font-bold text-ink text-base sm:text-lg">
                  {engagement.company}
                </h3>
                <p className="text-sm text-brand-text font-medium mt-0.5">{engagement.role}</p>
              </div>
              <IconChevronDown
                className={`h-5 w-5 text-ink-mute shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <ul className="list-disc pl-4 space-y-2 text-sm leading-snug tracking-wide text-ink-soft">
                      {engagement.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      {engagement.stack.map((s) => (
                        <Chip key={s} label={s} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
