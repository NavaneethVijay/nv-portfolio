import React from "react";
import { motion } from "framer-motion";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

// "8+ years" is the real figure already stated in the About copy. "04" is
// the real count of skill categories in the Skills section below. The
// quote is the line the site opens with — not a business metric strip.
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
          className="grid grid-cols-2 md:grid-cols-[repeat(3,1fr)_2fr] items-center gap-6 md:gap-5 py-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpItem}
              className="flex items-center gap-4 md:border-r md:border-border md:pr-4"
            >
              <span className="font-serif text-4xl md:text-5xl text-brand-text leading-none">
                {stat.value}
              </span>
              <span className="mono-label text-[12px] text-ink-mute leading-snug whitespace-pre-line">
                {stat.label}
              </span>
            </motion.div>
          ))}
          <motion.p
            variants={fadeUpItem}
            className="font-serif italic text-base md:text-lg text-ink leading-snug col-span-2 md:col-span-1 md:justify-self-end md:max-w-[280px] mt-2 md:mt-0"
          >
            &ldquo;Good engineering is the practice of making complex things feel
            inevitable.&rdquo;
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
