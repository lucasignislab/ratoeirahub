"use client";

import { motion, AnimatePresence } from "motion/react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── Types ─── */
interface YoutubeShortCard {
  id: string;
  url?: string;
  videoSrc?: string;
  thumbnail: string;
  // Títulos e speakers são resolvidos via i18n no componente
  // para suportar tradução por idioma.
  titleKey: string;
  speakerKey: string;
}

/* ─── Data ─── */
const videos: YoutubeShortCard[] = [
  {
    id: "amanda-ligia",
    url: "https://www.youtube.com/shorts/5edTCBZu-ds",
    thumbnail: "https://img.youtube.com/vi/5edTCBZu-ds/maxresdefault.jpg",
    titleKey: "cases.socialProof.video.amanda-ligia.title",
    speakerKey: "cases.socialProof.video.amanda-ligia.speaker",
  },
  {
    id: "michel-pogne",
    videoSrc:
      "/depoimentos/Michael%20Pogne%20indica%20a%20Ratoeira%20Ads%20para%20afiliados.mp4",
    thumbnail: "/depoimentos/michel_pogne_thumb.jpg",
    titleKey: "cases.socialProof.video.michel-pogne.title",
    speakerKey: "cases.socialProof.video.michel-pogne.speaker",
  },
  {
    id: "bruno-matos",
    url: "https://www.youtube.com/shorts/fmfF1_7g0mM",
    thumbnail: "https://img.youtube.com/vi/fmfF1_7g0mM/maxresdefault.jpg",
    titleKey: "cases.socialProof.video.bruno-matos.title",
    speakerKey: "cases.socialProof.video.bruno-matos.speaker",
  },
  {
    id: "jessica-maciel",
    url: "https://www.youtube.com/shorts/qdP5z0bFfP8",
    thumbnail: "https://img.youtube.com/vi/qdP5z0bFfP8/maxresdefault.jpg",
    titleKey: "cases.socialProof.video.jessica-maciel.title",
    speakerKey: "cases.socialProof.video.jessica-maciel.speaker",
  },
  {
    id: "alexander-lopes",
    url: "https://www.youtube.com/shorts/04xowV0-fPw",
    thumbnail: "https://img.youtube.com/vi/04xowV0-fPw/maxresdefault.jpg",
    titleKey: "cases.socialProof.video.alexander-lopes.title",
    speakerKey: "cases.socialProof.video.alexander-lopes.speaker",
  },
];

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/shorts\/|youtube\.com\/watch\?v=|youtu\.be\/)([^/?&]+)/
  );
  return match ? match[1] : "";
}

/* ─── Card ─── */
function VideoCard({
  card,
  onClick,
}: {
  card: YoutubeShortCard;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full aspect-[9/16] bg-[#161616] border border-white/5 rounded-[24px] sm:rounded-[32px] overflow-hidden relative group cursor-pointer text-left hover:border-brand-primary/30 transition-colors"
    >
      <img loading="lazy" decoding="async"
        src={card.thumbnail}
        alt={t(card.titleKey)}
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-brand-primary text-black flex items-center justify-center pl-1 transform group-hover:scale-110 transition-transform shadow-lg shadow-brand-primary/20">
          <Play className="w-5 h-5 fill-current" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-5">
        <p className="text-white font-bold text-sm leading-tight">
          {t(card.speakerKey)}
        </p>
      </div>
    </button>
  );
}

/* ─── Carousel ─── */
const VISIBLE_COUNT = 3;

function VideoCarousel({
  items,
  onVideoClick,
}: {
  items: YoutubeShortCard[];
  onVideoClick: (card: YoutubeShortCard) => void;
}) {
  const { t } = useLanguage();
  const itemCount = items.length;
  const loopedItems = [...items, ...items];
  const [activeIndex, setActiveIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const safeIndex = ((activeIndex % itemCount) + itemCount) % itemCount;

  const goTo = useCallback(
    (direction: "left" | "right") => {
      if (noTransition || itemCount === 0) return;

      if (direction === "right") {
        // Sempre avança da direita para a esquerda
        setActiveIndex((prev) => prev + 1);
      } else {
        setActiveIndex((prev) => prev - 1);
      }
    },
    [itemCount, noTransition]
  );

  // Loop infinito: quando chega no final do array duplicado, reseta para o início
  useEffect(() => {
    if (activeIndex >= itemCount) {
      const timeout = setTimeout(() => {
        setNoTransition(true);
        setActiveIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [activeIndex, itemCount]);

  // Reativa a transição após o reset
  useEffect(() => {
    if (noTransition) {
      const timeout = setTimeout(() => setNoTransition(false), 50);
      return () => clearTimeout(timeout);
    }
  }, [noTransition]);

  // Autoplay: desliza da direita para a esquerda a cada 4s
  useEffect(() => {
    if (itemCount === 0 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [itemCount, isPaused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Viewport */}
      <div className="overflow-hidden">
        <div
          className={`flex ${noTransition ? "" : "transition-transform duration-500 ease-in-out"}`}
          style={{
            transform: `translateX(-${activeIndex * (100 / VISIBLE_COUNT)}%)`,
          }}
        >
          {loopedItems.map((card, i) => (
            <div
              key={`${card.id}-${i}`}
              className="w-1/3 shrink-0 px-2 sm:px-3"
            >
              <VideoCard card={card} onClick={() => onVideoClick(card)} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button
        type="button"
        onClick={() => goTo("left")}
        aria-label={t("cases.socialProof.carousel.prev")}
        className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        type="button"
        onClick={() => goTo("right")}
        aria-label={t("cases.socialProof.carousel.next")}
        className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              if (noTransition) return;
              setActiveIndex(i);
            }}
            aria-label={t("cases.socialProof.carousel.goto").replace("{number}", String(i + 1))}
            className={`h-2 rounded-full transition-all ${
              i === safeIndex
                ? "bg-brand-primary w-6"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function CasesSocialProof() {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeYouTubeShort, setActiveYouTubeShort] = useState<string | null>(null);

  const handleCardClick = (card: YoutubeShortCard) => {
    if (card.videoSrc) {
      setActiveVideo(card.videoSrc);
    } else if (card.url) {
      setActiveYouTubeShort(getYouTubeId(card.url));
    }
  };

  return (
    <>
      <section className="pt-16 md:pt-32 pb-12 md:pb-24 bg-[#050505] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-bold uppercase tracking-widest">
              {t("cases.socialProof.badge")}
            </div>
            <h1 className="text-display font-black text-white leading-tight mb-6 tracking-tight text-center">
              {t("cases.socialProof.title1")}{" "}
              <span className="text-brand-primary">{t("cases.socialProof.title2")}</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-400 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] mx-auto">
              {t("cases.socialProof.description")}
            </p>
          </motion.div>

          {/* Video carousel */}
          <VideoCarousel items={videos} onVideoClick={handleCardClick} />
        </div>
      </section>

      {/* Players Section */}
      <section className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-h1 font-black text-white leading-tight tracking-tight">
              {t("cases.socialProof.playersTitle")}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.015 }}
            className="group relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(255,184,0,0.25)] hover:border-brand-500/40"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-brand-500/0 via-white/0 to-brand-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none" />
            <img loading="lazy" decoding="async"
              src="/depoimentos/players.webp"
              alt={t("cases.socialProof.playersAlt")}
              width={1600}
              height={900}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Short Modal */}
      <AnimatePresence>
        {activeYouTubeShort && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setActiveYouTubeShort(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveYouTubeShort(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeYouTubeShort}?autoplay=1&rel=0`}
                title={t("cases.socialProof.youtube.title")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
