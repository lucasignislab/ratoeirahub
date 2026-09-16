"use client";

import { motion } from "motion/react";
import { Bot, LineChart, Server, Settings2, SlidersHorizontal, BarChart3, Target, Zap } from "lucide-react";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import { GradientText } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

const iconMap = {
  Server,
  Bot,
  Settings2,
  Target,
  Zap,
  LineChart,
  SlidersHorizontal,
  BarChart3,
} as const;

type IconName = keyof typeof iconMap;

interface Feature {
  icon: IconName;
  titleKey: string;
  descriptionKey: string;
  image: string;
  imageClassName: string;
  aspectRatio: string;
}

export default function FeaturesAds() {
  const { t } = useLanguage();

  const features = useMemo<Feature[]>(() => [
    {
      icon: "Server",
      titleKey: "ratoeiraAds.features.serverSide.title",
      descriptionKey: "ratoeiraAds.features.serverSide.desc",
      image: "/serveraside.webp",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[4/3]",
    },
    {
      icon: "Bot",
      titleKey: "ratoeiraAds.features.ipBlocking.title",
      descriptionKey: "ratoeiraAds.features.ipBlocking.desc",
      image: "/bloqueioips.png",
      imageClassName: "object-cover object-center",
      aspectRatio: "aspect-[16/9]",
    },
    {
      icon: "Settings2",
      titleKey: "ratoeiraAds.features.conversions.title",
      descriptionKey: "ratoeiraAds.features.conversions.desc",
      image: "/conversoesotimizadas.webp",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[3/2]",
    },
    {
      icon: "Target",
      titleKey: "ratoeiraAds.features.invisible.title",
      descriptionKey: "ratoeiraAds.features.invisible.desc",
      image: "/recupera.webp",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[4/3]",
    },
    {
      icon: "Zap",
      titleKey: "ratoeiraAds.features.realtime.title",
      descriptionKey: "ratoeiraAds.features.realtime.desc",
      image: "/dash.png",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[4/3]",
    },
    {
      icon: "LineChart",
      titleKey: "ratoeiraAds.features.funnel.title",
      descriptionKey: "ratoeiraAds.features.funnel.desc",
      image: "/funil.webp",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[16/9]",
    },
    {
      icon: "SlidersHorizontal",
      titleKey: "ratoeiraAds.features.manager.title",
      descriptionKey: "ratoeiraAds.features.manager.desc",
      image: "/gerenciadorgoogle.png",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[3/2]",
    },
    {
      icon: "BarChart3",
      titleKey: "ratoeiraAds.features.dashboard.title",
      descriptionKey: "ratoeiraAds.features.dashboard.desc",
      image: "/slide4home.png",
      imageClassName: "object-contain",
      aspectRatio: "aspect-[4/3]",
    },
  ], []);

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
        <div className="text-center mb-16 max-w-4xl xl:max-w-5xl 2xl:max-w-[65rem] 3xl:max-w-[80rem] 4xl:max-w-[90rem] 5xl:max-w-[100rem] 6xl:max-w-[110rem] mx-auto">
          <h2 className="text-h1 text-white mb-6 text-center hyphens-none">
            <span className="block md:whitespace-nowrap" dangerouslySetInnerHTML={{ __html: t("ratoeiraAds.features.title") }} />
          </h2>
          <p className="text-body-lg text-gray-400 max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 4xl:max-w-[80rem] 5xl:max-w-[90rem] 6xl:max-w-[100rem] mx-auto text-center hyphens-none">
            {t("ratoeiraAds.features.subtitle")}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {features.map((feature, index) => {
            const isReversed = index % 2 === 1;
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={feature.titleKey}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12 lg:gap-24 rounded-3xl p-6 sm:p-8 ${index % 2 === 0 ? "bg-white" : "bg-[#0a0a0a]"}`}
              >
                <div className="flex-1 space-y-6 w-full text-center md:text-left">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/15 to-orange-500/15 flex items-center justify-center border ${index % 2 === 0 ? "border-black/10" : "border-white/10"}`}>
                    <Icon className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-h2 hyphens-none">
                    <GradientText className="font-black">
                      {t(feature.titleKey)}
                    </GradientText>
                  </h3>
                  <p className={`text-body hyphens-none ${index % 2 === 0 ? "text-[#4b5563]" : "text-gray-400"}`}>
                    <BlurTextEffect key={`${feature.titleKey}-desc`}>{t(feature.descriptionKey)}</BlurTextEffect>
                  </p>
                </div>

                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.35, zIndex: 20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={cn("relative rounded-2xl border border-white/10 bg-[#111111] overflow-hidden group cursor-zoom-in shadow-xl will-change-transform", feature.aspectRatio)}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,rgba(255,184,0,0.12)_0%,rgba(0,0,0,0)_70%)] z-10" />

                    <Image
                      src={feature.image}
                      alt={t(feature.titleKey)}
                      fill
                      sizes="(min-width: 1024px) 900px, 100vw"
                      className={cn("transition-transform duration-500", feature.imageClassName)}
                      priority={index === 0}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent z-10" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
