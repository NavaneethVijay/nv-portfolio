import React from "react";
import { motion } from "framer-motion";
import {
  IconBrandCodepen,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import DownloadResume from "./DownloadResume";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

// Recruiter-facing: GitHub, LinkedIn, and code portfolio only. Instagram/Twitter
// live in the footer as a secondary, personal-touch link set.
const socials = [
  {
    href: "https://github.com/NavaneethVijay",
    label: "GitHub",
    Icon: IconBrandGithub,
  },
  {
    href: "https://www.linkedin.com/in/sai-navaneeth-v/",
    label: "LinkedIn",
    Icon: IconBrandLinkedin,
  },
  {
    href: "https://codepen.io/NavaneethVijay",
    label: "CodePen",
    Icon: IconBrandCodepen,
  },
];

export default function HeroSection() {
  return (
    <div className="border-b border-border">
      <div className="container mx-auto px-6 md:px-0 pt-16 md:pt-24 pb-16 md:pb-24">
        <motion.div variants={fadeUpContainer} initial="hidden" animate="show">
          <motion.div
            variants={fadeUpItem}
            className="flex items-center mb-8 mono-label text-[12px] font-bold text-ink-mute"
          >
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-brand mr-2" />
            Bengaluru, India
            <span className="mx-3 text-border" aria-hidden="true">
              /
            </span>
            Open to new projects
          </motion.div>

          <motion.h1
            variants={fadeUpItem}
            className="font-display text-[3.5rem] sm:text-8xl md:text-9xl lg:text-[9rem] font-medium tracking-[-0.03em] leading-[0.9] text-ink max-w-6xl mb-8 md:mb-10"
          >
            I BUILD
            <br />
            <em className="font-serif italic text-brand-text">SYSTEMS.</em>
          </motion.h1>

          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <p className="text-base md:text-lg leading-relaxed text-ink-soft mb-4">
              For the last <strong className="font-semibold text-ink">8+ years</strong>, I&apos;ve
              worked across frontend engineering, full-stack systems, architecture and technical
              leadership.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-ink-soft">
              Now I&apos;m exploring what happens when those systems become{" "}
              <em className="font-serif italic text-brand-text">AI-native.</em>
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="flex flex-wrap items-center gap-6 mt-12"
          >
            <DownloadResume location="hero" />
            <a
              href="mailto:sainavaneeth@gmail.com"
              className="flex items-center gap-2 text-ink-soft text-sm font-medium hover:text-brand-text transition-colors"
            >
              <IconMail className="h-[16px] w-[16px] text-ink-mute" />
              sainavaneeth@gmail.com
            </a>
            <ul className="flex items-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-ink-mute transition hover:text-brand-text"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="h-[16px] w-[16px]" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
