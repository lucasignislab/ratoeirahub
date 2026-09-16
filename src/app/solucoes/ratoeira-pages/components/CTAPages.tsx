"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


export default function CTAPages() {
  const { t } = useLanguage();

  return (
    <section className="flex items-center justify-center min-h-[auto] md:min-h-[clamp(600px,70vh,900px)] py-16 md:py-24 bg-white">
      <div className="max-w-4xl 2xl:max-w-[90rem] 4xl:max-w-[90rem] 5xl:max-w-[110rem] 6xl:max-w-[130rem] mx-auto px-4 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-20 text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center w-full max-w-6xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] mx-auto"
        >
          <h2 className="text-h1 font-black text-[#111827] mb-6 tracking-tight leading-tight hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroPages.cta.title") }} />
          <p className="text-body-lg text-[#4b5563] max-w-3xl mx-auto mb-12 leading-relaxed hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroPages.cta.description") }} />

          <Link
            href="/planos#pricing-cards"
            className="inline-flex items-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-[#FF7E4A] text-black font-bold rounded-button hover:bg-[#e86b3b] transition-all text-lg sm:text-xl shadow-xl shadow-[#FF7E4A]/20 hover:scale-105 active:scale-95"
          >
            {t("header.signIn")}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
