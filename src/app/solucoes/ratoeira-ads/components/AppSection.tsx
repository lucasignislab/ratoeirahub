"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { Bell, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AppSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f9fafb] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[130rem] 6xl:max-w-[150rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-h1 text-[#111827] mb-6 hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroAds.app.title") }} />
            <p className="text-body-lg text-[#4b5563] max-w-xl 2xl:max-w-[50rem] 4xl:max-w-[60rem] mx-auto lg:mx-0 hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroAds.app.description") }} />

            {/* Feature highlights */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-black/10 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-body font-semibold text-[#374151]">{t("heroAds.app.notifications")}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white border border-black/10 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-body font-semibold text-[#374151]">{t("heroAds.app.dashboard")}</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="w-[280px] sm:w-[320px] rounded-[2.5rem] border-[6px] border-[#1a1a1a] bg-[#0d0d0d] shadow-2xl shadow-black/60 overflow-hidden relative aspect-[327/640]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0d0d0d] rounded-b-2xl z-20" />
                
                {/* Screen content — image */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src="/fotoapp.png"
                    alt="App Ratoeira Ads"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-brand-primary/10 rounded-[3rem] blur-2xl -z-10" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
