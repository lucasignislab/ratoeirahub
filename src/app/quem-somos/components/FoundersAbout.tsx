"use client";

import { motion } from "motion/react";
import { Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

export default function FoundersAbout() {
  const { t } = useLanguage();

  const headerTitle = useMemo(() => t("about.founders.header"), [t]);
  const headerSubtitle = useMemo(() => t("about.founders.headerSubtitle"), [t]);

  return (
    <section className="py-16 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-h1 font-black text-white tracking-tight hyphens-none">
            <span className="text-brand-primary">{t("about.founders.three")}</span> {t("about.founders.people")} <span className="text-brand-primary">{t("about.founders.problem")}</span> {t("about.founders.real")} <span className="text-brand-primary">{t("about.founders.solution")}</span>
          </h2>
          <p className="mt-4 text-base sm:text-xl text-gray-400 mx-auto text-center px-4 hyphens-none">
            {t("about.founders.subtitle")}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {/* Eitor Guimarães */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="w-full md:w-5/12">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#111111] border border-white/10 group">
                <img loading="lazy" decoding="async"
                  src="/fotoeitorbrabo.webp"
                  alt="Eitor Guimarães"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {t("about.founders.founder1")}
                </h3>
                <p className="text-brand-primary font-bold tracking-widest uppercase text-sm">
                  {t("about.founders.role1")}
                </p>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed text-base sm:text-lg text-center md:text-left hyphens-none">
                <p>
                  {t("about.founders.eitorDesc")}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
                <a
                  href="https://www.linkedin.com/in/eitorguimaraes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/eitor.guimaraes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Paulo Furtado */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12"
          >
            <div className="w-full md:w-5/12">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#111111] border border-white/10 group">
                <img loading="lazy" decoding="async"
                  src="/paulo.jpg"
                  alt="Paulo Furtado"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-6 text-center md:text-right">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {t("about.founders.founder2")}
                </h3>
                <p className="text-brand-primary font-bold tracking-widest uppercase text-sm">
                  {t("about.founders.role2")}
                </p>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed text-lg hyphens-none">
                <p>
                  {t("about.founders.pauloDesc")}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 justify-center md:justify-end">
                <a
                  href="https://www.linkedin.com/in/paulo-furtado-80798a3a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/paulo.furtado.jr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Brayan Cicarone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <div className="w-full md:w-5/12">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#111111] border border-white/10 group">
                <img loading="lazy" decoding="async"
                  src="/brayan.jpeg"
                  alt="Brayan Cicarone"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            </div>

            <div className="w-full md:w-7/12 space-y-6 text-center md:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {t("about.founders.founder3")}
                </h3>
                <p className="text-brand-primary font-bold tracking-widest uppercase text-sm">
                  {t("about.founders.role3")}
                </p>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed text-base sm:text-lg text-center md:text-left hyphens-none">
                <p>
                  {t("about.founders.brayanDesc1")}
                </p>
                <p>
                  {t("about.founders.brayanDesc2")}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
                <a
                  href="https://www.instagram.com/brayancicarone?igsh=MTJxZGI4ZnY4cWl6Mw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
