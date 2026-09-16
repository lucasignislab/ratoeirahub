"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

export default function GalleryAbout() {
  const { t } = useLanguage();

  const galleryItems = useMemo(() => [
    { id: 1, title: t("about.gallery.item1"), year: t("about.gallery.year1"), aspect: "aspect-square", src: "/time1.peg.jpeg", type: "image" as const },
    { id: 2, title: t("about.gallery.item2"), year: t("about.gallery.year2"), aspect: "aspect-[4/5]", src: "/time2.jpeg", type: "image" as const },
    { id: 3, title: t("about.gallery.item3"), year: t("about.gallery.year3"), aspect: "aspect-square", src: "/time3.jpeg", type: "image" as const },
    { id: 4, title: t("about.gallery.item4"), year: t("about.gallery.year4"), aspect: "aspect-[4/3]", src: "/time4.jpeg", type: "image" as const },
    { id: 5, title: t("about.gallery.item5"), year: t("about.gallery.year5"), aspect: "aspect-square", src: "/time5.jpeg", type: "image" as const },
    { id: 6, title: t("about.gallery.item6"), year: t("about.gallery.year6"), aspect: "aspect-[3/4]", src: "/time6.jpeg", type: "image" as const },
    { id: 7, title: t("about.gallery.item7"), year: t("about.gallery.year7"), aspect: "aspect-video", src: "/time7.jpeg", type: "image" as const },
    { id: 8, title: t("about.gallery.item8"), year: t("about.gallery.year8"), aspect: "aspect-square", src: "/time8.webp", type: "image" as const },
    { id: 9, title: t("about.gallery.item9"), year: t("about.gallery.year9"), aspect: "aspect-square", src: "/time9.webp", type: "image" as const },
    { id: 10, title: t("about.gallery.item10"), year: t("about.gallery.year10"), aspect: "aspect-[3/4]", src: "/time10-HD 720p.mp4", type: "video" as const },
  ], [t]);

  const headerTitle = useMemo(() => t("about.gallery.title"), [t]);
  const headerSubtitle = useMemo(() => t("about.gallery.subtitle"), [t]);

  return (
    <section className="py-16 md:py-32 bg-[#050505]">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 font-black text-white tracking-tight hyphens-none" dangerouslySetInnerHTML={{ __html: headerTitle }} />
          <p className="mt-4 text-base sm:text-xl text-gray-400 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] mx-auto px-4 sm:px-0 hyphens-none">
            {headerSubtitle}
          </p>
        </motion.div>

        {/* Masonry-like Grid */}
        <div className="columns-2 md:columns-3 gap-3 sm:gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group overflow-hidden bg-[#111111] rounded-3xl shadow-md border border-white/10 ${item.aspect} break-inside-avoid mb-3 sm:mb-4 md:mb-6 inline-block w-full`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img loading="lazy" decoding="async"
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-center sm:text-left">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
                  {item.year}
                </span>
                <h3 className="text-white font-bold text-lg tracking-tight leading-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
