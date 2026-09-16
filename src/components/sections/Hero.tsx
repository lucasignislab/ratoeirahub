"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Phone,
  Instagram,
  Users,
  TrendingUp,
  Inbox,
  Send,
  Archive,
  Filter,
  Search,
} from "lucide-react";
import SpotlightBackground from "@/components/ui/spotlight-background";
import LogoMarquee from "./LogoMarquee";
import { useLanguage } from "@/contexts/LanguageContext";
import { shouldHideHubPages, shouldHideHeroPagesPanel } from "@/lib/feature-flags";

import { useFloating, offset, autoUpdate } from "@floating-ui/react";

function HeroVideoMockup({
  onReady,
  src = "/videos/hero1.mp4",
  fallbackSrc,
  poster,
  alt = "Dashboard Preview",
}: {
  onReady?: () => void;
  src?: string;
  fallbackSrc?: string;
  poster?: string;
  alt?: string;
}) {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  // Perf: só define o src do vídeo quando o container estiver perto do viewport
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  // Perf (LCP): o poster é o elemento LCP; o vídeo só é anexado após o
  // window load + idle (ou fallback de 1s), mantendo autoplay idêntico depois.
  const [canStartVideo, setCanStartVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(() => setCanStartVideo(true), { timeout: 3000 });
        return () => window.cancelIdleCallback(id);
      }
      const t = window.setTimeout(() => setCanStartVideo(true), 1000);
      return () => window.clearTimeout(t);
    };
    let cleanup: (() => void) | undefined;
    if (document.readyState === "complete") {
      cleanup = start();
    } else {
      const onLoad = () => { cleanup = start(); };
      window.addEventListener("load", onLoad, { once: true });
      // Fallback caso o evento load demore demais (ex.: recursos lentos de terceiros)
      const fallback = window.setTimeout(onLoad, 4000);
      return () => {
        cancelled = true;
        window.clearTimeout(fallback);
        window.removeEventListener("load", onLoad);
        cleanup?.();
      };
    }
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setShouldLoad(true), 0);
      return () => window.clearTimeout(timer);
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsReady(true);
      onReady?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <div ref={containerRef} className="w-full h-full bg-black rounded-xl overflow-hidden relative">
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <span className="text-gray-500 text-sm">Vídeo indisponível</span>
        </div>
      ) : (
        <>
          {poster && (
            <img
              src={poster}
              alt={alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
              onError={(e) => {
                // Se a imagem do poster não existir, esconde para não ficar visível
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <video
            key={currentSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            className={`relative z-10 h-full w-full object-cover transition-opacity duration-300 ${poster ? (isPlaying ? "opacity-100" : "opacity-0") : "opacity-100"}`}
            onCanPlay={() => setIsReady(true)}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              if (fallbackSrc && currentSrc !== fallbackSrc) {
                setCurrentSrc(fallbackSrc);
                return;
              }

              setHasError(true);
            }}
            src={shouldLoad && canStartVideo ? currentSrc : undefined}
          />
        </>
      )}

      {!isReady && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="h-9 w-9 rounded-full border-2 border-[#FFB800]/30 border-t-[#FFB800] animate-spin" />
        </div>
      )}
    </div>
  );
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export default function Hero() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const hideHubPages = shouldHideHubPages(pathname);
  // Painel 2 (Ratoeira Pages) oculto sempre que a flag estiver ativa,
  // independentemente da página em que o Hero for renderizado.
  const hideHeroPagesPanel = shouldHideHeroPagesPanel();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePanel, setActivePanel] = useState(0);

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  // Translated slides
  const slides = [
    { id: 0, label: t("hero.dashboard") },
  ];

  // Floating UI setup for badges
  const { refs: badge1Refs, x: badge1X, y: badge1Y, strategy: badge1Strategy } = useFloating({
    elements: { reference: referenceElement },
    placement: "bottom-start",
    middleware: [offset({ mainAxis: -20, crossAxis: -32 })],
    whileElementsMounted: autoUpdate,
    strategy: "absolute",
  });

  const { refs: badge2Refs, x: badge2X, y: badge2Y, strategy: badge2Strategy } = useFloating({
    elements: { reference: referenceElement },
    placement: "top-end",
    middleware: [offset({ mainAxis: -20, crossAxis: -16 })],
    whileElementsMounted: autoUpdate,
    strategy: "absolute",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hideHeroPagesPanel) return;
    const panelInterval = setInterval(() => {
      setActivePanel((prev) => (prev === 0 ? 1 : 0));
    }, 25000);
    return () => clearInterval(panelInterval);
  }, [hideHeroPagesPanel]);

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen bg-[#050505] z-10 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <motion.div
        initial={false}
        animate={{ x: activePanel === 0 ? "0%" : "-50%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex ${hideHeroPagesPanel ? "w-full" : "w-[200%]"} min-h-[100svh] lg:min-h-screen bg-[#050505]`}
      >
        <div className={`relative ${hideHeroPagesPanel ? "w-full" : "w-1/2"} min-h-[100svh] lg:min-h-screen flex items-start justify-center pt-16 lg:pt-20`}>
          {!hideHeroPagesPanel && (
            <>
              <button
                type="button"
                onClick={() => setActivePanel((prev) => (prev === 0 ? 1 : 0))}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hidden lg:flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Painel anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActivePanel((prev) => (prev === 0 ? 1 : 0))}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hidden lg:flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Próximo painel"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <SpotlightBackground className="w-full h-full">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect x='4' y='4' width='112' height='112' rx='20' ry='20' fill='none' stroke='%23FFFFFF' stroke-width='1' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px 120px",
                }}
              />
              <div className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 w-[clamp(800px,40vw,1600px)] h-[clamp(600px,30vw,1200px)] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.18),transparent_70%)] blur-3xl pointer-events-none" />
              <div className="relative w-full h-full max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[105rem] 5xl:max-w-[110rem] 6xl:max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-16 4xl:px-28 5xl:px-32 6xl:px-60 flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] 2xl:grid-cols-[1fr_1.15fr] 3xl:grid-cols-[1fr_1.2fr] 4xl:grid-cols-[1fr_1fr] 5xl:grid-cols-[0.95fr_1.05fr] 6xl:grid-cols-[0.8fr_1fr] gap-6 lg:gap-10 2xl:gap-14 3xl:gap-20 5xl:gap-16 6xl:gap-20 lg:items-start 5xl:items-center min-w-0 pt-16 lg:pt-20 pb-16 lg:pb-24">
                {/* Texto */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-4"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-display font-black tracking-tight leading-[1.04] text-center lg:text-left max-w-4xl lg:max-w-6xl 2xl:max-w-7xl hyphens-none"
                  >
                    <span className="text-white">{t("hero.title.sale")}</span>{" "}
                    <span className="text-[#FFB800]">{t("hero.title.highlight")}</span>
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="text-base md:text-[clamp(1rem,1.15vw,1.125rem)] 3xl:text-[clamp(1.125rem,1.2vw,1.5rem)] text-gray-400/70 leading-relaxed max-w-xl 2xl:max-w-[34rem] 3xl:max-w-[46rem] 4xl:max-w-[56rem] 5xl:max-w-[48rem] 6xl:max-w-[56rem] text-center lg:text-left"
                  >
                    {t("hero.subtitle")}
                  </motion.p>

                  {/* CTA — desktop only, inside text flow */}
                  <motion.div variants={itemVariants} className="hidden lg:flex flex-col gap-2">
                    <Link
                      href="/planos#pricing-cards"
                      className="inline-flex self-center lg:self-start items-center justify-center px-6 py-3 min-h-12 bg-brand-primary text-black font-semibold text-sm rounded-button hover:bg-brand-primary-hover transition-colors duration-200 text-center"
                    >
                      {t("hero.cta.signNow")}
                    </Link>

                  </motion.div>
                </motion.div>

                {/* Mockup - visível em todas as telas */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative lg:col-start-2 lg:row-start-1"
                  ref={setReferenceElement}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-[#0d0d0d] shadow-card-resting h-[clamp(280px,55vw,420px)] lg:h-[clamp(420px,46vh,640px)] 2xl:h-auto 2xl:aspect-[16/10]">
                    <div className="bg-[#161616] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeSlide}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-500 text-xs font-semibold tracking-widest uppercase absolute left-1/2 -translate-x-1/2"
                        >
                          {slides[activeSlide].label}
                        </motion.span>
                      </AnimatePresence>
                      <div className="flex gap-1">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`max-lg:hidden w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              i === activeSlide ? "bg-[#E6A600]" : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="relative h-[calc(100%-45px)] p-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlide}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute inset-3"
                        >
                          <HeroVideoMockup
                            src="/videos/hero1.mp4"
                            fallbackSrc="/videos/video1.mp4"
                            poster="/videos/hero1-poster.jpg"
                            alt="Ratoeira Ads Preview"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Cards flutuantes - desktop apenas */}
                  <motion.div
                    ref={(node) => { badge1Refs.setFloating(node); }}
                    style={{
                      position: badge1Strategy,
                      top: badge1Y ?? 0,
                      left: badge1X ?? 0,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute z-10 bg-white border border-neutral-200 rounded-xl px-4 py-3 items-center gap-3 shadow-card-hover hidden lg:flex origin-top-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-text-primary text-xs font-bold">~100%</p>
                      <p className="text-text-secondary text-xs">{t("hero.badge.tracked")}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    ref={(node) => { badge2Refs.setFloating(node); }}
                    style={{
                      position: badge2Strategy,
                      top: badge2Y ?? 0,
                      left: badge2X ?? 0,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="absolute z-10 bg-white border border-neutral-200 rounded-xl px-4 py-3 items-center gap-3 shadow-card-hover hidden lg:flex origin-top-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E6A600]/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#E6A600]" />
                    </div>
                    <div>
                      <p className="text-text-primary text-xs font-bold">+2.600</p>
                      <p className="text-text-secondary text-xs">{t("hero.badge.activeAdvertisers")}</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Controles do slide — entre a imagem e o CTA no mobile */}
                <div className="flex lg:hidden items-center justify-center gap-3 pt-3 order-2">
                  <button type="button" onClick={() => setActivePanel(1)} className="w-10 h-10 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20" aria-label="Próximo slide">←</button>
                  <button type="button" onClick={() => setActivePanel(1)} className="w-10 h-10 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20" aria-label="Próximo slide">→</button>
                </div>

                {/* CTA — mobile only */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex lg:hidden flex-col gap-2 pt-2 order-3"
                >
                  <Link
                    href="/planos#pricing-cards"
                    className="inline-flex self-center lg:self-start items-center justify-center px-6 py-3 bg-brand-primary text-black font-semibold text-sm rounded-button hover:bg-brand-primary-hover transition-colors duration-200 text-center"
                  >
                    {t("hero.cta.signNow")}
                  </Link>

                </motion.div>

                <div className="order-4 lg:order-none lg:col-span-2 mt-4">
                  <LogoMarquee />
                </div>


              </div>
            </SpotlightBackground>
        </div>

        {!hideHeroPagesPanel && (
        <div className="relative w-1/2 min-h-[100svh] lg:min-h-screen flex items-start justify-center pt-16 lg:pt-20">
          <button
            type="button"
            onClick={() => setActivePanel((prev) => (prev === 0 ? 1 : 0))}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hidden lg:flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label={t("hero.panel.previous")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setActivePanel((prev) => (prev === 0 ? 1 : 0))}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hidden lg:flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label={t("hero.panel.next")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <SpotlightBackground className="w-full h-full">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect x='4' y='4' width='112' height='112' rx='20' ry='20' fill='none' stroke='%23FFFFFF' stroke-width='1' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px 120px",
                }}
              />
              <div className="relative w-full h-full max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[105rem] 5xl:max-w-[110rem] 6xl:max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-16 4xl:px-28 5xl:px-32 6xl:px-60 flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] 2xl:grid-cols-[1fr_1.15fr] 3xl:grid-cols-[1fr_1.2fr] 4xl:grid-cols-[1fr_1fr] 5xl:grid-cols-[0.95fr_1.05fr] 6xl:grid-cols-[0.8fr_1fr] gap-x-6 lg:gap-x-10 2xl:gap-x-14 3xl:gap-x-20 5xl:gap-x-16 6xl:gap-x-20 gap-y-4 lg:items-start 5xl:items-center min-w-0 pt-16 lg:pt-20 pb-8 lg:pb-12">
                {/* Texto */}
                <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
                  <h2 className="text-display font-black tracking-tight leading-tight lg:leading-[1.04] text-white text-center lg:text-left max-w-4xl lg:max-w-6xl 2xl:max-w-7xl hyphens-none">
                    <span>
                      {t("hero.pages.title").split(/(Páginas|Integradas|trackeamento)/g).map((part, index) =>
                        /^(Páginas|Integradas|trackeamento)$/.test(part) ? (
                          <span key={index} className="text-[#FF7E4A]">{part}</span>
                        ) : (
                          <span key={index}>{part}</span>
                        ),
                      )}
                    </span>
                  </h2>
                  <p className="text-base sm:text-[clamp(1rem,2vw,1.125rem)] 3xl:text-[clamp(1.125rem,1.2vw,1.5rem)] text-gray-400/70 leading-relaxed max-w-2xl 2xl:max-w-[34rem] 3xl:max-w-[46rem] 4xl:max-w-[56rem] 5xl:max-w-[48rem] text-center lg:text-left">
                    {t("hero.pages.subtitle")}
                  </p>
                </div>

                {/* Mockup Pages - visível em todas as telas */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative lg:col-start-2 lg:row-start-1"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-[#0d0d0d] shadow-card-resting h-[clamp(280px,55vw,420px)] lg:h-[clamp(420px,46vh,640px)] 2xl:h-auto 2xl:aspect-[16/10]">
                    <div className="bg-[#161616] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeSlide}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-500 text-xs font-semibold tracking-widest uppercase absolute left-1/2 -translate-x-1/2"
                        >
                          {t("hero.pages.tabLabel")}
                        </motion.span>
                      </AnimatePresence>
                      <div className="flex gap-1">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`max-lg:hidden w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              i === activeSlide ? "bg-[#E6A600]" : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="relative h-[calc(100%-45px)] p-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlide}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute inset-3"
                        >
                          <HeroVideoMockup
                            src="/videos/hero2.mp4"
                            fallbackSrc="/videos/videopagesheroslide2.mp4"
                            alt="Ratoeira Pages Preview"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* CTA — desktop only, aligned with slider */}
                <div className="hidden lg:flex items-center justify-start gap-3 lg:col-start-1 lg:row-start-2 self-end pb-2 -mt-4">
                  <Link
                    href="/solucoes/ratoeira-pages"
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-12 bg-brand-primary text-black font-semibold text-sm rounded-button hover:bg-brand-primary-hover transition-colors duration-200 text-center"
                  >
                    Conhecer o Ratoeira Pages →
                  </Link>
                </div>

                {/* Controles do slide — entre a imagem e o CTA no mobile */}
                <div className="flex lg:hidden items-center justify-center gap-3 pt-3 order-2">
                  <button type="button" onClick={() => setActivePanel(0)} className="w-10 h-10 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20" aria-label="Slide anterior">←</button>
                  <button type="button" onClick={() => setActivePanel(0)} className="w-10 h-10 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-white/20" aria-label="Slide anterior">→</button>
                </div>

                {/* CTA — mobile only */}
                <div className="flex lg:hidden items-center justify-center gap-3 pt-2 order-3">
                  <Link
                    href="/solucoes/ratoeira-pages"
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-12 bg-brand-primary text-black font-semibold text-sm rounded-button hover:bg-brand-primary-hover transition-colors duration-200"
                  >
                    Conhecer o Ratoeira Pages →
                  </Link>
                </div>

                <div className="order-4 lg:order-none lg:col-span-2 -mt-4">
                  <LogoMarquee />
                </div>


              </div>
            </SpotlightBackground>
        </div>
        )}
      </motion.div>
    </section>
  );
}
