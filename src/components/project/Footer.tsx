import { IconArrowUpRight, IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface FooterLink {
  href: string;
  text: string;
  external?: boolean;
}

const mainLinks: FooterLink[] = [
  { href: '/', text: 'Home' },
  { href: '/blog', text: 'Blog' },
  { href: '/experience', text: 'Experience' },
];

const professionalLinks: FooterLink[] = [
  { href: 'https://github.com/NavaneethVijay', text: 'GitHub', external: true },
  { href: 'https://www.linkedin.com/in/sai-navaneeth-v/', text: 'LinkedIn', external: true },
];

// Personal accounts — kept secondary, out of the primary hero/nav conversion path.
const personalLinks: FooterLink[] = [
  { href: 'https://twitter.com/navaneeth_V29', text: 'Twitter', external: true },
  { href: 'https://instagram.com/navneeth_vijay', text: 'Instagram', external: true },
];

export default function Footer() {
  const renderLink = ({ href, text, external }: FooterLink) => (
    <Link
      key={href}
      className="text-ink-soft hover:text-brand transition"
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer"
      })}
    >
      {text} <IconArrowUpRight className="inline-block w-4 h-4 text-ink-mute" />
    </Link>
  );

  return (
    <footer className="flex flex-col px-6 justify-center items-start max-w-2xl mx-auto w-full mb-6 mt-6">
      <hr className="w-full border-border mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-3 gap-4 pb-10 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">{mainLinks.map(renderLink)}</div>
        <div className="flex flex-col space-y-4">{professionalLinks.map(renderLink)}</div>
        <div className="flex flex-col space-y-4 text-sm">
          {personalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-mute hover:text-brand transition"
            >
              {link.text} <IconArrowUpRight className="inline-block w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </div>
      <hr className="w-full border-border mb-6" />
      <p className="flex text-lg font-hand flex-row text-ink-soft items-center gap-1">
        Built with care (and probably too much coffee) <IconHeartFilled className="w-4 h-4 text-brand ml-1" />
      </p>
    </footer>
  );
}
