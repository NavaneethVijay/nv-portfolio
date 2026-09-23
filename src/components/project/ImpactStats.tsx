import React from "react";
import { motion } from "framer-motion";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

// "8+ years" is the real figure already stated in the About copy. "04" is
// the real count of skill categories in the Skills section below. The
// quote closes the strip — it is not a business metric.
const stats = [
  { value: "8+", label: "Years in\nengineering" },
  { value: "04", label: "Ways of\nthinking" },
  { value: "∞", label: "Questions\nstill open" },
];

export default function ImpactStats() {
  return (
    <div className="border-b border-border">
      <div className="container mx-auto px-6 md:px-0">
        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col md:grid md:grid-cols-[repeat(3,1fr)_2fr] md:items-center gap-6 md:gap-5 py-8"
        >
          {/* Mobile: one horizontally scrollable row inside the page gutter.
              Desktop: `contents` drops the wrapper so the stats sit
              directly in the grid's first three columns. */}
          <div className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:contents">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUpItem}
                className="shrink-0 flex items-center gap-4 border-r border-border pr-6 last:border-r-0 md:last:border-r md:pr-4"
              >
                <span className="font-serif text-4xl md:text-5xl text-brand-text leading-none">
                  {stat.value}
                </span>
                <span className="mono-label text-[12px] text-ink-mute leading-snug whitespace-pre-line">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.p
            variants={fadeUpItem}
            className="font-serif italic text-base md:text-lg text-ink leading-snug md:justify-self-end md:max-w-[280px]"
          >
            &ldquo;If you can&rsquo;t explain it simply, you don&rsquo;t understand
            it well enough.&rdquo;
            <span className="block mt-2 not-italic mono-label text-[11px] text-ink-mute">
              &mdash; Albert Einstein
            </span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
