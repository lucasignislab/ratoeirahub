"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MVVAbout() {
  const { t } = useLanguage();

  const mvvData = useMemo(() => [
    {
      id: "missao",
      title: t("about.mvv.mission"),
      icon: Target,
      content: t("about.mvv.missionDesc")
    },
    {
      id: "visao",
      title: t("about.mvv.vision"),
      icon: Eye,
      content: t("about.mvv.visionDesc")
    },
    {
      id: "valores",
      title: t("about.mvv.values"),
      icon: ShieldCheck,
      items: [
        {
          title: t("about.mvv.values.title1"),
          body: t("about.mvv.values.item1"),
        },
        {
          title: t("about.mvv.values.title2"),
          body: t("about.mvv.values.item2"),
        },
        {
          title: t("about.mvv.values.title3"),
          body: t("about.mvv.values.item3"),
        },
        {
          title: t("about.mvv.values.title4"),
          body: t("about.mvv.values.item4"),
        },
        {
          title: t("about.mvv.values.title5"),
          body: t("about.mvv.values.item5"),
        },
      ]
    }
  ], [t]);

  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const valoresItems = mvvData[2].items || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValueIndex((prev) => (prev + 1) % valoresItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [valoresItems.length]);

  return (
    <section id="manifesto" className="py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-gray-100/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Missão */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 text-center sm:text-left"
          >
            <div className="w-14 h-14 bg-orange-500/15 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-5 mx-auto sm:mx-0">
              <Target className="w-7 h-7 text-orange-300" />
            </div>
            <h2 className="text-h1 font-black text-white tracking-tight mb-4">
              <GradientText className="font-black">{mvvData[0].title}</GradientText>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed text-base hyphens-none">
              {mvvData[0].content}
            </p>
          </motion.div>

          {/* Visão */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111111] p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 text-center sm:text-left"
          >
            <div className="w-14 h-14 bg-amber-500/15 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-5 mx-auto sm:mx-0">
              <Eye className="w-7 h-7 text-amber-300" />
            </div>
            <h2 className="text-h1 font-black text-white tracking-tight mb-4">
              <GradientText className="font-black">{mvvData[1].title}</GradientText>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed text-base hyphens-none">
              {mvvData[1].content}
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 overflow-hidden text-center sm:text-left"
          >
            <div className="w-14 h-14 bg-orange-500/15 border border-orange-500/20 rounded-2xl flex items-center justify-center mb-5 mx-auto sm:mx-0">
              <ShieldCheck className="w-7 h-7 text-orange-300" />
            </div>
            <h2 className="text-h1 font-black text-white tracking-tight mb-4">
              <GradientText className="font-black">{mvvData[2].title}</GradientText>
            </h2>
            <div className="relative min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValueIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center sm:flex-row sm:items-start gap-3"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-400 font-medium text-sm leading-relaxed hyphens-none">
                    <strong className="text-white font-bold">{valoresItems[activeValueIndex].title}:</strong> {valoresItems[activeValueIndex].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
