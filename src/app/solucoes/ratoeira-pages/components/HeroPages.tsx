"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
const BeamsBackground = dynamic(
  () => import("@/components/ui/ethereal-beams-hero").then((m) => m.BeamsBackground),
  { ssr: false }
);
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroPages() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#050505]">
      <BeamsBackground
        className="min-h-screen"
        beamsProps={{
          beamWidth: 3,
          beamHeight: 20,
          beamNumber: 15,
          lightColor: "#FF7E4A", // brand-secondary (orange)
          speed: 1.5,
          noiseIntensity: 2,
          scale: 0.15,
          rotation: -45, // Changed rotation to make it distinct from Ads
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-[clamp(7rem,16vh,12rem)] pb-[clamp(4.5rem,10vh,8.5rem)] relative z-10">
          {/* Hero Content */}
          <div className="max-w-6xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[130rem] 6xl:max-w-[150rem] text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-display font-black text-white tracking-tight leading-tight mb-6 sm:mb-8 max-w-3xl lg:max-w-5xl 2xl:max-w-6xl 4xl:max-w-7xl mx-auto text-center hyphens-none"
              dangerouslySetInnerHTML={{ __html: t("heroPages.title") }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body-lg text-gray-50 mb-12 max-w-3xl lg:max-w-4xl 2xl:max-w-5xl 4xl:max-w-6xl mx-auto hyphens-none"
            >
              {t("heroPages.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/planos#pricing-cards"
                className="inline-flex items-center gap-2 px-8 py-4 2xl:px-10 2xl:py-5 rounded-button bg-[#FF7E4A] text-black font-bold hover:bg-[#e86b3b] transition-colors"
              >
                {t("header.signIn")}
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>



            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mx-auto mt-12 w-full max-w-6xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[130rem] 6xl:max-w-[150rem]"
            >
              <div className="relative mx-auto h-[clamp(14rem,30vw,28rem)] w-full max-w-5xl xl:max-w-6xl 2xl:max-w-[85rem] 3xl:max-w-[92rem] 4xl:max-w-[100rem] rounded-2xl border border-white/10 bg-black/20 shadow-2xl shadow-black/60 overflow-hidden">
                <Image
                  src="/herosectionpages.png"
                  alt="Ratoeira Pages em destaque"
                  fill
                  priority
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </BeamsBackground>
    </section>
  );
}
