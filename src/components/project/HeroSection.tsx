import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/moving-border";
import { IconBrandCodepen, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconDownload } from "@tabler/icons-react";
import { BackgroundBeams } from "../ui/background-beams";

export default function HeroSection() {
  const words = ["awesome", "difficult", "technical", "your"];
  return (
    // <BackgroundBeamsWithCollision>
    <div
      className="md:h-[45rem] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-black relative
    flex flex-col gap-10 items-center w-full justify-center overflow-hidden text-center px-6 md:px-0 pt-[12rem] pb-10 md:py-10
    "
    >
      <div>
        <div>
          <p className="font-cinzel relative z-20 text-4xl font-bold text-black dark:text-white font-sans tracking-tight leading-tight">
            Hey there!
          </p>
          <h1 className="relative z-20 font-cinzel text-4xl lg:text-6xl ml-4 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 md:py-4">
            I'm Navaneeth Vijay
            <span className="sr-only"> — Solution Architect & Senior Fullstack Engineer</span>
          </h1>

          <h2 className="font-norican text-2xl md:text-4xl tracking-wide relative mx-auto inline-block text-center [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            I solve <FlipWords words={words} /> problems
          </h2>
        </div>
        <div className="flex flex-col mt-10 gap-4">
          <p className="z-20 text-lg md:text-xl dark:text-neutral-300 font-light font-libreFranklin max-w-4xl mx-auto ">
            A practical and solutions-driven software engineer specializing in
            creating scalable, efficient systems that blend technical integrity
            with seamless user experiences.
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="relative z-20 mt-8 md:mt-10">
              <span className="font-medium py-1 border-gray-900 border-b text-base hover:text-primary md:text-lg">
                <a href="mailto:sainavaneeth@gmail.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-send inline-block mr-2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  sainavaneeth@gmail.com
                </a>
              </span>
            </div>
            <div>
              <ul className="relative z-20 flex text-gray-900 dark:text-neutral-400 text-lg font-mono my-8">
                <li className="pr-4 md:pr-8">
                  <a
                    href="https://instagram.com/navneeth_vijay"
                    className="hover:text-primary"
                  >
                    <span className="sr-only">Instagram</span>
                    <IconBrandInstagram />
                  </a>
                </li>
                <li className="pr-4 md:pr-8">
                  <a
                    href="https://github.com/NavaneethVijay"
                    className="hover:text-primary"
                  >
                    <span className="sr-only">GitHub</span>
                    <IconBrandGithub />
                  </a>
                </li>
                <li className="pr-4 md:pr-8">
                  <a
                    href="https://twitter.com/navaneeth_V29"
                    className="hover:text-primary"
                  >
                    <span className="sr-only">Twitter</span>
                    <IconBrandTwitter />
                  </a>
                </li>
                <li className="pr-4 md:pr-8">
                  <a
                    href="https://www.linkedin.com/in/sai-navaneeth-v/"
                    className="hover:text-primary"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <IconBrandLinkedin />
                  </a>
                </li>
                <li className="pr-4">
                  <a
                    href="https://codepen.io/NavaneethVijay"
                    className="hover:text-primary"
                  >
                    <span className="sr-only">CodePen</span>
                    <IconBrandCodepen />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
    // </BackgroundBeamsWithCollision>
  );
}
