"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

export default function CTAPartnerships() {
  const { t } = useLanguage();

  const ctaTitle = useMemo(() => t("parcerias.cta.title"), [t]);
  const ctaDescription = useMemo(() => t("parcerias.cta.description"), [t]);

  return (
    <section
      id="formulario-parceria"
      className="py-16 md:py-24 bg-[#050505] relative scroll-mt-20"
    >
      <div className="max-w-4xl 2xl:max-w-[90rem] 4xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 relative z-10">
        {/* Seção 4 — CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#161616] to-[#111111] border border-white/10 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden shadow-2xl mb-12"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-brand-primary/20 blur-[80px] rounded-full pointer-events-none" />

          <h2 className="text-h1 font-black text-white mb-6 tracking-tight relative z-10 ">
            {ctaTitle}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-0 max-w-xl 2xl:max-w-[50rem] 4xl:max-w-[60rem] mx-auto relative z-10 ">
            {ctaDescription}
          </p>
        </motion.div>

        {/* Seção 5 — Formulário (oculto temporariamente) */}
        {false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center"
          >
            <h2 className="text-h1 font-black text-white mb-4 tracking-tight leading-tight">
              {t("parcerias.form.title")}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl mx-auto ">
              {t("parcerias.form.description")}
            </p>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-4 sm:p-8 relative overflow-hidden">
              <p className="text-gray-500 font-medium text-sm mb-4 uppercase tracking-widest">
                {t("parcerias.form.label")}
              </p>
              <iframe
                src="https://brand-colors-project.vibepreview.com"
                width="100%"
                height="800px"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                title={t("parcerias.form.iframeTitle")}
                style={{ border: "none", overflow: "hidden" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
