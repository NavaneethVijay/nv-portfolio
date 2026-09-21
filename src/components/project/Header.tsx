"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconArrowUpRight, IconMenu3 } from "@tabler/icons-react";
import DownloadResume from "./DownloadResume";
import ThemeToggle from "@/components/theme-toggle";

// Every real destination on the site, ordered to match the homepage section
// flow (01 About → 02 Work → 03 Skills → 04 Experience → 05 Notes/Blog).
// Anchors point at real ids on the homepage, routes point at real pages.
const navLinks = [
  { href: "/#about", label: "About", title: "About: who I am and what I build" },
  { href: "/#work", label: "Work", title: "Work: selected projects and open-source work" },
  { href: "/#skills", label: "Skills", title: "Skills: Applied AI, systems design, and full-stack engineering" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
];

// ids of the homepage sections that back the "/#..." nav links, watched via
// IntersectionObserver so the header can highlight the one in view.
const HOME_SECTION_IDS = ["about", "work", "skills"];

export default function Header() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (router.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const elements = HOME_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [router.pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      return router.pathname === "/" && activeSection === href.slice(2);
    }
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  // Closing the mobile sheet (a Radix Dialog) restores the scroll position it
  // saved on open, which races the hash link's native smooth-scroll and wins
  // — the page snaps back instead of landing on the section. Desktop's inline
  // nav has no sheet/lock to race against, so it's unaffected. Deferring the
  // hash navigation until after the sheet's close transition (300ms, see the
  // sheet variants' data-[state=closed]:duration-300) avoids the race.
  const handleNavClick = (href: string) => (event: React.MouseEvent) => {
    if (isMobile && href.startsWith("/#")) {
      event.preventDefault();
      setIsOpen(false);
      window.setTimeout(() => router.push(href), 320);
      return;
    }
    setIsOpen(false);
  };

  const linkClass = (active: boolean) =>
    `mono-label text-[12px] tracking-[0.12em] transition-colors ${
      active ? "text-brand-text" : "text-ink-mute hover:text-brand-text"
    }`;

  const Wordmark = () => (
    <Link href="/" className="mono-label text-[11px] tracking-[0.12em] font-bold flex items-center">
      <span className="text-brand-text mr-2 text-[12px]">NV</span>
      <span className="hidden sm:inline text-ink-soft text-[12px] font-medium">
        / Navaneeth Vijay
      </span>
    </Link>
  );

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row flex-start md:items-center gap-6 md:gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={handleNavClick(link.href)}
          className={linkClass(isLinkActive(link.href))}
          title={link.title}
          aria-current={isLinkActive(link.href) ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/#contact"
        onClick={handleNavClick("/#contact")}
        className="flex items-center gap-1.5 mono-label text-[11px] tracking-[0.12em] text-ink border-b border-ink pb-0.5 hover:text-brand-text hover:border-brand-text transition-colors w-fit"
      >
        Let&apos;s talk <IconArrowUpRight className="h-3 w-3" />
      </Link>
      <span className="md:hidden">
        <DownloadResume location="header" />
      </span>
      <ThemeToggle />
    </div>
  );

  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b border-border bg-[color-mix(in_srgb,var(--paper)_95%,transparent)] md:backdrop-blur">
      <div className="container mx-auto px-6 md:px-0 h-[72px] flex justify-between items-center">
        <Wordmark />
        {isMounted && (
          <div className="flex items-center gap-3">
            {isMobile ? (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <IconMenu3 className="h-6 w-6 text-ink" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="border-none bg-paper">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <NavLinks />
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              <nav className="flex items-center space-x-8">
                <NavLinks />
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
