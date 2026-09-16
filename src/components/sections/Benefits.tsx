"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  BarChart3,
  BellRing,
  Bot,
  ChevronLeft,
  ChevronRight,
  FileBarChart,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname } from "next/navigation";
import { shouldHideHubPages } from "@/lib/feature-flags";

function renderNoBreak(text: string) {
  const patterns = [
    "tráfego pago",
    "Google Ads",
    "Ratoeira Ads",
    "Ratoeira Hub",
    "Meta Ads",
  ];
  const regex = new RegExp(`(${patterns.map((p) => p.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")).join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    patterns.some((p) => part.toLowerCase() === p.toLowerCase()) ? (
      <span key={i} className="whitespace-nowrap">{part}</span>
    ) : (
      part
    )
  );
}

// Vídeo com carregamento preguiçoso: só define o src quando o elemento
// estiver perto do viewport (autoplay/muted/loop permanecem idênticos).
function LazyVideo({ src, className }: { src: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <video
        src={shouldLoad ? src : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
      />
    </div>
  );
}

export default function Benefits() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const hideHubPages = shouldHideHubPages(pathname);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const referenceCardRef = useRef<HTMLDivElement>(null);
  const [referenceCardHeight, setReferenceCardHeight] = useState<number | null>(null);

  // Cards de benefícios que remetem a Ratoeira Hub / Ratoeira Pages.
// São ocultos sempre que a flag HIDE_HUB_PAGES_ON_HOME estiver ativa,
// independente da página em que a seção for renderizada.
const HUB_PAGES_BENEFIT_LABEL_KEYS = new Set<string>([
  "benefits.card.label3", // "Publique Páginas em Minutos, Não Dias"
]);

const allBenefits = [
    {
      labelKey: "benefits.card.label1",
      label: t("benefits.card.label1"),
      title: t("benefits.card.title1"),
      description: t("benefits.card.desc1"),
      imageLeft: false,
      icon: BarChart3,
      media: { kind: "image" as const, src: "/slide1home.png" },
    },
    {
      labelKey: "benefits.card.label2",
      label: t("benefits.card.label2"),
      title: t("benefits.card.title2"),
      description: t("benefits.card.desc2"),
      imageLeft: true,
      icon: Bot,
      media: { kind: "image" as const, src: "/slide2home.png" },
    },
    {
      labelKey: "benefits.card.label3",
      label: t("benefits.card.label3"),
      title: t("benefits.card.title3"),
      description: t("benefits.card.desc3"),
      imageLeft: false,
      icon: LayoutTemplate,
      media: { kind: "image" as const, src: "/slide3home.png", padded: true },
    },
    {
      labelKey: "benefits.card.label4",
      label: t("benefits.card.label4"),
      title: t("benefits.card.title4"),
      description: t("benefits.card.desc4"),
      imageLeft: true,
      icon: FileBarChart,
      media: { kind: "image" as const, src: "/slide4home.png" },
    },
    {
      labelKey: "benefits.card.label5",
      label: t("benefits.card.label5"),
      title: t("benefits.card.title5"),
      description: t("benefits.card.desc5"),
      imageLeft: false,
      icon: BellRing,
      media: { kind: "video" as const, src: "/videos/slide5.mp4" },
    },
    {
      labelKey: "benefits.card.label6",
      label: t("benefits.card.label6"),
      title: t("benefits.card.title6"),
      description: t("benefits.card.desc6"),
      imageLeft: true,
      icon: ShieldCheck,
      media: { kind: "image" as const, src: "/slide6home.png" },
    },
  ];

  // Quando a flag estiver ativa, filtra os cards que remetem a Hub/Pages
  // (ex.: "Publique Páginas em Minutos, Não Dias").
  const benefits = useMemo(
    () => {
      const filtered = hideHubPages
        ? allBenefits.filter(
            (benefit) => !HUB_PAGES_BENEFIT_LABEL_KEYS.has(benefit.labelKey),
          )
        : allBenefits;
      return filtered.map(({ labelKey, ...rest }) => rest);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, hideHubPages],
  );

  const goToNext = () => {
    setSlideDirection(1);
    setActiveIndex((prev) => (prev + 1) % benefits.length);
  };

  const goToPrev = () => {
    setSlideDirection(-1);
    setActiveIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const goToIndex = (index: number) => {
    if (index === activeIndex) return;
    setSlideDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => setIsMobile(!media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    if (!referenceCardRef.current) return;

    const node = referenceCardRef.current;
    const measure = () => setReferenceCardHeight(node.getBoundingClientRect().height);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 25000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const controlsSpacingClassName = "mt-12 pb-16";

  const renderCard = (index: number, options?: { measure?: boolean }) => {
    const benefit = benefits[index];
    const Icon = benefit.icon;
    const isVideoCard = benefit.media.kind === "video";
    const isPaddedImage =
      benefit.media.kind === "image" && benefit.media.padded === true;

    return (
      <div
        ref={options?.measure ? referenceCardRef : undefined}
        className="w-full max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[120rem] 6xl:max-w-[132rem] mx-auto"
      >
        <ShineBorder
          borderRadius={24}
          borderWidth={5.5}
          duration={3.8}
          color={[
            "var(--color-brand-300)",
            "var(--color-brand-primary)",
            "var(--color-brand-secondary)",
            "var(--color-brand-primary-hover)",
          ]}
          style={{
            ...(options?.measure ? { animation: "none" } : {}),
            ...(isMobile && isVideoCard && referenceCardHeight ? { height: referenceCardHeight } : {}),
          }}
          className="h-auto min-h-[420px] sm:h-[74vh] sm:min-h-[520px] 5xl:min-h-[560px] 6xl:min-h-[620px] w-full"
        >
          <div className="relative h-full rounded-card border border-white/10 bg-[#050505] shadow-card-resting p-5 sm:p-6 md:p-10 lg:p-12 5xl:p-16 6xl:p-20 overflow-hidden">
            <BackgroundPaths reverse={benefit.imageLeft} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[1.2fr_1fr] 3xl:grid-cols-[1.3fr_1fr] 4xl:grid-cols-[1.35fr_1fr] 5xl:grid-cols-[1fr_1fr] 6xl:grid-cols-[1fr_1fr] gap-10 5xl:gap-14 6xl:gap-16 items-center h-full">
              <div className={`${benefit.imageLeft ? "order-2" : "order-1"} 5xl:px-4 6xl:px-6`}>
                <h3 className="mt-4 sm:mt-6 text-h1 font-black text-gray-50 leading-tight text-center lg:text-left  max-w-2xl lg:max-w-3xl 5xl:max-w-[60rem] 6xl:max-w-[70rem] hyphens-none">
                  {renderNoBreak(benefit.title)}
                </h3>
                <p className="mt-4 sm:mt-5 4xl:mt-8 5xl:mt-10 text-base sm:text-lg 3xl:text-2xl 4xl:text-3xl 5xl:text-[2.75rem] 6xl:text-[3rem] text-gray-200 leading-relaxed text-center lg:text-left ">
                  {renderNoBreak(benefit.description)}
                </p>
              </div>

              <div className={benefit.imageLeft ? "order-1" : "order-2"}>
                {benefit.media.kind === "image" ? (
                  <div className={isPaddedImage ? "relative rounded-card overflow-hidden p-3 5xl:p-4 6xl:p-6" : "relative rounded-card overflow-hidden 5xl:scale-100 6xl:scale-110"}>
                    <img loading="lazy" decoding="async"
                      src={benefit.media.src}
                      alt={benefit.title}
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[9/19.5] max-w-[260px] sm:max-w-[300px] 5xl:max-w-[340px] 6xl:max-w-[420px] max-h-full mx-auto rounded-[2.5rem] overflow-hidden">
                    <LazyVideo
                      src={benefit.media.src}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ShineBorder>
      </div>
    );
  };

  return (
    <section ref={ref} className="relative pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-24 4xl:pb-28 bg-[#050505]" id="solucoes">
      <div className="relative z-10 max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[120rem] 6xl:max-w-[132rem] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-16 4xl:px-24 5xl:px-32 6xl:px-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 md:mb-8 4xl:mb-4 space-y-4"
        >
          <h2 className="text-h1 font-black text-text-inverse leading-tight max-w-4xl mx-auto hyphens-none">
            <span className="lg:hidden">
              Por que <span style={{ color: "var(--color-brand-primary)" }}>+2.600</span>
              <br />
              <span style={{ color: "var(--color-brand-primary)" }}>{t("benefits.header.anunciantes")}</span> {t("benefits.header.escolheram")}
              <br />
              a <span className="whitespace-nowrap">{hideHubPages ? "Ratoeira\u00a0Ads" : "Ratoeira\u00a0Hub"}</span>
            </span>
            <span className="hidden lg:block">
              {t("benefits.header.porQue")} <span style={{ color: "var(--color-brand-primary)" }}>+2.600 {t("benefits.header.anunciantes")}</span> {t("benefits.header.escolheram")} a{" "}
              <span className="whitespace-nowrap">{hideHubPages ? "Ratoeira\u00a0Ads" : "Ratoeira\u00a0Hub"}</span>
            </span>
          </h2>
          <p className="text-gray-400/80 text-base sm:text-lg 3xl:text-[1.75rem] max-w-2xl 3xl:max-w-[54rem] 4xl:max-w-[62rem] 5xl:max-w-[68rem] 6xl:max-w-[74rem] mx-auto hyphens-none">
            {t("benefits.header.description")}
          </p>
        </motion.div>

      </div>

      <div className="relative z-10 h-[640px] sm:h-[82vh] 4xl:h-[76vh] 5xl:h-[70vh] 6xl:h-[70vh] overflow-visible sm:overflow-hidden flex items-start mt-14 sm:-mt-8 4xl:-mt-10 5xl:-mt-12">
        <div className="relative w-full h-full">
          {isMobile ? (
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 -z-10">
              <div className="absolute inset-0 px-4 sm:px-8 lg:px-12 py-8 flex items-center">
                {renderCard(0, { measure: true })}
              </div>
            </div>
          ) : null}
          <AnimatePresence mode="sync" initial={false}>
            <motion.article
              key={benefits[activeIndex].title}
              initial={{ x: slideDirection > 0 ? "100%" : "-100%", opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection > 0 ? "-100%" : "100%", opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 px-4 sm:px-8 lg:px-12 py-8 flex items-center"
            >
              {renderCard(activeIndex)}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls - outside card, below it */}
      <div className={`relative z-20 flex items-center justify-center gap-3 ${controlsSpacingClassName} sm:pb-0 sm:absolute sm:bottom-8 4xl:bottom-10 sm:left-1/2 sm:-translate-x-1/2`}>
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Card anterior"
          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-gray-100 hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {benefits.map((benefit, index) => (
            <button
              key={benefit.title}
              type="button"
              onClick={() => goToIndex(index)}
              aria-label={`Ir para ${benefit.label}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-brand-primary"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Próximo card"
          className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-gray-100 hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
