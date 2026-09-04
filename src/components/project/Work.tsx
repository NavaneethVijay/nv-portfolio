import React from "react";
import WorkCard from "./WorkCard";
import {
  IconBrandGithub,
  IconBuildingSkyscraper,
  IconDatabaseDollar,
  IconDeviceDesktop,
  IconMailFast,
  IconPhotoAi,
  IconRobot,
  IconTestPipe2,
} from "@tabler/icons-react";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  logoSvg?: React.ReactNode;
  tag?: string;
}

const projects: Project[] = [
  {
    title: "Flowmail",
    description:
      "An AI email productivity platform on Cloud Run with Supabase, integrating Gmail via OAuth. A Gemini-powered feature suggests board organization and automated rules with a human-in-the-loop accept/reject workflow.",
    techStack: ["Next.js", "Node.js", "Supabase", "Gemini API"],
    githubUrl: "https://www.flowmail.in/",
    logoSvg: <IconMailFast className="h-6 w-6" />,
    tag: "live demo",
  },
  {
    title: "Drupal Copilot",
    description:
      "A working prototype of an LLM tool-calling agent that answers natural-language questions about a Drupal site's content and configuration, backed by a crawler that builds a searchable SQLite knowledge graph.",
    techStack: ["Next.js", "OpenRouter", "SQLite"],
    logoSvg: <IconRobot className="h-6 w-6" />,
  },
  {
    title: "Rynto",
    description:
      "A live property management app in daily production, designed and shipped solo. A double-entry ledger tracks balances, with tenant KYC verification and row-level-security private storage.",
    techStack: ["Expo / React Native", "TypeScript", "Supabase", "PostgreSQL"],
    logoSvg: <IconBuildingSkyscraper className="h-6 w-6" />,
  },
  {
    title: "Overwatch Node",
    description:
      "A native macOS menu bar app in Swift that exposes running apps and system state over a local WebSocket server, paired with a React Native companion app for real-time switching over the local network.",
    techStack: ["Swift", "React Native (Expo)", "WebSocket"],
    githubUrl: "https://github.com/NavaneethVijay/Overwatch-Node",
    logoSvg: <IconDeviceDesktop className="h-6 w-6" />,
  },
  {
    title: "BackstopJS-UI",
    description:
      "A self-hosted visual regression testing tool built on top of BackstopJS, with a GitHub Actions pipeline that crawls a sitemap and deploys reference/test screenshots to Vercel. Built to catch visual regressions before they ship. This kind of automated gate is what let my teams push deployment velocity up 40% without trading away release confidence.",
    techStack: ["Vite", "React", "Playwright", "BackstopJS"],
    githubUrl: "https://github.com/NavaneethVijay/backstopjs-visual-testing",
    logoSvg: <IconTestPipe2 className="h-6 w-6" />,
  },
  {
    title: "Self-Hosted Image Optimizer",
    description:
      "A high-performance image optimization server inspired by Next.js's image pipeline, using GoogleChromeLabs' Squoosh under the hood to compress images on the fly. Born out of chasing page-load budgets on high-traffic platforms, the same instinct behind a 30% initial load-time improvement on production work.",
    techStack: ["Node.js", "Squoosh"],
    githubUrl: "https://github.com/NavaneethVijay/squoosh-image",
    logoSvg: <IconPhotoAi className="h-6 w-6" />,
  },
  {
    title: "Custom Ecommerce Cart Rules Generator",
    description:
      "A standalone cart rules engine built for heavy marketing campaigns, with API endpoints for direct sync with PIM and OMS systems.",
    techStack: ["Node.js", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/NavaneethVijay/rule-engine-api",
    logoSvg: <IconDatabaseDollar className="h-6 w-6" />,
  },
];

export default function Work() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-0">
        {projects.map((project) => (
          <WorkCard
            key={project.title}
            title={project.title}
            description={project.description}
            href={project.githubUrl}
            technologies={project.techStack}
            logoSvg={project.logoSvg}
            tag={project.tag ?? (project.githubUrl?.includes("github.com") ? "on github" : undefined)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a
          href="https://github.com/NavaneethVijay"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-brand transition-colors"
        >
          <IconBrandGithub className="h-4 w-4" />
          More on GitHub
        </a>
      </div>
    </div>
  );
}
