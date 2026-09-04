"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconMenu3 } from "@tabler/icons-react";
import DownloadResume from "./DownloadResume";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
    isScrolled
      ? "bg-paper/80 backdrop-blur-md border-border"
      : "bg-transparent border-transparent"
  }`;

  const linkClass = "text-ink-soft hover:text-ink transition-colors";

  const Logo = () => (
    <Link href="/" className="font-display text-xl font-bold text-ink">
      NV<span className="text-brand">.</span>
    </Link>
  );

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row flex-start md:items-center gap-6 md:gap-9">
      <Link href="/" onClick={() => setIsOpen(false)} className={linkClass}>
        Home
      </Link>
      <Link
        href="/#skills"
        onClick={() => setIsOpen(false)}
        className={linkClass}
        title="Skills: Applied AI, systems design, and full-stack engineering"
      >
        Skills
      </Link>
      <Link
        href="/#work"
        onClick={() => setIsOpen(false)}
        className={linkClass}
        title="Work: selected projects and open-source work"
      >
        Work
      </Link>
      <Link href="/blog" onClick={() => setIsOpen(false)} className={linkClass}>
        Blog
      </Link>
      <Link href="/experience" onClick={() => setIsOpen(false)} className={linkClass}>
        Experience
      </Link>
      <DownloadResume location="header" />
    </div>
  );

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        {isMounted && (
          <div className="flex items-center gap-3">
            <ThemeToggle />
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
              <nav className="flex space-x-6">
                <NavLinks />
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
