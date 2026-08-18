"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconBrandGithub,
  IconClipboardCopy,
  IconFileBroken,
  IconFileDownload,
  IconSignature,
  IconTableColumn,
  IconVideo,
} from "@tabler/icons-react";
import HeroSection from "@/components/project/HeroSection";
import { Experience } from "@/components/project/Experience";
import { ProjectsGrid } from "@/components/project/ProjectsGrid";
import Work from "@/components/project/Work";
import SectionHeadings from "@/components/project/SectionHeadings";
import Intro from "@/components/project/IntroText";
import Head from "next/head";
import ContactMe from "@/components/project/contactMe";
import DownloadResume from "@/components/project/DownloadResume";
import Footer from "@/components/project/Footer";

export default function HomePage() {
  return (
    <>
      <div>
        <HeroSection />
        <section className="mx-auto py-10 dark:bg-black">
          <SectionHeadings
            id="the-family-ties"
            title="The Roots of the Journey"
            seoTitle="About Navaneeth Vijay"
            description="Where loyalty meets ambition, the story begins."
          />
          <div className="relative">
            <img
              className="absolute top-1/4 left-0 opacity-30 "
              src="/strings.png"
              alt=""
              aria-hidden="true"
            />
            <div className="max-w-4xl mx-auto">
              <div className="text-lg dark:text-neutral-300  text-neutral-500 mt-10 font-libre-franklin">
                <Intro />
              </div>

              <div className="flex justify-center">
                <DownloadResume />
              </div>

              <div className="mt-16 mb-10">
                <p className="text-center dark:text-neutral-300 font-norican text-2xl">
                  "Every great tale deserves a fitting score; let the music
                  accompany your exploration."
                </p>
              </div>
              <div className="grid grid-rows-[10rem] grid-cols-6 md:grid-cols-6 gap-6 px-6 md:px-0 md:grid-rows-none">
                <div className="rounded-xl col-span-6 md:col-span-4 flex flex-col">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/track/3Fzlg5r1IjhLk2qRw667od?utm_source=generator"
                    width="100%"
                    height="300px"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <img
                    style={{ height: "232px" }}
                    className="object-cover w-full h-90 rounded-xl overflow-hidden flex items-stretch"
                    src="/bangalore.png"
                    alt="Bangalore skyline, where Navaneeth Vijay is based"
                  />
                </div>
                <div className="col-span-2 md:hidden">
                  <img
                    style={{ height: "232px" }}
                    className="object-cover w-full h-90 rounded-xl overflow-hidden flex items-stretch"
                    src="/anime.jpg"
                    alt="Navaneeth Vijay, illustrated portrait"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-6xl  mx-auto py-10 bg-neutral-900 md:rounded-xl ">
          <p className="text-2xl text-center lg:text-5xl font-godfather">
            "Instinctively conscientious and incredibly curious"
          </p>
        </section>

        <section className="mx-auto graph-paper py-10">
          <div className="mb-10">
            <SectionHeadings
              id="the-family-business"
              title="The Family Business"
              seoTitle="Tools I Use Every Day"
              description="Only the best tools in the business."
            />
          </div>
          <ProjectsGrid />
        </section>
        <section className="container mx-auto px-6 md:px-0 wpy-10">
          <Experience />
        </section>
        <section className="py-10">
          <div className="my-10">
            <SectionHeadings
              id="the-portfolio-offer"
              title="The Portfolio Offer"
              seoTitle="Portfolio & Work Samples"
              description="Projects you can’t refuse."
            />
          </div>
          <Work />
        </section>
        <section className="container mx-auto py-10">
          <SectionHeadings
            id="the-connection-favor"
            title="The Connection Favor"
            seoTitle="Contact Navaneeth Vijay"
            description="Let’s make an offer."
          />
          <div className="max-w-4xl mx-auto">
            <ContactMe />
          </div>
        </section>
      </div>
    </>
  );
}
