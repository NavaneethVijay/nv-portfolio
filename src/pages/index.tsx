import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowUpRight, IconBook2, IconMapPin, IconSparkles } from "@tabler/icons-react";
import HeroSection from "@/components/project/HeroSection";
import { Experience } from "@/components/project/Experience";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import Work from "@/components/project/Work";
import SectionHeadings, { SectionLabel } from "@/components/project/SectionHeadings";
import ContactMe from "@/components/project/contactMe";
import ImpactStats from "@/components/project/ImpactStats";
import { careerHistory } from "@/data/career";
import { getAllPosts } from "@/lib/contentful";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

interface Post {
  title: string;
  path: string;
  publishedDate: string;
}

export default function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="journal-shell">
      <HeroSection />
      <ImpactStats />

      {/* 01 About me */}
      <section id="about" className="container mx-auto px-6 md:px-0 py-20 md:py-28 border-b border-border">
        <SectionLabel index="01" eyebrow="About me" />
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpItem}
          className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86] text-ink mt-11 mb-12 md:mt-14 md:mb-20"
        >
          More than
          <br />
          <em className="font-serif italic text-brand-text">software.</em>
        </motion.h2>
        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14"
        >
          <motion.div variants={fadeUpItem} className="md:col-span-7 text-ink-soft">
            <p className="mb-5 text-base md:text-lg leading-relaxed">
              I&apos;m a Staff-level Solution Architect and AI-native Full-Stack Engineer with 8+
              years of experience designing, scaling, and delivering high-performance web
              platforms, multi-tenant SaaS architectures, and production-grade AI solutions. I
              like translating complex product visions into scalable, composable (MACH) and
              microservices systems, and lately, building autonomous agentic tool-calling
              workflows and human-in-the-loop AI pipelines.
            </p>
            <p className="mb-5 text-base md:text-lg leading-relaxed">
              I&apos;m a product-minded builder obsessed with business-critical outcomes: systems
              I&apos;ve delivered have driven a{" "}
              <strong className="font-semibold text-ink">40% increase in checkout conversions</strong>,{" "}
              a{" "}
              <strong className="font-semibold text-ink">
                30% reduction in last-mile operational failures
              </strong>
              , and{" "}
              <strong className="font-semibold text-ink">30% page-load performance gains</strong>.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              If you&apos;re looking for someone who brings clarity, ownership, and
              results-oriented thinking to a project, let&apos;s connect.
            </p>
          </motion.div>
          <motion.div variants={fadeUpItem} className="md:col-span-5 flex flex-col gap-4">
            <div className="border border-border p-2 bg-paper-alt">
              <iframe
                src="https://open.spotify.com/embed/track/3Fzlg5r1IjhLk2qRw667od?utm_source=generator"
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
              <p className="mono-label text-[10px] text-ink-mute text-right pt-2">
                usually on repeat
              </p>
            </div>
            <div className="relative border border-border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                style={{ height: "180px" }}
                className="object-cover w-full"
                src="/bangalore.png"
                alt="Bangalore skyline, where Navaneeth Vijay is based"
              />
            </div>
            <div className="flex items-center gap-3 mono-label text-[10px] text-ink-mute">
              <IconMapPin className="h-[18px] w-[18px] shrink-0" />
              <span className="leading-[1.6]">
                12.9716° N
                <br />
                77.5946° E
              </span>
              <span className="h-6 w-px bg-border" aria-hidden="true" />
              <span className="leading-[1.6]">
                Curious
                <br />
                by default
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 02 Selected work */}
      <section id="work" className="container mx-auto px-6 md:px-0 py-20 md:py-28 border-b border-border">
        <Work />
      </section>

      {/* 03 How I work */}
      <section id="skills" className="border-b border-border">
        <Experience />
      </section>

      {/* 04 A useful timeline */}
      <section id="experience" className="container mx-auto px-6 md:px-0 py-20 md:py-28 border-b border-border">
        <SectionHeadings
          index="04"
          eyebrow="A useful timeline"
          title="Eight years of becoming."
          emphasize="becoming."
          description="Responsibility is a trajectory. The work got bigger, the constraints got more interesting, and the questions got better."
        />

        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="border-t border-border"
        >
          {careerHistory.map((entry) => (
            <motion.div
              key={entry.year}
              variants={fadeUpItem}
              className="grid grid-cols-[auto_20px_1fr] sm:grid-cols-[110px_30px_1fr] gap-4 sm:gap-6 border-b border-border py-7 items-center"
            >
              <span className="font-serif text-base text-brand-text">{entry.year}</span>
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full border ${
                  entry.current ? "border-brand bg-brand" : "border-brand"
                }`}
              />
              <div>
                <h3
                  className={`font-display text-lg sm:text-xl font-medium tracking-[-0.02em] ${
                    entry.current ? "text-brand-text" : "text-ink"
                  }`}
                >
                  {entry.title}
                </h3>
                <p className="text-sm text-ink-mute mt-0.5">{entry.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <Link
          href="/experience"
          className="inline-flex items-center gap-1 mt-8 mono-label text-xs text-ink-soft hover:text-brand-text transition-colors"
        >
          Full experience, engagements &amp; certifications
          <IconArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* 05 Engineering notes */}
      <section id="notes" className="container mx-auto px-0  py-20 md:py-28 border-b border-border">
        <div className="bg-panel-sand text-panel-sand-fg p-8 md:p-14">
          <div className="flex items-center gap-6 mb-11 md:mb-14">
            <span className="text-[10px] font-bold text-brand-text">05</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-panel-sand-fg/70">
              Engineering notes
            </span>
          </div>
          <div className="flex items-center justify-between gap-8 flex-col md:flex-row">
            <div>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUpItem}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] leading-[0.95] mb-6"
              >
                What makes a system
                <br />
                <em className="font-serif italic text-brand-text">worth trusting?</em>
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUpItem}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="max-w-md text-sm md:text-base leading-relaxed text-panel-sand-fg/70"
              >
                Notes on shipping software, engineering decisions, and the gaps between a diagram
                and a thing that actually works.
              </motion.p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-8 text-sm border-b border-panel-sand-fg pb-1 hover:text-brand-text hover:border-brand-text transition-colors w-fit"
              >
                Read the notes <IconArrowUpRight className="h-[15px] w-[15px]" />
              </Link>
            </div>
            <IconBook2 className="hidden md:block h-16 w-16 shrink-0 text-brand-text" strokeWidth={1} />
          </div>

          {posts && posts.length > 0 && (
            <motion.div
              variants={fadeUpContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 pt-10 border-t border-panel-sand-fg/20"
            >
              {posts.map((post) => (
                <motion.div key={post.path} variants={fadeUpItem}>
                  <Link
                    href={`/blog/${post.path}`}
                    className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 py-4 border-b border-panel-sand-fg/20 last:border-b-0 group"
                  >
                    <span className="mono-label text-xs text-panel-sand-fg/60 w-[9rem] shrink-0">
                      {new Date(post.publishedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="font-display text-lg text-panel-sand-fg group-hover:text-brand-text transition-colors">
                      {post.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* 06 My workbench */}
      <section className="container mx-auto px-6 md:px-0 py-20 md:py-28 border-b border-border">
        <ProjectsGrid />
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-6 md:px-0 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpItem}
          className="flex items-center gap-2 mono-label text-[12px] font-bold text-brand-text mb-10 md:mb-16"
        >
          <IconSparkles className="h-4 w-4" />
          Open to the right conversation
        </motion.div>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpItem}
          className="font-display text-[clamp(3.625rem,8vw,7.25rem)] font-medium tracking-[-0.03em] leading-[0.86] text-ink mb-10 max-w-4xl"
        >
          Building something
          <br />
          <em className="font-serif italic text-brand-text">complex?</em>
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUpItem}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-base md:text-lg text-ink-mute mb-10 max-w-xl"
        >
          Drop your email below. I read everything.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpItem}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-4xl"
        >
          <ContactMe />
        </motion.div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(false);
  return {
    props: {
      posts: (posts ?? []).slice(0, 3),
    },
    revalidate: 60,
  };
};
