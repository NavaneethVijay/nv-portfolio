import React from "react";
import {
  IconBrandCodepen,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import HeroIllustration from "./HeroIllustration";
import DownloadResume from "./DownloadResume";

// Recruiter-facing: GitHub, LinkedIn, and code portfolio only. Instagram/Twitter
// live in the footer as a secondary, personal-touch link set.
const socials = [
  { href: "https://github.com/NavaneethVijay", label: "GitHub", Icon: IconBrandGithub },
  { href: "https://www.linkedin.com/in/sai-navaneeth-v/", label: "LinkedIn", Icon: IconBrandLinkedin },
  { href: "https://codepen.io/NavaneethVijay", label: "CodePen", Icon: IconBrandCodepen },
];

const stats = [
  { value: "40%", label: "checkout conversion lift", trend: "up" as const },
  { value: "30%", label: "faster page loads", trend: "up" as const },
  { value: "30%", label: "fewer delivery failures", trend: "down" as const },
];

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="nv-blob w-[28rem] h-[28rem] -top-40 -right-28 bg-[radial-gradient(circle,var(--brand)_0%,transparent_70%)] opacity-30 animate-drift" />
      <div className="nv-blob w-[26rem] h-[26rem] -bottom-48 -left-24 bg-[radial-gradient(circle,#ffcf8a_0%,transparent_70%)] opacity-40 animate-drift-alt" />

      <div className="container mx-auto px-6 md:px-0 relative z-10 pt-[9rem] pb-16 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div className="flex-1 min-w-0 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            <span className="text-xs font-medium text-ink-soft tracking-wide">
              Open to new projects
            </span>
          </div>

          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-4">
            Navaneeth Vijay
          </h1>
          <p className="font-display text-xl sm:text-2xl font-bold text-ink mb-4">
            Staff-level Solution Architect &amp; AI-Native Full-Stack Engineer
          </p>

          <p className="text-lg text-ink-soft leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
            I own <span className="text-brand-text font-semibold">systems design</span>,{" "}
            <span className="text-brand-text font-semibold">headless commerce</span>, and{" "}
            <span className="text-brand-text font-semibold">Applied AI architecture</span> — for
            platforms that move real business metrics.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card px-4 py-2.5 flex items-center gap-2.5 transition hover:-translate-y-0.5 hover:border-brand"
              >
                {stat.trend === "up" ? (
                  <IconTrendingUp className="h-4 w-4 text-brand-text shrink-0" />
                ) : (
                  <IconTrendingDown className="h-4 w-4 text-brand-text shrink-0" />
                )}
                <div className="flex flex-col items-start">
                  <span className="font-display text-lg font-bold leading-none text-ink">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-ink-mute leading-tight max-w-[6.5rem] text-left">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mb-7">
            <DownloadResume />
            <a
              href="mailto:sainavaneeth@gmail.com"
              className="flex items-center gap-2 text-ink-soft text-base font-medium hover:text-brand transition-colors"
            >
              <IconMail className="h-[18px] w-[18px] text-ink-mute" />
              sainavaneeth@gmail.com
            </a>
          </div>

          <ul className="flex items-center justify-center md:justify-start gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-ink-mute transition hover:-translate-y-0.5 hover:rotate-[-4deg] hover:border-brand hover:text-brand"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <HeroIllustration />
      </div>

      <div className="hidden md:flex justify-center pb-6 relative z-10">
        <div className="flex flex-col items-center gap-1.5 text-ink-mute">
          <span className="text-[11px] uppercase tracking-[0.15em]">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-border flex justify-center pt-1.5">
            <span className="h-1.5 w-1 rounded-full bg-brand animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
