import { IconArrowUpRight, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";


interface FooterLink {
  href: string;
  text: string;
  external?: boolean;
}

const footerLinks: { [key: string]: FooterLink[] } = {
  main: [
    { href: '/', text: 'Home' },
    { href: '/blog', text: 'Blog' },
    { href: '/experience', text: 'Experience' },
  ],
  social: [
    { href: 'https://github.com/NavaneethVijay', text: 'GitHub', external: true },
    { href: 'https://www.linkedin.com/in/sai-navaneeth-v/', text: 'LinkedIn', external: true },
    { href: 'https://twitter.com/navaneeth_V29', text: 'Twitter', external: true }
  ],
};

export default function Footer() {
  const renderLink = ({ href, text, external }: FooterLink) => (
    <Link
      key={href}
      className="text-neutral-300 hover:text-neutral-100 transition"
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer"
      })}
    >
      {text} <IconArrowUpRight className="inline-block w-4 h-4 text-neutral-400" />
    </Link>
  );

  return (
    <footer className="flex flex-col px-6 justify-center items-start max-w-2xl mx-auto w-full mb-6 mt-6">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-900 mb-8" />
      <div className="w-full max-w-2xl  grid grid-cols-2 gap-4 pb-16 sm:grid-cols-2">
        {Object.values(footerLinks).map((linkGroup, index) => (
          <div key={index} className="flex flex-col space-y-4">
            {linkGroup.map(renderLink)}
          </div>
        ))}
      </div>
      <hr className="w-full border-1 border-gray-200 dark:border-gray-900 mb-6" />
      <p className="flex text-sm flex-row text-neutral-500 items-center">
        Designed and Developed with <IconHeartFilled className=" w-4 h-4 text-red-500 ml-2" />
      </p>
    </footer>
  );
}
