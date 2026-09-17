"use client";

import { motion } from "motion/react";
import YouTubePlayer from "./YouTubePlayer";
import { useLanguage } from "@/contexts/LanguageContext";
import { HIDE_PLANOS_VIDEO_PLAYER } from "@/lib/feature-flags";

export default function PricingHero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-black pb-10 pt-20 sm:pb-20 sm:pt-32">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl 2xl:max-w-[70rem] 4xl:max-w-[90rem] h-[400px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-9 max-w-3xl sm:mb-16 2xl:max-w-[60rem] 4xl:max-w-[80rem]"
        >
          <h1 className="mx-auto mb-4 max-w-4xl text-center text-[clamp(2.35rem,11vw,5rem)] font-black leading-[1.02] tracking-[-0.04em] text-white sm:mb-6 2xl:max-w-5xl 4xl:max-w-6xl" dangerouslySetInnerHTML={{ __html: t("pricing.hero.title") }} />
          <p className="mx-auto max-w-[65ch] text-base leading-7 text-gray-400 sm:text-xl">
            {t("pricing.hero.subtitle")}
          </p>
        </motion.div>

        {/* VTurb Player */}
        {!HIDE_PLANOS_VIDEO_PLAYER && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-card border border-white/10 bg-surface-subdued shadow-2xl sm:rounded-3xl 2xl:max-w-[70rem] 4xl:max-w-[90rem]"
          >
            <YouTubePlayer videoId="xFSuSYcFTYs" title="Apresentação Ratoeira" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
