"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-8 w-8 items-center justify-center text-ink-mute transition hover:text-brand-text"
    >
      {theme === "light" ? (
        <IconMoon className="h-[18px] w-[18px]" />
      ) : (
        <IconSun className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
