import SectionHeadings from "@/components/project/SectionHeadings";
import {
  IconAward,
  IconCertificate,
  IconSchool,
} from "@tabler/icons-react";
import React, { ReactNode } from "react";
import Head from "next/head";

interface JobExperience {
  year: string | number;
  title: string;
  company: string;
  description: ReactNode;
}

interface Engagement {
  company: string;
  role: string;
  highlights: string[];
  stack: string[];
}

const getStackBadge = (stack: string) => {
  return (
    <span
      key={stack}
      className="leading-5 mb-2 dark:border dark:border-zinc-700 text-gray-700 dark:text-gray-300 dark:bg-transparent rounded-md text-sm italic bg-gray-50 mr-2 px-1"
    >
      {stack}
    </span>
  );
};

const experiences: JobExperience[] = [
  {
    year: `${new Date().getFullYear()} - 2021`,
    title: "Solution Architect / Technical Lead",
    company: "Codilar Technologies Pvt. Ltd",
    description: (
      <div>
        Lead the technical blueprints and fullstack engineering strategy for
        multi-million dollar enterprise apps, focusing on decoupled,
        resilient micro-frontends and microservices. Designed custom state
        management patterns and lazy-loading boundaries that cut initial page
        load times by 30%, and built automated CI/CD pipelines that
        accelerated deployment velocity by 40% across engineering squads.
        Championed clean code standards and mentored over 10 junior and
        mid-level engineers into core contributors, while architecting
        AI-native features such as RAG pipelines and knowledge graphs.
        <div className="flex flex-wrap gap-2 mt-4">
          {getStackBadge("Next.js")}
          {getStackBadge("TypeScript")}
          {getStackBadge("RAG / GenAI")}
          {getStackBadge("AWS")}
          {getStackBadge("Docker")}
          {getStackBadge("GitHub Actions")}
        </div>
      </div>
    ),
  },
  {
    year: "2021 - 2020",
    title: "Senior Magento Developer",
    company: "Codilar Technologies Pvt. Ltd",
    description: (
      <div>
        Promoted to Senior Magento Developer, my interest towards backend
        development increased and I started working on features involving
        Magento module development and customization along with the UI of
        the website. Completed my certification on Magento Frontend. I was
        handling multiple project developments and also helping the team in
        solving complex UI issues.
        <div className="flex flex-wrap gap-2 mt-4">
          {getStackBadge("React.js")}
          {getStackBadge("PHP")}
          {getStackBadge("Magento")}
          {getStackBadge("Team management")}
          {getStackBadge("Project estimations")}
        </div>
      </div>
    ),
  },
  {
    year: "2020 - 2018",
    title: "Associate Software Developer",
    company: "Codilar Technologies Pvt. Ltd",
    description: (
      <div>
        Started my career as an Associate Software Developer in an
        e-commerce agency, having had a few other offers in hand but chose
        this to work in the web development domain. Quickly adapted to
        Magento architecture and started working on headless e-commerce
        projects.
        <div className="flex flex-wrap gap-2 mt-4">
          {getStackBadge("Magento")}
          {getStackBadge("MVC architecture")}
          {getStackBadge("Vue.js")}
          {getStackBadge("Knockout.js")}
        </div>
      </div>
    ),
  },
];

const engagements: Engagement[] = [
  {
    company: "Enterprise Drupal Knowledge Platform",
    role: "Technical Lead",
    highlights: [
      "Architected a modular, enterprise-grade knowledge platform integrating securely with multiple Drupal websites through REST/JSON:API connectors to transform raw content into a structured knowledge graph.",
      "Developed recursive content crawling and metadata-driven dependency analysis to power an AI conversational interface via Retrieval-Augmented Generation (RAG).",
      "Implemented extensible provider interfaces and local-first pluggable persistence to support future expansion into Azure Wiki, SharePoint, Confluence, and multi-tenant cloud deployments.",
    ],
    stack: ["Drupal JSON:API", "RAG", "Knowledge Graphs", "Node.js"],
  },
  {
    company: "Bayer's Pharmaceutics (Germany)",
    role: "Senior Frontend Developer to Frontend Team Lead",
    highlights: [
      "Started as Senior Frontend Developer setting core UI standards, and was quickly promoted to Team Lead to own front-end delivery and the engineering timeline.",
      "Engineered a decoupled, distributed microservices setup hooking a headless Drupal CMS backend up seamlessly with a high-scale Next.js app.",
      "Architected a high-traffic production environment on Vercel, implementing complex authentication flows, secure routing, and edge-side optimizations.",
      "Scaled test coverage with Jest, Storybook, automated coverage thresholds in GitHub Workflows, and a custom visual regression testing system built from scratch.",
    ],
    stack: ["Next.js", "Headless Drupal", "Vercel", "Jest", "Storybook"],
  },
  {
    company: "Tiger-One Distribution",
    role: "Technical Lead",
    highlights: [
      "Architected an enterprise multi-website, multi-tenant B2B/B2C platform scaling smoothly across multiple regional locales, powered by Adobe Commerce (Magento) as a headless backend engine.",
      "Orchestrated high-performance PWA storefront networks using ScandiPWA and modern React, achieving near-instant page transitions and sub-second mobile load speeds.",
    ],
    stack: ["Adobe Commerce", "ScandiPWA", "React", "PWA"],
  },
  {
    company: "Danube Homes",
    role: "Technical Lead",
    highlights: [
      "Engineered a bespoke, real-time inventory ledger and order management system that synchronized third-party enterprise CRM/ERP data across multiple fulfillment centers.",
      "Integrated an interactive checkout experience using the Google Maps API for spatial address selection, dropping last-mile delivery failures by 30% and boosting successful checkouts by 40%.",
    ],
    stack: ["Google Maps API", "CRM/ERP Integrations", "Node.js"],
  },
  {
    company: "Aldo Singapore",
    role: "Senior Frontend Developer",
    highlights: [
      "Worked on a modern, composable MACH system running a distributed Order Management System built on top of core AWS infrastructure.",
      "Wrote highly efficient scripts using automated caching patterns, edge execution budgets, and lazy-loaded third-party pipelines to recover 20% of lost initial load speed.",
    ],
    stack: ["MACH Architecture", "AWS", "Performance Engineering"],
  },
  {
    company: "Samyakk",
    role: "Senior Frontend Developer",
    highlights: [
      "Led the platform's transition to a decoupled Vue Storefront framework integrated into a headless commerce backend.",
      "Implemented complex, asynchronous filtering tools and recommendation indexes tailored to handle heavy media assets without lagging, resulting in an app-like mobile experience.",
    ],
    stack: ["Vue Storefront", "Headless Commerce"],
  },
];

const certifications = [
  {
    title: "Adobe Certified Expert: Digital Experience Front-End Developer",
    icon: <IconCertificate className="h-6 w-6 text-yellow-500 shrink-0" />,
  },
  {
    title:
      "World Traveler Award (Meet Magento NY) — outstanding global architecture execution",
    icon: <IconAward className="h-6 w-6 text-yellow-500 shrink-0" />,
  },
  {
    title:
      "B2B Champ Award (Meet Magento India) — best-in-class scalable B2B enterprise infrastructure",
    icon: <IconAward className="h-6 w-6 text-yellow-500 shrink-0" />,
  },
  {
    title:
      "Adobe Experience Maker Award — high-performance, multi-currency localization engines",
    icon: <IconAward className="h-6 w-6 text-yellow-500 shrink-0" />,
  },
];

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Head>
        <title>Experience | Navaneeth Vijay</title>
        <meta
          name="description"
          content="Navaneeth Vijay's work experience as a Solution Architect and Senior Fullstack Engineer, including career history, key client engagements, certifications, and education."
        />
        <link rel="canonical" href="https://www.navaneethvijay.in/experience" />
      </Head>
      <h1 className="sr-only">
        Navaneeth Vijay — Experience, Certifications, and Education
      </h1>
      <section className="mt-20 pt-10">
        <SectionHeadings
          title="Journey Through the Ranks"
          seoTitle="Work Experience"
          description="From trusted roles to key projects, each step crafted with loyalty and expertise"
        />
      </section>
      <div className="relative mt-20">
        {experiences.map((experience, index) => {
          return (
            <div
              key={index}
              className="mb-8 flex justify-between items-start w-full font-libreFranklin"
            >
              <div className="z-20 flex items-center w-2/12 md:w-1/12 order-1">
                <p className="mt-4 text-yellow-400 font-cinzel font-semibold text-lg">
                  {experience.year}
                </p>
              </div>

              <div className="order-2 rounded-lg shadow-xl w-10/12 md:w-8/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-2xl">{experience.title}</h3>
                <h4 className="mb-3 font-semibold text-primary text-md">
                  {experience.company}
                </h4>
                <div className="text-sm leading-snug tracking-wide text-gray-400 dark:text-neutral-300">
                  {experience.description}
                </div>
              </div>

              <div className="order-3 md:w-3/12"></div>
            </div>
          );
        })}
        <div
          className="absolute h-full w-1 bg-neutral-800 left-6 top-6 transform -translate-x-1/2"
          data-id="14"
        ></div>
      </div>

      <section className="mt-24">
        <SectionHeadings
          title="The Family's Reach"
          seoTitle="Key Client Engagements"
          description="Enterprise campaigns run and won across the world."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 font-libreFranklin">
          {engagements.map((engagement) => (
            <div
              key={engagement.company}
              className="rounded-lg shadow-xl px-6 py-4"
            >
              <h3 className="mb-1 font-bold text-xl">{engagement.company}</h3>
              <h4 className="mb-3 font-semibold text-primary text-md">
                {engagement.role}
              </h4>
              <ul className="list-disc pl-4 space-y-2 text-sm leading-snug tracking-wide text-gray-400 dark:text-neutral-300">
                {engagement.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {engagement.stack.map((stack) => getStackBadge(stack))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeadings
          title="Honors Among Men"
          seoTitle="Certifications & Awards"
          description="Respect, earned the hard way."
        />
        <ul className="mt-10 space-y-4 font-libreFranklin max-w-2xl mx-auto">
          {certifications.map((certification) => (
            <li
              key={certification.title}
              className="flex items-start gap-3 rounded-lg shadow-xl px-6 py-4"
            >
              {certification.icon}
              <span className="text-sm leading-snug tracking-wide text-gray-400 dark:text-neutral-300">
                {certification.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 mb-10">
        <SectionHeadings
          title="Where It Began"
          seoTitle="Education"
          description="Every don starts somewhere."
        />
        <div className="mt-10 flex items-start gap-3 rounded-lg shadow-xl px-6 py-4 max-w-2xl mx-auto font-libreFranklin">
          <IconSchool className="h-6 w-6 text-yellow-500 shrink-0" />
          <div>
            <h3 className="font-bold text-lg">
              Bachelor of Engineering (B.E.) in Information Science and
              Technology
            </h3>
            <p className="text-sm leading-snug tracking-wide text-gray-400 dark:text-neutral-300">
              BNM Institute of Technology, Bengaluru — 2018
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
