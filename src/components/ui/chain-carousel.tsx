"use client";

import { type ComponentType, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Search, TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ChainItem {
  id: string | number;
  name: string;
  icon: ComponentType<{ className?: string }>;
  details?: string;
  logo?: string;
}

type AnimatedChainItem = ChainItem & {
  distanceFromCenter: number;
  originalIndex: number;
};

interface CarouselItemProps {
  chain: AnimatedChainItem;
  side: "left" | "right";
}

interface ChainCarouselProps {
  items: ChainItem[];
  searchOnlyItems?: ChainItem[];
  scrollSpeedMs?: number;
  visibleItemCount?: number;
  className?: string;
  onChainSelect?: (chainId: ChainItem["id"], chainName: string) => void;
}

const LogoMarquee = memo(({
  items,
  direction,
}: {
  items: ChainItem[];
  direction: "left" | "right";
}) => {
  const duplicatedItems = useMemo(() => Array.from({ length: 3 }).flatMap(() => items), [items]);

  return (
    <div className="relative w-full overflow-hidden py-3">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      <div
        className={cn(
          "flex items-center gap-4 w-max will-change-transform",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/90 p-2"
          >
            {item.logo ? (
              <img loading="lazy" decoding="async"
                src={item.logo}
                alt={`${item.name} logo`}
                className="w-full h-full object-contain rounded-full"
                draggable={false}
              />
            ) : (
              <item.icon className="w-full h-full text-black" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";


const CarouselItemCard = ({ chain, side }: CarouselItemProps) => {
  const { distanceFromCenter, id, name, logo, icon: FallbackIcon } = chain;
  const distance = Math.abs(distanceFromCenter);
  const opacity = 1 - distance / 4;
  const scale = 1 - distance * 0.1;
  const yOffset = distanceFromCenter * 90;
  const xOffset = side === "left" ? -distance * 50 : distance * 50;

  return (
    <motion.div
      key={id}
      className={cn(
        "absolute flex items-center gap-4 px-6 py-3",
        side === "left" ? "flex-row-reverse" : "flex-row",
      )}
      animate={{ opacity, scale, y: yOffset, x: xOffset }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="rounded-full border border-white/10 p-2 bg-white/90">
        {logo ? (
          <img loading="lazy" decoding="async" src={logo} alt={`${name} logo`} className="size-10 rounded-full object-contain" />
        ) : (
          <FallbackIcon className="size-10 text-black" />
        )}
      </div>

      <div className={cn("flex flex-col mx-4", side === "left" ? "text-right" : "text-left")}>
        <span className="text-md lg:text-lg font-semibold text-white max-w-[220px] truncate">{name}</span>
      </div>
    </motion.div>
  );
};

export default function ChainCarousel({
  items,
  searchOnlyItems = [],
  scrollSpeedMs = 1500,
  visibleItemCount = 9,
  className = "",
  onChainSelect,
}: ChainCarouselProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const rightSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rightSectionRef, { margin: "-100px 0px -100px 0px" });
  const totalItems = items.length;

  useEffect(() => {
    if (isPaused || totalItems === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, scrollSpeedMs);
    return () => clearInterval(interval);
  }, [isPaused, totalItems, scrollSpeedMs]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsPaused(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsPaused(false);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const getVisibleItems = useCallback((): AnimatedChainItem[] => {
    const visibleItems: AnimatedChainItem[] = [];
    if (totalItems === 0) return [];

    const itemsToShow = visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount;
    const half = Math.floor(itemsToShow / 2);

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index += totalItems;
      if (index >= totalItems) index -= totalItems;

      visibleItems.push({
        ...items[index],
        originalIndex: index,
        distanceFromCenter: i,
      });
    }

    return visibleItems;
  }, [currentIndex, items, totalItems, visibleItemCount]);

  const filteredItems = useMemo(() => {
    const searchableItems = searchTerm.trim() ? [...items, ...searchOnlyItems] : items;
    return searchableItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [items, searchOnlyItems, searchTerm]);

  const handleSelectChain = (id: ChainItem["id"], name: string) => {
    const index = items.findIndex((c) => c.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPaused(true);
      onChainSelect?.(id, name);
    }
    setSearchTerm(name);
    setShowDropdown(false);
  };

  const currentItem = items[currentIndex];

  return (
    <div id="explore-section" className={cn("space-y-14", className)}>
      <div className="flex flex-col xl:flex-row max-w-7xl 3xl:max-w-[100rem] 4xl:max-w-[120rem] mx-auto px-4 md:px-8 3xl:px-12 4xl:px-20 gap-12 justify-center items-center">
        <motion.div
          className="relative w-full max-w-md xl:max-w-2xl 3xl:max-w-[40rem] 4xl:max-w-[50rem] h-[450px] flex items-center justify-center hidden xl:flex"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: "-100%", opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-[#050505] to-transparent" />
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-[#050505] to-transparent" />
          </div>

          {getVisibleItems().map((chain) => (
            <CarouselItemCard key={chain.id} chain={chain} side="left" />
          ))}
        </motion.div>

        <div className="flex flex-col text-center gap-4 max-w-md w-full">
          <div className="md:hidden">
            <LogoMarquee items={items} direction="left" />
          </div>

          {currentItem && (
            <div className="flex flex-col items-center justify-center gap-0 mt-2">
              <div className="p-2 bg-white/90 rounded-full border border-white/10">
                {currentItem.logo ? (
                  <img loading="lazy" decoding="async"
                    src={currentItem.logo}
                    alt={`${currentItem.name} logo`}
                    className="size-16 rounded-full object-contain"
                  />
                ) : (
                  (() => {
                    const IconComponent = currentItem.icon ?? TrendingUp;
                    return <IconComponent className="size-8 text-black" />;
                  })()
                )}
              </div>
              <h3 className="text-xl xl:text-2xl font-black text-white mt-3">{currentItem.name}</h3>
            </div>
          )}

          <div className="mt-4 relative max-w-lg mx-auto w-full">
            <div className="px-3 flex items-center relative">
              <input
                type="text"
                value={searchTerm}
                placeholder={t("chainCarousel.searchPlaceholder")}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  setShowDropdown(val.length > 0);
                  if (val === "") setIsPaused(false);
                }}
                onFocus={() => {
                  if (searchTerm.length > 0) setShowDropdown(true);
                  setIsPaused(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 200);
                }}
                className="flex-grow outline-none text-white bg-white/[0.03] px-4 text-base rounded-full border border-white/10 pr-10 pl-10 py-3"
              />
              <Search className="absolute text-gray-400/60 w-5 h-5 left-6 pointer-events-none" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setShowDropdown(false);
                    setIsPaused(false);
                  }}
                  className="absolute right-6 text-gray-400/70 hover:text-white"
                  aria-label="Limpar"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {showDropdown && filteredItems.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-[#0b0b0b] rounded-2xl border border-white/10 z-20 max-h-60 overflow-y-auto shadow-2xl">
                {filteredItems.slice(0, 12).map((chain) => (
                  <div
                    key={chain.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectChain(chain.id, chain.name);
                    }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.06] transition-colors duration-150 rounded-xl m-2"
                  >
                    {chain.logo ? (
                      <img loading="lazy" decoding="async" src={chain.logo} alt={`${chain.name} logo`} className="size-8 rounded-full object-contain bg-white/90 p-1" />
                    ) : (
                      (() => {
                        const IconComponent = chain.icon ?? TrendingUp;
                        return <IconComponent className="h-5 w-5 text-brand-primary" />;
                      })()
                    )}
                    <span className="text-white font-medium">{chain.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <LogoMarquee items={items} direction="right" />
          </div>
        </div>

        <motion.div
          ref={rightSectionRef}
          className="relative w-full max-w-md xl:max-w-2xl 3xl:max-w-[40rem] 4xl:max-w-[50rem] h-[450px] hidden md:flex items-center justify-center"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: "100%", opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-[#050505] to-transparent" />
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-[#050505] to-transparent" />
          </div>

          {getVisibleItems().map((chain) => (
            <CarouselItemCard key={chain.id} chain={chain} side="right" />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
