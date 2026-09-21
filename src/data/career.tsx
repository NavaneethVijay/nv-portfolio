import React from "react";
import { CareerEntry } from "@/components/project/CareerTimeline";

// Newest first — the timeline reads present-to-past, leading with the
// current role. Shared between the homepage summary and the full
// /experience page so the two never drift.
export const careerHistory: CareerEntry[] = [
  {
    year: "2021 - Present",
    title: "Solution Architect / Technical Lead",
    company: "Codilar Technologies Pvt. Ltd.",
    description: (
      <div>
        Own technical architecture, full-stack product strategy, and
        cloud-native deployment for high-scale platforms, managing
        multi-million dollar transaction volumes and hundreds of thousands of
        monthly active users. Designed custom state-management and
        lazy-loading patterns that slashed initial page load times by 30%,
        and built automated CI/CD pipelines that accelerated deployment
        velocity by 40% across engineering teams. Set high-quality
        engineering and testing standards across multiple projects, and
        mentored 10+ junior and mid-level engineers into core system
        contributors, all while architecting AI-native features such as RAG
        pipelines, tool-calling agents, and knowledge graphs.
      </div>
    ),
    stack: ["Next.js", "TypeScript", "GraphQL", "RAG / GenAI", "AWS", "Docker", "GitHub Actions"],
    current: true,
  },
  {
    year: "2020 - 2021",
    title: "Senior Magento Developer",
    company: "Codilar Technologies Pvt. Ltd.",
    description: (
      <div>
        Promoted to Senior Magento Developer as my interest in backend
        development grew. Worked on Magento module development and
        customization alongside frontend UI, completed a certification on
        Magento Frontend, and handled multiple project deliveries while
        helping the team resolve complex UI issues.
      </div>
    ),
    stack: ["React.js", "PHP", "Magento", "Team Management", "Project Estimation"],
  },
  {
    year: "2018 - 2020",
    title: "Associate Software Developer",
    company: "Codilar Technologies Pvt. Ltd.",
    description: (
      <div>
        Started my career as an Associate Software Developer in an
        e-commerce agency. Quickly adapted to Magento architecture and
        started working on headless e-commerce projects, laying the
        foundation for everything that followed.
      </div>
    ),
    stack: ["Magento", "MVC Architecture", "Vue.js", "Knockout.js"],
  },
];
