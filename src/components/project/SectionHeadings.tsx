import React from "react";
import { motion } from "framer-motion";
import { fadeUpItem } from "@/lib/motion";

export function SectionLabel({
  index,
  eyebrow,
}: {
  index?: string;
  eyebrow?: string;
}) {
  if (!index && !eyebrow) return null;
  return (
    <div className="flex items-center gap-6">
      {index && <span className="text-[12px] font-bold text-brand-text">{index}</span>}
      {eyebrow && (
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-mute">
          {eyebrow}
        </span>
      )}
    </div>
  );
}

export default function SectionHeadings({
  title,
  seoTitle,
  description,
  descriptionSlot,
  id,
  index,
  eyebrow,
  emphasize,
}: {
  title: string;
  seoTitle?: string;
  description?: string;
  /** Renders in place of `description` when set — for a link or other
   * non-text content in that slot (e.g. "View all projects"). */
  descriptionSlot?: React.ReactNode;
  id?: string;
  index?: string;
  /** ALL CAPS masthead label, e.g. "Selected work". */
  eyebrow?: string;
  /** Trailing substring of `title` to render in Georgia italic accent. */
  emphasize?: string;
}) {
  let prefix = title;
  let accent = "";
  if (emphasize && title.includes(emphasize)) {
    const at = title.lastIndexOf(emphasize);
    prefix = title.slice(0, at);
    accent = title.slice(at);
  }

  return (
    <div id={id}>
      <SectionLabel index={index} eyebrow={eyebrow} />
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-x-12 gap-y-9 md:gap-y-0 items-end mt-11 mb-12 md:mt-14 md:mb-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpItem}
          className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86] text-ink"
        >
          {seoTitle && <span className="sr-only">{seoTitle}</span>}
          <span aria-hidden={!!seoTitle}>
            {prefix}
            {accent && (
              <>
                <br />
                <em className="font-serif italic text-brand-text">{accent}</em>
              </>
            )}
          </span>
        </motion.h2>
        {(descriptionSlot || description) && (
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUpItem}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-[15px] leading-[1.55] text-ink-mute max-w-[330px]"
          >
            {descriptionSlot ?? description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
