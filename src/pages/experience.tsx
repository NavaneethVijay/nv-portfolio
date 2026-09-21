import SectionHeadings from "@/components/project/SectionHeadings";
import CareerTimeline from "@/components/project/CareerTimeline";
import EngagementsAccordion, { Engagement } from "@/components/project/EngagementsAccordion";
import { IconAward, IconCertificate, IconSchool } from "@tabler/icons-react";
import React from "react";
import Head from "next/head";
import { careerHistory } from "@/data/career";

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
    company: "Bayer Pharmaceutics (Germany)",
    role: "Team Lead",
    highlights: [
      "Promoted to Team Lead to take full ownership of frontend delivery and engineering timelines for a high-traffic pharmaceutical platform.",
      "Engineered a decoupled microservices platform connecting a headless CMS to a high-scale Next.js application, architecting the production infrastructure on Vercel including secure edge routing and global performance budgets.",
      "Built a testing and quality system from the ground up (Jest, Storybook, Playwright, coverage thresholds) and a custom visual regression engine to support fast, zero-defect production releases.",
    ],
    stack: ["Next.js", "Headless CMS", "Vercel", "Jest", "Storybook"],
  },
  {
    company: "Tiger-One Distribution",
    role: "Solution Architect",
    highlights: [
      "Architected a multi-tenant platform supporting regional B2B and B2C models across multiple countries for a global distribution client, using Adobe Commerce as a headless backend serving an estimated several hundred thousand monthly visitors.",
      "Delivered a high-performance PWA storefront achieving near-instant page transitions and sub-second mobile load times, driving engagement and conversions across regional storefronts.",
    ],
    stack: ["Adobe Commerce", "PWA", "React"],
  },
  {
    company: "Danube Homes",
    role: "Technical Lead",
    highlights: [
      "Designed a real-time inventory and order management system synchronizing complex data across multiple third-party CRM/ERP systems and 5+ global fulfillment centers.",
      "Engineered a custom geospatial checkout experience using the Google Maps API, reducing last-mile delivery failures by 30% and increasing successful checkouts by 40%.",
    ],
    stack: ["Google Maps API", "CRM/ERP Integrations", "Node.js"],
  },
  {
    company: "Aldo Singapore",
    role: "Senior Frontend Developer",
    highlights: [
      "Contributed to a distributed order management system built on a composable (MACH) architecture on AWS, supporting a high-volume retail catalog.",
      "Recovered 20% of lost page load speed through automated caching, edge execution budgets, and lazy-loaded third-party scripts.",
    ],
    stack: ["MACH Architecture", "AWS", "Performance Engineering"],
  },
  {
    company: "Samyakk",
    role: "Senior Frontend Developer",
    highlights: [
      "Led the transition of a massive retail catalog with thousands of SKUs to a decoupled, headless commerce architecture using Vue Storefront.",
      "Built asynchronous filtering and product recommendation systems to support a fast, app-like mobile experience with heavy media assets.",
    ],
    stack: ["Vue Storefront", "Headless Commerce"],
  },
];

const certifications = [
  {
    title: "Adobe Certified Expert: Digital Experience Front-End Developer",
    icon: <IconCertificate className="h-6 w-6 text-brand-text shrink-0" />,
  },
  {
    title:
      "World Traveler Award (Meet Magento NY), for outstanding global architecture execution",
    icon: <IconAward className="h-6 w-6 text-brand-text shrink-0" />,
  },
  {
    title:
      "B2B Champ Award (Meet Magento India), for best-in-class scalable B2B enterprise infrastructure",
    icon: <IconAward className="h-6 w-6 text-brand-text shrink-0" />,
  },
  {
    title:
      "Adobe Experience Maker Award, for high-performance, multi-currency localization engines",
    icon: <IconAward className="h-6 w-6 text-brand-text shrink-0" />,
  },
];

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Head>
        <title>Experience | Sai Navaneeth V</title>
        <meta
          name="description"
          content="Navaneeth Vijay's work experience as a Staff-level Solution Architect and AI-native Full-Stack Engineer, including career history, key client engagements, certifications, and education."
        />
        <link rel="canonical" href="https://www.navaneethvijay.in/experience" />
      </Head>
      <h1 className="sr-only">
        Navaneeth Vijay: Experience, Certifications, and Education
      </h1>

      <section className="pt-6 md:mt-20 md:pt-10">
        <SectionHeadings
          index="01"
          title="Where I've worked"
          emphasize="worked"
          seoTitle="Work Experience"
          description="Eight years, a lot of different hats."
        />
      </section>

      <div className="mt-10">
        <CareerTimeline items={careerHistory} />
      </div>

      <section className="mt-14 md:mt-24">
        <SectionHeadings
          index="02"
          title="Enterprise work, up close"
          emphasize="up close"
          seoTitle="Key Client Engagements"
          description="A few of the platforms I've architected for global clients. Tap one to open it up."
        />
        <EngagementsAccordion engagements={engagements} />
      </section>

      <section className="mt-14 md:mt-24">
        <SectionHeadings
          index="03"
          title="A few nice mentions"
          emphasize="mentions"
          seoTitle="Certifications & Awards"
          description="Recognition along the way."
        />
        <ul className="mt-10 space-y-px bg-border border border-border font-body">
          {certifications.map((certification) => (
            <li
              key={certification.title}
              className="flex items-start gap-3 bg-paper-alt px-6 py-4"
            >
              {certification.icon}
              <span className="text-sm leading-snug text-ink-soft">
                {certification.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 mb-10 md:mt-24">
        <SectionHeadings
          index="04"
          title="Where it started"
          emphasize="started"
          seoTitle="Education"
          description="Every architecture diagram starts somewhere."
        />
        <div className="mt-10 flex items-start gap-3 border border-border bg-paper-alt px-6 py-4 font-body">
          <IconSchool className="h-6 w-6 text-brand-text shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-lg text-ink">
              Bachelor of Engineering (B.E.) in Information Science and Technology
            </h3>
            <p className="text-sm leading-snug text-ink-soft">
              BNM Institute of Technology, Bengaluru
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
