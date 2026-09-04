"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconBrandAuth0,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTypescript,
  IconBrandVscode,
  IconBrowser,
  IconDatabaseCog,
  IconServer2,
  IconSubtask,
  IconTableColumn,
  IconTerminal,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function ProjectsGrid() {
  return (
    <div className="container mx-auto py-10 px-6 md:px-0">
      <BentoGrid className="md:auto-rows-[22rem] grid-cols-1 md:grid-cols-4">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const hoverSlide = {
  initial: { x: 0 },
  animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
};

const ArcBrowser = () => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-1 w-full h-full flex-col space-y-2"
  >
    <motion.div variants={hoverSlide} className="rounded-2xl overflow-hidden bg-card">
      <img src="/tools/arc.png" alt="Arc Browser" className="w-full h-40 object-cover rounded-lg" />
    </motion.div>
  </motion.div>
);

const WarpTerminal = () => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-1 w-full h-full flex-col space-y-2"
  >
    <motion.div variants={hoverSlide} className="rounded-2xl border border-border p-1 bg-card">
      <img src="/tools/warp.png" alt="Warp Terminal" className="w-full h-40 object-cover rounded-lg" />
    </motion.div>
  </motion.div>
);

const RayCast = () => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-1 w-full h-full flex-col space-y-2"
  >
    <motion.div variants={hoverSlide} className="rounded-2xl overflow-hidden bg-card">
      <img src="/tools/raycast.png" alt="Raycast" className="w-full h-full object-cover" />
    </motion.div>
  </motion.div>
);

const TickTick = () => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-1 w-full h-full flex-col space-y-2"
  >
    <motion.div variants={hoverSlide} className="rounded-2xl overflow-hidden border border-border bg-card">
      <img src="/tools/tick-tick.png" alt="TickTick" className="w-full h-full object-cover" />
    </motion.div>
  </motion.div>
);

const VSCode = () => (
  <motion.div
    initial="initial"
    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
    className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center"
  >
    <div className="h-16 w-16 rounded-2xl bg-[color-mix(in_srgb,var(--brand)_16%,var(--card))] flex items-center justify-center text-brand-text">
      <IconBrandVscode className="h-9 w-9" />
    </div>
  </motion.div>
);

const DefaultStack = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-card p-4 border border-border flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center space-x-2">
          <IconBrandTypescript className="h-10 w-10 text-ink-mute" />
          <IconBrandReact className="h-10 w-10 text-ink-mute" />
        </div>
        <p className="sm:text-sm text-xs text-center font-semibold text-ink-soft mt-4">
          TypeScript, React, Tailwind
        </p>
        <p className="border border-purple-500 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs rounded-full px-2 py-0.5 mt-4">
          Frontend
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-card p-4 border border-border flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-2">
          <IconDatabaseCog className="h-10 w-10 text-ink-mute" />
          <IconServer2 className="h-10 w-10 text-ink-mute" />
        </div>
        <p className="sm:text-sm text-xs text-center font-semibold text-ink-soft mt-4">
          Node.js, Postgres
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 text-xs rounded-full px-2 py-0.5 mt-4">
          Backend
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-card p-4 border border-border flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center space-x-2">
          <IconBrandSupabase className="h-10 w-10 text-ink-mute" />
          <IconBrandAuth0 className="h-10 w-10 text-ink-mute" />
        </div>
        <p className="sm:text-sm text-xs text-center font-semibold text-ink-soft mt-4">
          Vercel, Supabase
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-xs rounded-full px-2 py-0.5 mt-4">
          Services
        </p>
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: (
      <Link href="https://arc.net/" target="_blank" className="underline">
        Arc Browser
      </Link>
    ),
    description: (
      <span className="text-sm">
        My browser of choice — tabs organized into Spaces so I don't lose my mind.
      </span>
    ),
    header: <ArcBrowser />,
    className: "md:col-span-1",
    icon: <IconBrowser className="h-4 w-4 text-ink-mute" />,
  },
  {
    title: "VS Code",
    description: (
      <span className="text-sm">
        Home base for writing code, from first commit to last release.
      </span>
    ),
    header: <VSCode />,
    className: "md:col-span-1",
    icon: <IconBrandVscode className="h-4 w-4 text-ink-mute" />,
  },
  {
    title: (
      <Link href="https://www.warp.dev/" target="_blank" className="underline">
        Warp Terminal
      </Link>
    ),
    description: (
      <span className="text-sm">
        Terminal with superpowers — command blocks and AI search built right in.
      </span>
    ),
    header: <WarpTerminal />,
    className: "md:col-span-2",
    icon: <IconTerminal className="h-4 w-4 text-ink-mute" />,
  },
  {
    title: "My default stack",
    description: (
      <span className="text-sm">
        What I reach for when starting something from scratch.
      </span>
    ),
    header: <DefaultStack />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-ink-mute" />,
  },
  {
    title: (
      <Link href="https://www.raycast.com/" target="_blank" className="underline">
        Raycast
      </Link>
    ),
    description: (
      <span className="text-sm">
        One shortcut away from anything — apps, snippets, clipboard history.
      </span>
    ),
    header: <RayCast />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-ink-mute" />,
  },
  {
    title: (
      <Link href="https://ticktick.com/" target="_blank" className="underline">
        Tick Tick
      </Link>
    ),
    description: (
      <span className="text-sm">
        Where my to-dos go to actually get done.
      </span>
    ),
    header: <TickTick />,
    className: "md:col-span-1",
    icon: <IconSubtask className="h-4 w-4 text-ink-mute" />,
  },
];
