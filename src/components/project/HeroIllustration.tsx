import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <motion.div
      className="hidden md:flex flex-shrink-0 items-center justify-center"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
    >
      <Image
        src="/nv-hero.png"
        alt="Illustration of Navaneeth Vijay working at a laptop"
        width={440}
        height={440}
        priority
        className="rounded-full border-4 border-brand shadow-xl object-cover"
      />
    </motion.div>
  );
}
