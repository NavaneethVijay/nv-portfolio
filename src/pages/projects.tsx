import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { IconBrandGithub } from "@tabler/icons-react";
import WorkCard from "@/components/project/WorkCard";
import { SectionLabel } from "@/components/project/SectionHeadings";
import { projects, TONES } from "@/data/projects";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

const TITLE = "Projects | Sai Navaneeth V";
const DESCRIPTION =
  "The full list of things Navaneeth Vijay has built: AI tooling, production apps, systems software, and performance tooling, each with a look at how the system actually flows.";
const URL = "https://www.navaneethvijay.in/projects";
const OG_IMAGE = "https://www.navaneethvijay.in/og-image.png";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 md:px-0 py-20 md:py-28">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <motion.div variants={fadeUpContainer} initial="hidden" animate="show">
        <SectionLabel eyebrow="All projects" />
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-x-[50px] gap-y-[35px] md:gap-y-0 items-end mt-[45px] mb-[50px] md:mt-[58px] md:mb-20">
          <motion.h1
            variants={fadeUpItem}
            className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86] text-ink"
          >
            Everything I&apos;ve
            <br />
            <em className="font-serif italic text-brand-text">shipped.</em>
          </motion.h1>
          <motion.p
            variants={fadeUpItem}
            className="text-[15px] leading-[1.55] text-ink-mute max-w-[330px]"
          >
            The full catalog, not just the highlights: AI tooling, production apps, systems
            software, and the tooling that keeps it all honest.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        className="flex flex-col gap-8 lg:gap-10"
      >
        {projects.map((project, i) => (
          <motion.div key={project.title} variants={fadeUpItem}>
            <WorkCard
              order={String(i + 1).padStart(2, "0")}
              tone={TONES[i % TONES.length]}
              title={project.title}
              description={project.description}
              href={project.websiteUrl ?? project.githubUrl}
              caseStudyHref={project.slug ? `/projects/${project.slug}` : undefined}
              technologies={project.techStack}
              flow={project.flow}
              eyebrow={project.eyebrow}
              caption={project.caption}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUpItem}
        className="flex justify-center mt-12"
      >
        <a
          href="https://github.com/NavaneethVijay"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mono-label text-xs font-medium text-ink-soft hover:text-brand-text transition-colors"
        >
          <IconBrandGithub className="h-4 w-4" />
          More on GitHub
        </a>
      </motion.div>
    </div>
  );
}
