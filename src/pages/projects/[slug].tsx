import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  IconArrowBack,
  IconArrowUpRight,
  IconBrandGithub,
  IconPhoto,
} from "@tabler/icons-react";
import ProjectFlow from "@/components/project/ProjectFlow";
import { projects, Project, CaseStudyImage as CaseStudyImageData } from "@/data/projects";

const SITE_URL = "https://www.navaneethvijay.in";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Hero product screenshot is hidden on-page for now (not ready to show
// publicly yet) even where a project already has `images.hero.src` set in
// projects.ts — that data stays put and still feeds the og:image/twitter:image
// meta tags below. Flip this to true to bring the on-page image back.
const SHOW_HERO_IMAGE = false;

function toMetaDescription(text: string): string {
  return text.length > 155 ? `${text.slice(0, 155).trim()}…` : text;
}

function toAbsoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

function CaseStudySection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="py-10 md:py-14 border-b border-border scroll-mt-24">
      <h2 className="mono-label text-[12px] font-bold uppercase tracking-[0.16em] text-ink-mute mb-8 md:mb-10">
        {heading}
      </h2>
      {children}
    </div>
  );
}

interface TocItem {
  id: string;
  label: string;
}

function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav
      aria-label="Case study contents"
      className="py-10 md:py-12 border-y border-border"
    >
      <span className="mono-label text-[11px] font-bold uppercase tracking-[0.16em] text-ink-mute mb-5 block">
        Contents
      </span>
      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-baseline gap-2 text-sm text-ink-soft hover:text-brand-text transition-colors"
            >
              <span className="mono-label text-[10px] text-brand-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="border-b border-transparent group-hover:border-brand-text">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-3 max-w-3xl text-base leading-relaxed text-ink-soft">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function CaseStudyImage({
  image,
  aspect = "aspect-video",
}: {
  image: CaseStudyImageData;
  aspect?: string;
}) {
  if (image.src) {
    return (
      <div className="w-full border border-border overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={1600}
          height={900}
          sizes="100vw"
          className="block w-full h-auto"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full ${aspect} border border-dashed border-border bg-paper-alt flex flex-col items-center justify-center gap-2`}
      role="img"
      aria-label={image.alt}
    >
      <IconPhoto className="h-5 w-5 text-ink-mute" />
      <span className="mono-label text-[11px] uppercase tracking-[0.14em] text-ink-mute">
        {image.label} <span className="text-brand-text">·</span> pending
      </span>
    </div>
  );
}

function ExternalLinks({ websiteUrl, githubUrl }: { websiteUrl?: string; githubUrl?: string }) {
  if (!websiteUrl && !githubUrl) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-ink px-4 py-2 mono-label text-[11px] font-bold uppercase text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Visit website
          <IconArrowUpRight className="h-4 w-4" />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-border px-4 py-2 mono-label text-[11px] font-bold uppercase text-ink-soft hover:border-ink hover:text-ink transition-colors"
        >
          <IconBrandGithub className="h-4 w-4" />
          View on GitHub
        </a>
      )}
    </div>
  );
}

function PointList({ points }: { points: { title: string; detail: string }[] }) {
  return (
    <div className="divide-y divide-border border-t border-border max-w-3xl">
      {points.map((point) => (
        <div key={point.title} className="py-5">
          <h3 className="font-display font-semibold text-ink text-base md:text-lg mb-1.5">
            {point.title}
          </h3>
          <p className="text-base leading-relaxed text-ink-soft">{point.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCaseStudyPage({ project }: { project: Project }) {
  if (!project) return null;

  const url = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.title} | Sai Navaneeth V`;
  const description = toMetaDescription(project.description);
  const heroImage = project.caseStudy?.images?.hero;
  const ogImage = heroImage?.src ? toAbsoluteUrl(heroImage.src) : DEFAULT_OG_IMAGE;
  const ogImageAlt = heroImage?.src ? heroImage.alt : `${project.title} case study`;
  const keywords = [project.eyebrow, ...project.techStack].join(", ");

  const caseStudy = project.caseStudy;
  const tocItems: TocItem[] = [{ id: "how-it-works", label: "How it works" }];
  if (caseStudy) {
    tocItems.push({ id: "problem", label: "The problem" });
    tocItems.push({ id: "architecture", label: "Architecture" });
    tocItems.push({ id: "design-decisions", label: "Design decisions" });
    if (caseStudy.teamWorkspaces) {
      tocItems.push({ id: "team-workspaces", label: "Team workspaces" });
    }
    if (caseStudy.aiArchitecture) {
      tocItems.push({ id: "ai-architecture", label: "AI architecture" });
    }
    tocItems.push({ id: "security", label: "Security" });
    tocItems.push({ id: "constraints", label: "Constraints & tradeoffs" });
    tocItems.push({ id: "deployment", label: "Deployment" });
    tocItems.push({ id: "current-state", label: "Current state" });
    if (caseStudy.whatILearned) {
      tocItems.push({ id: "what-i-learned", label: "What I learned" });
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
      </Head>

      <div className="container mx-auto px-6 md:px-0 py-20 md:py-28">
        <Link
          href="/projects"
          className="flex items-center gap-1.5 mono-label text-xs text-ink-mute hover:text-brand-text transition-colors mb-10 md:mb-14"
        >
          <IconArrowBack className="h-4 w-4" /> Back to all projects
        </Link>

        <span className="mono-label text-[12px] font-bold uppercase tracking-[0.16em] text-brand-text">
          {project.eyebrow}
        </span>

        <h1 className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86] text-ink mt-6 mb-6 max-w-4xl">
          {project.title}
        </h1>

        <p className="font-serif italic text-xl md:text-2xl text-brand-text mb-11 md:mb-14">
          {project.caption}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 pb-8 md:pb-10 border-b border-border">
          <div className="md:col-span-7 flex flex-col gap-8">
            <p className="text-base md:text-lg leading-relaxed text-ink-soft">
              {project.description}
            </p>
            <ExternalLinks websiteUrl={project.websiteUrl} githubUrl={project.githubUrl} />
          </div>
          <div className="md:col-span-5 flex flex-wrap content-start gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase tracking-wide text-ink-mute border border-border px-2.5 py-2"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {caseStudy && <TableOfContents items={tocItems} />}

        {SHOW_HERO_IMAGE && project.caseStudy?.images?.hero && (
          <div className="py-10 md:py-14 border-b border-border">
            <CaseStudyImage image={project.caseStudy.images.hero} />
          </div>
        )}

        <div id="how-it-works" className="py-10 md:py-14 border-b border-border scroll-mt-24">
          <h2 className="mono-label text-[12px] font-bold uppercase tracking-[0.16em] text-ink-mute mb-8 md:mb-10">
            How it works
          </h2>
          <ProjectFlow steps={project.flow} label={project.title} orientation="horizontal" />
        </div>

        {project.caseStudy && (
          <>
            <CaseStudySection id="problem" heading="The problem">
              <p className="max-w-3xl text-base leading-relaxed text-ink-soft">
                {project.caseStudy.problem}
              </p>
            </CaseStudySection>

            <CaseStudySection id="architecture" heading="Architecture">
              <BulletList items={project.caseStudy.architecture} />
              {project.caseStudy.images?.architecture && (
                <div className="mt-8">
                  <CaseStudyImage image={project.caseStudy.images.architecture} />
                </div>
              )}
            </CaseStudySection>

            <CaseStudySection id="design-decisions" heading="Design decisions">
              <PointList points={project.caseStudy.designDecisions} />
            </CaseStudySection>

            {project.caseStudy.teamWorkspaces && (
              <CaseStudySection id="team-workspaces" heading="Team workspaces">
                <BulletList items={project.caseStudy.teamWorkspaces} />
              </CaseStudySection>
            )}

            {project.caseStudy.aiArchitecture && (
              <CaseStudySection id="ai-architecture" heading="AI architecture">
                <BulletList items={project.caseStudy.aiArchitecture} />
              </CaseStudySection>
            )}

            <CaseStudySection id="security" heading="Security">
              <BulletList items={project.caseStudy.security} />
            </CaseStudySection>

            <CaseStudySection id="constraints" heading="Constraints & tradeoffs">
              <PointList points={project.caseStudy.constraints} />
            </CaseStudySection>

            <CaseStudySection id="deployment" heading="Deployment">
              <BulletList items={project.caseStudy.deployment} />
            </CaseStudySection>

            <CaseStudySection id="current-state" heading="Current state">
              <p className="max-w-3xl text-base leading-relaxed text-ink-soft">
                {project.caseStudy.currentState}
              </p>
            </CaseStudySection>

            {project.caseStudy.whatILearned && (
              <CaseStudySection id="what-i-learned" heading="What I learned">
                <p className="max-w-3xl text-base leading-relaxed text-ink-soft">
                  {project.caseStudy.whatILearned}
                </p>
              </CaseStudySection>
            )}
          </>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: projects
      .filter((project) => project.slug)
      .map((project) => ({ params: { slug: project.slug as string } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
};
