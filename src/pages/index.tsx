"use client";

import React from "react";
import HeroSection from "@/components/project/HeroSection";
import { Experience } from "@/components/project/Experience";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import Work from "@/components/project/Work";
import SectionHeadings from "@/components/project/SectionHeadings";
import Intro from "@/components/project/IntroText";
import ContactMe from "@/components/project/contactMe";

const marqueeWords = [
  "REACT",
  "NODE.JS",
  "TYPESCRIPT",
  "NEXT.JS",
  "POSTGRES",
  "AWS",
  "LLM APIS",
  "DOCKER",
];

function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex items-center gap-12 flex-shrink-0 pr-12">
      {marqueeWords.map((word) => (
        <React.Fragment key={word}>
          <span className="font-display text-sm font-semibold tracking-wide text-ink-soft whitespace-nowrap">
            {word}
          </span>
          <span className="text-brand">&#10022;</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-border bg-paper-alt py-4">
      <div className="flex w-max animate-marquee">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Marquee />

      <section className="mx-auto py-16 relative overflow-hidden">
        <div className="nv-blob w-[24rem] h-[24rem] top-10 -right-36 bg-[radial-gradient(circle,var(--brand)_0%,transparent_70%)] opacity-20 animate-drift-alt" />
        <SectionHeadings
          id="about"
          title="A little about me"
          seoTitle="About Navaneeth Vijay"
          description="Equal parts architecture and code."
        />
        <div className="relative max-w-4xl mx-auto px-6 md:px-0">
          <div className="text-lg mt-4">
            <Intro />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-10">
            <div className="md:col-span-4 rounded-xl overflow-hidden nv-glass p-3">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/3Fzlg5r1IjhLk2qRw667od?utm_source=generator"
                width="100%"
                height="280px"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
              <p className="font-hand text-lg text-brand-text text-right pr-2 -rotate-1">
                usually on repeat &#8594;
              </p>
            </div>
            <div className="md:col-span-2 relative rounded-xl overflow-hidden nv-glass">
              <img
                style={{ height: "232px" }}
                className="object-cover w-full rounded-xl"
                src="/bangalore.png"
                alt="Bangalore skyline, where Navaneeth Vijay is based"
              />
              <div className="absolute left-3 bottom-3 flex items-center gap-1.5 font-hand text-xl text-ink -rotate-2">
                <svg width="16" height="20" viewBox="0 0 18 22" fill="var(--brand)">
                  <path d="M9 1 C4 1 1 4.5 1 8.5 C1 14 9 21 9 21 C9 21 17 14 17 8.5 C17 4.5 14 1 9 1 Z" />
                  <circle cx="9" cy="8.5" r="3" fill="var(--paper)" />
                </svg>
                home base
              </div>
            </div>
            <div className="col-span-1 md:hidden rounded-xl overflow-hidden">
              <img
                style={{ height: "232px" }}
                className="object-cover w-full rounded-xl"
                src="/anime.jpg"
                alt="Navaneeth Vijay, illustrated portrait"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto graph-paper py-16 border-y border-border">
        <div className="mb-10">
          <SectionHeadings
            id="toolkit"
            title="The tools I reach for daily"
            seoTitle="Tools I Use Every Day"
            description="The apps that keep me fast, focused, and mostly out of my own way."
          />
        </div>
        <ProjectsGrid />
      </section>

      <section id="skills" className="container mx-auto px-6 md:px-0 py-16">
        <Experience />
      </section>

      <section className="py-16 bg-paper-alt border-y border-border">
        <div className="mb-10">
          <SectionHeadings
            id="work"
            title="A few things I'm proud of"
            seoTitle="Portfolio & Work Samples"
            description="Some for clients, some just for fun, but all built with real users in mind."
          />
        </div>
        <Work />
      </section>

      <section className="container mx-auto py-16 relative overflow-hidden">
        <div className="nv-blob w-[24rem] h-[24rem] -top-24 left-1/2 -translate-x-1/2 bg-[radial-gradient(circle,var(--brand)_0%,transparent_70%)] opacity-20 animate-drift" />
        <SectionHeadings
          id="contact"
          title="Got something in mind?"
          seoTitle="Contact Navaneeth Vijay"
          description="Drop your email below. I read everything."
        />
        <div className="max-w-4xl mx-auto">
          <ContactMe />
        </div>
      </section>
    </div>
  );
}
