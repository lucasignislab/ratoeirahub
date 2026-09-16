"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface MotionImageCardProps {
  src: string;
  alt: string;
  overlay?: boolean;
}

export function MotionImageCard({ src, alt, overlay = false }: MotionImageCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.35, zIndex: 20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-[#111111] overflow-hidden group cursor-zoom-in shadow-xl will-change-transform"
    >
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,rgba(255,126,74,0.14)_0%,rgba(0,0,0,0)_70%)] z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="transition-transform duration-500 object-contain"
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent z-10" />
      )}
    </motion.div>
  );
}
