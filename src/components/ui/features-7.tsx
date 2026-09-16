"use client";

import Image from "next/image";
import { Zap } from "lucide-react";
import { motion } from "motion/react";
import { GradientText } from "@/components/ui/gradient-text";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

export function Features() {
  const { t } = useLanguage();

  const slides = useMemo(() => [
    {
      key: "flash-pages",
      imageSrc: "/imagem pages/flashpages.png",
      imageAlt: t("heroPages.features.flashPages.alt"),
      titlePrefix: t("heroPages.features.flashPages.prefix"),
      titleHighlight: t("heroPages.features.flashPages.highlight"),
      description: t("heroPages.features.flashPages.description"),
    },
    {
      key: "templates",
      imageSrc: "/imagem pages/templates.png",
      imageAlt: t("heroPages.features.templates.alt"),
      titlePrefix: t("heroPages.features.templates.prefix"),
      titleHighlight: t("heroPages.features.templates.highlight"),
      description: t("heroPages.features.templates.description"),
    },
    {
      key: "drag-and-drop",
      imageSrc: "/imagem pages/draganddrop.png",
      imageAlt: t("heroPages.features.dragDrop.alt"),
      titlePrefix: t("heroPages.features.dragDrop.prefix"),
      titleHighlight: t("heroPages.features.dragDrop.highlight"),
      description: t("heroPages.features.dragDrop.description"),
    },
    {
      key: "presell-ia",
      imageSrc: "/imagem pages/iapages.png",
      imageAlt: t("heroPages.features.ai.alt"),
      titlePrefix: t("heroPages.features.ai.prefix"),
      titleHighlight: t("heroPages.features.ai.highlight"),
      description: t("heroPages.features.ai.description"),
    },
    {
      key: "integracao-ads",
      imageSrc: "/imagem pages/itegracaopages.png",
      imageAlt: t("heroPages.features.tracking.alt"),
      titlePrefix: t("heroPages.features.tracking.prefix"),
      titleHighlight: t("heroPages.features.tracking.highlight"),
      description: t("heroPages.features.tracking.description"),
    },
    {
      key: "clonador",
      imageSrc: "/imagem pages/analyticspages.png",
      imageAlt: t("heroPages.features.hosting.alt"),
      titlePrefix: t("heroPages.features.hosting.prefix"),
      titleHighlight: t("heroPages.features.hosting.highlight"),
      description: t("heroPages.features.hosting.description"),
    },
    {
      key: "clonador-url",
      imageSrc: "/imagem pages/clonepages.png",
      imageAlt: t("heroPages.features.cloner.alt"),
      titlePrefix: t("heroPages.features.cloner.prefix"),
      titleHighlight: t("heroPages.features.cloner.highlight"),
      description: t("heroPages.features.cloner.description"),
    },
    {
      key: "teste-ab",
      imageSrc: "/testab.png",
      imageAlt: t("heroPages.features.ab.alt"),
      titlePrefix: t("heroPages.features.ab.prefix"),
      titleHighlight: t("heroPages.features.ab.highlight"),
      description: t("heroPages.features.ab.description"),
    },
    {
      key: "sites-cod",
      imageSrc: "/sitecod.png",
      imageAlt: t("heroPages.features.cod.alt"),
      titlePrefix: t("heroPages.features.cod.prefix"),
      titleHighlight: t("heroPages.features.cod.highlight"),
      description: t("heroPages.features.cod.description"),
    },
    {
      key: "templates-nicho",
      imageSrc: "/templatesprontos.png",
      imageAlt: t("heroPages.features.nicheTemplates.alt"),
      titlePrefix: t("heroPages.features.nicheTemplates.prefix"),
      titleHighlight: t("heroPages.features.nicheTemplates.highlight"),
      description: t("heroPages.features.nicheTemplates.description"),
    },
  ], [t]);

  return (
    <section id="como-funciona" className="overflow-hidden bg-[#050505] py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] space-y-10 px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
        <div className="relative z-10 mx-auto max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[60rem] 3xl:max-w-[75rem] 4xl:max-w-[72rem] 5xl:max-w-[80rem] 6xl:max-w-[90rem] text-center">
          <h2 className="text-h1 font-black text-white mb-6 text-center tracking-tight leading-tight hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroPages.features.title") }} />
          <p className="text-body-lg text-gray-400 max-w-3xl mx-auto text-center hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroPages.features.subtitle") }} />
        </div>

        <div className="space-y-24">
          {slides.map((slide, index) => {
            const isReversed = index % 2 === 1;
            const isLight = index % 2 === 0;

            return (
              <div
                key={slide.key}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12 md:gap-24 rounded-3xl border p-8 md:p-12 ${isLight ? "bg-white border-black/10" : "bg-[#111111] border-white/10"}`}
              >
                <div className="flex-1 space-y-6 w-full text-center md:text-left">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7E4A]/20 to-[#FF7E4A]/8 flex items-center justify-center border ${isLight ? "border-black/10" : "border-white/10"}`}>
                    <Zap className="w-8 h-8 text-[#FF7E4A]" />
                  </div>
                  <h3 className="text-h2 font-black leading-tight tracking-tight hyphens-none">
                    <GradientText variant="orange" className="font-black">
                      <span dangerouslySetInnerHTML={{ __html: `${slide.titlePrefix}<br />${slide.titleHighlight}` }} />
                    </GradientText>
                  </h3>
                  <p className={`text-body leading-relaxed hyphens-none ${isLight ? "text-[#4b5563]" : "text-gray-400"}`}>
                    <BlurTextEffect key={`${slide.key}-desc`}>{slide.description}</BlurTextEffect>
                  </p>
                </div>

                <div className="flex-1 w-full">
                  <motion.div
                    whileHover={{ scale: 1.35, zIndex: 20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={cn("relative aspect-[4/3] rounded-2xl border border-white/10 bg-[#111111] overflow-hidden group cursor-zoom-in shadow-xl")}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,rgba(255,126,74,0.14)_0%,rgba(0,0,0,0)_70%)] z-10" />
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 900px, 100vw"
                      className="transition-transform duration-500 object-contain"
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
