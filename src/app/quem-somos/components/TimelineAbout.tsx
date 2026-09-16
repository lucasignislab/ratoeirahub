"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GradientText } from "@/components/ui/gradient-text";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TimelineAbout() {
  const { t } = useLanguage();

  const milestones = useMemo(() => [
    {
      year: "Dez 2022",
      title: t("about.timeline.discovery"),
      description: t("about.timeline.discoveryDesc"),
      align: "left" as const,
    },
    {
      year: "Out 2023",
      title: t("about.timeline.method"),
      description: t("about.timeline.methodDesc"),
      align: "right" as const,
    },
    {
      year: "Jan 2024",
      title: t("about.timeline.meeting"),
      description: t("about.timeline.meetingDesc"),
      align: "left" as const,
    },
    {
      year: "Abr 2024",
      title: t("about.timeline.launch"),
      description: t("about.timeline.launchDesc"),
      align: "right" as const,
    },
    {
      year: "2025",
      title: t("about.timeline.expansion"),
      description: t("about.timeline.expansionDesc"),
      align: "left" as const,
    },
    {
      year: "2026",
      title: t("about.timeline.ai"),
      description: t("about.timeline.aiDesc"),
      align: "right" as const,
    }
  ], [t]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-h1 font-black text-white tracking-tight hyphens-none" dangerouslySetInnerHTML={{ __html: t("about.timeline.header") }} />
          <p className="mt-4 text-base sm:text-xl text-gray-400 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] mx-auto px-4 sm:px-0 hyphens-none">
            {t("about.timeline.subtitle")}
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Static Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />

          {/* Animated Glow Line */}
          <motion.div 
            style={{ height }}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-amber-500 to-orange-600 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)] origin-top z-10" 
          />

          <div className="space-y-12 md:space-y-24">
            {milestones.map((item) => {
              const isLeft = item.align === "left";
              return (
                <div key={item.year} className="relative flex flex-col md:flex-row items-center justify-center">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-amber-500 rounded-full border-4 border-[#050505] transform -translate-x-1/2 shadow-md z-20" />
                  
                  {/* Content Left */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 text-center ${isLeft ? "md:pr-20 md:text-left" : "md:pl-20 md:order-2 md:text-right"}`}
                  >
                    <div className="bg-[#111111] p-5 sm:p-8 rounded-3xl shadow-lg border border-white/10 hover:shadow-xl transition-shadow relative group">
                      <div className={`absolute top-8 ${isLeft ? "-right-3" : "-left-3"} w-6 h-6 bg-[#111111] transform rotate-45 border-t border-r border-white/10 hidden md:block ${isLeft ? "" : "rotate-[-135deg]"}`} />
                      
                      <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-300 font-bold text-sm mb-4">
                        {item.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight hyphens-none">
                        <GradientText className="font-bold">
                          {item.title}
                        </GradientText>
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm sm:text-base hyphens-none">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Empty Space for Grid Alignment */}
                  <div className={`hidden md:block w-1/2 ${isLeft ? "order-2" : "order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
