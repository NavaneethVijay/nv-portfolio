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
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-0 max-w-5xl py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pb-10">
          <div className="flex flex-col space-y-3">
            <span className="mono-label text-xs text-ink-mute mb-1">Site</span>
            {mainLinks.map(renderLink)}
          </div>
          <div className="flex flex-col space-y-3">
            <span className="mono-label text-xs text-ink-mute mb-1">Elsewhere</span>
            {professionalLinks.map(renderLink)}
          </div>
          <div className="flex flex-col space-y-3 text-sm">
            <span className="mono-label text-xs text-ink-mute mb-1">Personal</span>
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
        <div className="border-t border-border pt-6 flex items-center gap-1.5 text-sm text-ink-mute">
          Built with care (and probably too much coffee)
          <IconHeartFilled className="w-3.5 h-3.5 text-brand" />
        </div>
      </div>
    </footer>
  );
}
