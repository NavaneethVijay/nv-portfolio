"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./SectionHeadings";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

interface Tool {
  name: string;
  href: string;
}

// Same list and copy as the reference design — links point at each tool's
// real product/site.
const tools: Tool[] = [
  { name: "Cursor", href: "https://cursor.com/" },
  { name: "VS Code", href: "https://code.visualstudio.com/" },
  { name: "Warp", href: "https://www.warp.dev/" },
  { name: "Raycast", href: "https://www.raycast.com/" },
  { name: "Arc", href: "https://arc.net/" },
  { name: "Figma", href: "https://www.figma.com/" },
  { name: "GitHub", href: "https://github.com/" },
  { name: "Claude", href: "https://claude.ai/" },
  { name: "ChatGPT", href: "https://chatgpt.com/" },
  { name: "Gemini", href: "https://gemini.google.com/" },
];

export function ProjectsGrid() {
  return (
    <div>
      <SectionLabel index="06" eyebrow="My workbench" />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
        <div className="mt-11 md:mt-14">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUpItem}
            className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86] text-ink"
          >
            The tools are
            <br />
            <em className="font-serif italic text-brand-text">just tools.</em>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUpItem}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-[15px] leading-[1.55] text-ink-mute max-w-xs"
          >
            Still, these are the ones I reach for most often.
          </motion.p>
        </div>
        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-11 md:mt-14 grid grid-cols-1 sm:grid-cols-2 content-start"
        >
          {tools.map((tool, i) => (
            <motion.a
              key={tool.name}
              variants={fadeUpItem}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-4 border-b border-border text-[15px] hover:text-brand-text transition-colors"
            >
              <b className="font-serif not-italic text-brand-text text-[11px] mr-4">
                {String(i + 1).padStart(2, "0")}
              </b>
              {tool.name}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
