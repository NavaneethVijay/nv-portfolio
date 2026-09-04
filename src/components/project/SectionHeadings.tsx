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
    <div id={id} className="mb-10 text-center">
      <h2 className="text-3xl max-w-4xl mx-auto relative text-ink lg:text-5xl font-bold font-display">
        {seoTitle && <span className="sr-only">{seoTitle}</span>}
        <span aria-hidden={!!seoTitle}>{title}</span>
      </h2>
      <div className="flex items-center mt-4 max-w-4xl mx-auto">
        <div className="flex-grow border-t border-border"></div>
        <p className="text-xl md:text-2xl text-ink-soft px-4 font-hand tracking-wide">
          {description}
        </p>
        <div className="flex-grow border-t border-border"></div>
      </div>
    </div>
  );
}
