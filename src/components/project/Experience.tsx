import React from "react";
import { motion } from "framer-motion";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

export function Experience() {
  const skillCategories: Record<
    string,
    { title: string; skills: string[] }
  > = {
    stack: {
      title: "Modern Fullstack",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Hono",
        "PostgreSQL",
        "Supabase",
        "Vercel",
      ],
    },
    ai: {
      title: "Applied AI Engineering",
      skills: [
        "LLM APIs (OpenAI, Anthropic, Gemini)",
        "RAG & Vector Search",
        "pgvector / Pinecone / Supabase Vector",
        "Tool-calling Agents",
      ],
    },
    commerce: {
      title: "Enterprise Composable Commerce",
      skills: [
        "Adobe Commerce (Magento)",
        "MACH Architecture",
        "GraphQL",
        "Headless Frontends",
        "Micro-Frontends",
      ],
    },
    devops: {
      title: "Cloud, DevOps & Testing",
      skills: [
        "AWS",
        "Docker",
        "GitHub Actions (CI/CD)",
        "Jest",
        "Playwright",
        "Storybook",
      ],
    },
  };

  return (
    <div className="container p-0  mx-auto py-20 md:py-28">
      <div className="bg-panel-ink text-panel-ink-fg px-6 md:px-10 md:p-14">
        <div className="flex items-center gap-6 mb-11 md:mb-14 pt-10 md:pt-0">
          <span className="text-[10px] font-bold text-brand-on-dark">03</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-panel-ink-fg/70">
            How I work
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-x-12 gap-y-9 md:gap-y-0 items-end mb-14 md:mb-16">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUpItem}
            className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86]"
          >
            Think in
            <br />
            <em className="font-serif italic text-brand-on-dark">systems.</em>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUpItem}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-[15px] leading-[1.55] text-panel-ink-fg/70 max-w-[330px]"
          >
            Tools change. Principles compound. I bring product thinking, technical depth, and a
            bias toward simple solutions to complex problems.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-px bg-panel-ink-fg/20 border-t border-panel-ink-fg/20"
        >
          {Object.entries(skillCategories).map(([key, { title, skills }], i) => (
            <motion.div
              key={key}
              variants={fadeUpItem}
              className="bg-panel-ink px-0 md:px-[22px] py-6 min-h-[200px] md:border-r border-panel-ink-fg/20"
            >
              <span className="text-[14px] text-brand-on-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl mt-2 mb-6 md:my-7 tracking-[-0.03em]">{title}</h3>
              <ul className="text-panel-ink-fg/70 text-[14px] leading-[1.9] list-none">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
