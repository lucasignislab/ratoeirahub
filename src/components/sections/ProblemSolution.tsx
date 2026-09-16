"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { shouldHideHubPages } from "@/lib/feature-flags";

export default function ProblemSolution() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const hideHubPages = shouldHideHubPages(pathname);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("rastreamento");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const allTabs = useMemo(() => [
    { id: "rastreamento", label: t("problem.tabs.tracking"), logo: "/icons/pricing/ads-icon.png" },
    { id: "paginas", label: t("problem.tabs.pages"), logo: "/icons/pricing/pages-icon.png" },
    { id: "ecossistema", label: t("problem.tabs.ecossystem"), logo: "/icons/pricing/hub-icon.png" },
  ], [t]);

  // Na Home, ocultamos as abas "paginas" (Ratoeira Pages) e "ecossistema" (Ratoeira Hub).
  const tabs = useMemo(
    () => (hideHubPages ? allTabs.filter((tab) => tab.id === "rastreamento") : allTabs),
    [allTabs, hideHubPages],
  );

  const trackingHighlights = useMemo(() => [
    t("problem.tracking.highlight1"),
    t("problem.tracking.highlight2"),
    t("problem.tracking.highlight3"),
    t("problem.tracking.highlight4"),
    t("problem.tracking.highlight5"),
  ], [t]);

  const pagesHighlights = useMemo(() => [
    t("problem.pages.highlight1"),
    t("problem.pages.highlight2"),
    t("problem.pages.highlight3"),
    t("problem.pages.highlight4"),
    t("problem.pages.highlight5"),
    t("problem.pages.highlight6"),
  ], [t]);

  const ecosystemHighlights = useMemo(() => [
    t("problem.ecossystem.highlight1"),
    t("problem.ecossystem.highlight2"),
    t("problem.ecossystem.highlight3"),
    t("problem.ecossystem.highlight4"),
  ], [t]);

  const tabHighlights = useMemo(() => ({
    rastreamento: trackingHighlights,
    paginas: pagesHighlights,
    ecossistema: ecosystemHighlights,
  }), [trackingHighlights, pagesHighlights, ecosystemHighlights]);

  const contents = useMemo(() => ({
    rastreamento: {
      title: t("problem.tracking.title"),
      description: t("problem.tracking.description"),
    },
    paginas: {
      title: t("problem.pages.title"),
      description: t("problem.pages.description"),
    },
    ecossistema: {
      title: t("problem.ecossystem.title"),
      description: t("problem.ecossystem.description"),
    },
  }), [t]);

  const activeContent = contents[activeTab as keyof typeof contents];
  const activeHighlights = tabHighlights[activeTab as keyof typeof tabHighlights];
  const contentParts = activeContent.description.split("\n\n");

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % activeHighlights.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [activeHighlights, activeTab]);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#f9fafb]" id="solucoes">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[120rem] 6xl:max-w-[132rem] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-16 4xl:px-24 5xl:px-32 6xl:px-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-h1 font-black text-[#111827] leading-tight max-w-4xl mx-auto hyphens-none">
            <span className="text-brand-primary">{t("problem.header.title1")}</span> {t("problem.header.title2")} <span className="text-brand-primary whitespace-nowrap">{t("problem.header.title3")}</span>. {t("problem.header.title4")}&nbsp;<span className="text-brand-primary">{t("problem.header.title5")}</span>.
          </h2>
          <p className="text-base sm:text-xl 3xl:text-[1.75rem] text-[#4b5563] max-w-4xl 2xl:max-w-[56rem] 3xl:max-w-[64rem] 4xl:max-w-[70rem] 5xl:max-w-[72rem] 6xl:max-w-[80rem] mx-auto leading-relaxed ">
            {t("problem.header.subtitle")}
          </p>
          <p className="text-base sm:text-lg 3xl:text-xl text-orange-400 font-semibold ">
            {t("problem.header.note")}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setHighlightIndex(0);
                }}
                className={`inline-flex items-center gap-2 px-5 py-3 min-h-12 rounded-button font-semibold text-sm 3xl:text-base transition-all duration-300 ${
                  isActive
                    ? "bg-linear-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30"
                    : "bg-black/5 text-[#374151] border border-black/10 hover:border-orange-400 hover:bg-black/10"
                }`}
              >
                <img loading="lazy" decoding="async"
                  src={tab.logo}
                  alt={tab.label}
                  className="w-4 h-4 object-contain"
                />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-10"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl 5xl:text-[3.5rem] 6xl:text-[4rem] font-bold text-[#111827] text-center  max-w-3xl 5xl:max-w-5xl 6xl:max-w-6xl mx-auto text-balance hyphens-none">
            {activeContent.title}
          </h3>

          {/* First paragraph */}
          <div
            className={`w-full ${
              activeTab === "rastreamento" ? "max-w-5xl 3xl:max-w-[72rem] 4xl:max-w-[78rem] 5xl:max-w-[84rem] 6xl:max-w-[92rem]" : "max-w-4xl 3xl:max-w-[64rem] 4xl:max-w-[70rem] 5xl:max-w-[76rem] 6xl:max-w-[84rem]"
            }`}
          >
            <p className="text-base sm:text-lg 3xl:text-[1.75rem] text-[#4b5563] leading-relaxed whitespace-pre-line text-center">
              {contentParts[0]}
            </p>
          </div>

          {/* Visual (immediately below first paragraph) */}
          <div className={`relative w-full ${activeTab === "paginas" ? "max-w-4xl 3xl:max-w-[56rem] 4xl:max-w-[68rem] 5xl:max-w-[76rem] 6xl:max-w-[84rem]" : "max-w-5xl 3xl:max-w-[68rem] 4xl:max-w-[76rem] 5xl:max-w-[84rem] 6xl:max-w-[92rem]"}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-linear-to-b from-gray-100 to-gray-50 rounded-3xl p-2 sm:p-4 border border-gray-200 shadow-2xl overflow-hidden"
            >
              {activeTab === "paginas" ? (
                <img loading="lazy" decoding="async"
                  src="/paginaaltaconversao.png"
                  alt={t("problem.pages.alt")}
                  className="w-full h-auto rounded-2xl"
                />
              ) : activeTab === "rastreamento" ? (
                <img loading="lazy" decoding="async"
                  src="/rastreamentointeligente.png"
                  alt={t("problem.tracking.alt")}
                  className="w-full h-auto rounded-2xl"
                />
              ) : activeTab === "ecossistema" ? (
                <img loading="lazy" decoding="async"
                  src="/loginunico.png"
                  alt={t("problem.ecossystem.alt")}
                  className="w-full h-auto rounded-2xl"
                />
              ) : (
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-linear-to-r from-yellow-500 to-orange-500">
                      <img loading="lazy" decoding="async"
                        src={tabs.find((t) => t.id === activeTab)?.logo}
                        alt={tabs.find((t) => t.id === activeTab)?.label}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="min-h-[56px] flex items-center justify-center px-4">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${activeTab}-highlight-${highlightIndex}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="text-gray-700 font-semibold text-lg md:text-xl 3xl:text-[1.75rem]"
                        >
                          • {activeHighlights[highlightIndex]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-20 -z-10" />
          </div>

          {/* Remaining paragraphs */}
          {contentParts.length > 1 && (
            <div className="w-full max-w-4xl 3xl:max-w-[64rem] 4xl:max-w-[70rem] 5xl:max-w-[76rem] 6xl:max-w-[84rem] space-y-4">
              {contentParts.slice(1).map((part, index) => (
                <p
                  key={`${activeTab}-remaining-${index}`}
                  className="text-lg 3xl:text-[1.75rem] text-[#4b5563] leading-relaxed whitespace-pre-line text-center sm:text-left"
                >
                  {part}
                </p>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
