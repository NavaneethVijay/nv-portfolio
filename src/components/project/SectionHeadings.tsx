import { IconBrandRedhat } from "@tabler/icons-react";
import React from "react";

export default function SectionHeadings({
  title,
  seoTitle,
  description,
  id,
}: {
  title: string;
  seoTitle?: string;
  description: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-10  text-center">
      <h2
        className="text-3xl max-w-4xl mx-auto relative text-neutral-800 lg:text-5xl font-bold font-cinzel bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r
      from-yellow-800 via-yellow-500 to-yellow-200 "
      >
        {seoTitle && <span className="sr-only">{seoTitle}</span>}
        <span aria-hidden={!!seoTitle}>{title}</span>
      </h2>
      <div className="flex items-center mt-4  max-w-4xl mx-auto">
        <div className="flex-grow border-t border-neutral-500"></div>
        <p className="text-xl md:text-2xl dark:text-neutral-300 text-neutral-500 px-4 font-norican tracking-wide">
          "{description}"
        </p>
        <div className="flex-grow border-t border-neutral-500"></div>
      </div>
    </div>
  );
}
