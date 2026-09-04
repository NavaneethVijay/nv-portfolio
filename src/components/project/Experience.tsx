import React from "react";
import SectionHeadings from "./SectionHeadings";

export function Experience() {
  const skillCategories: Record<
    string,
    { title: string; skills: string[]; featured?: boolean }
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
      featured: true,
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

  const SkillCard = ({
    title,
    skills,
    featured,
  }: {
    title: string;
    skills: string[];
    featured?: boolean;
  }) => (
    <div
      className={`rounded-xl border p-6 flex flex-col gap-3.5 ${
        featured
          ? "border-brand bg-[color-mix(in_srgb,var(--brand)_8%,var(--card))] sm:col-span-2 lg:col-span-1"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="font-display text-[15px] font-bold text-ink">{title}</div>
        {featured && (
          <span className="font-hand text-brand-text text-base -rotate-2">go-to</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-chip border border-chip-border text-chip-text text-[13px] font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeadings
        title="Skills, sharpened over time"
        seoTitle="Skills & Tech Stack"
        description="A focused toolbox, not an exhaustive one."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(skillCategories).map(([key, { title, skills, featured }]) => (
          <SkillCard key={key} title={title} skills={skills} featured={featured} />
        ))}
      </div>
    </div>
  );
}
