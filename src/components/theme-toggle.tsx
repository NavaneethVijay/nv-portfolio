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
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-ink-mute transition hover:-translate-y-0.5 hover:border-brand hover:text-brand"
    >
      {theme === "light" ? (
        <IconMoon className="h-[18px] w-[18px]" />
      ) : (
        <IconSun className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
