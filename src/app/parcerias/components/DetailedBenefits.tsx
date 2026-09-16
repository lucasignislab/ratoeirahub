"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { DollarSign, Repeat, ShieldCheck, Zap, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const DetailedBenefits = () => {
  const { t } = useLanguage();

  const detailedBenefits = useMemo(() => [
    {
      icon: Repeat,
      title: t("parcerias.benefits.title"),
      description: t("parcerias.benefits.desc1"),
      highlight: true,
    },
    {
      icon: ShieldCheck,
      title: t("parcerias.benefits.title2"),
      description: t("parcerias.benefits.desc2"),
      highlight: false,
    },
    {
      icon: Zap,
      title: t("parcerias.benefits.title3"),
      description: t("parcerias.benefits.desc3"),
      highlight: false,
    },
    {
      icon: DollarSign,
      title: t("parcerias.benefits.title4"),
      description: t("parcerias.benefits.desc4"),
      highlight: true,
    },
  ], [t]);

  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "rounded-3xl p-8 border transition-all duration-300",
                  benefit.highlight 
                    ? "bg-[#161616] border-brand-primary/30 shadow-lg shadow-brand-primary/5" 
                    : "bg-[#111111] border-white/5 hover:border-white/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                  benefit.highlight ? "bg-brand-primary/10 text-brand-primary" : "bg-white/5 text-gray-400"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DetailedBenefits;
