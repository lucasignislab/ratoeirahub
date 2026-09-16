"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, CheckCircle, Image as ImageIcon, BarChart, Target, Zap, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CaseData {
  id: string;
  photo: string;
}

// Componente para animar textos palavra por palavra
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.04 },
        },
      }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function CaseClientView({ caseData }: { caseData: CaseData }) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve todos os campos via i18n usando o ID do case.
  const name = t(`cases.detail.${caseData.id}.name`);
  const role = t(`cases.detail.${caseData.id}.role`);
  const challenge = t(`cases.detail.${caseData.id}.challenge`);
  const solution = t(`cases.detail.${caseData.id}.solution`);
  const testimonial = t(`cases.detail.${caseData.id}.testimonial`);
  const results: string[] = [0, 1, 2].map((i) =>
    t(`cases.detail.${caseData.id}.results.${i}`),
  );

  // Setup do Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <article ref={containerRef} className="relative bg-[#050505]">
      {/* 1. HERO PARALLAX */}
      <div className="relative h-[60vh] sm:h-[80vh] min-h-[400px] sm:min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        {/* Imagem de Fundo Parallax */}
        <motion.div 
          style={{ y: yHero, opacity: opacityHero, scale: scaleHero }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={caseData.photo}
            alt={`${t("cases.detail.capa")} ${name}`}
            className="w-full h-full object-cover object-top"
          />
          {/* Overlay escuro para garantir leitura */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
        </motion.div>

        {/* Conteúdo da Hero */}
        <div className="relative z-10 w-full max-w-5xl 2xl:max-w-5xl 4xl:max-w-[100rem] mx-auto px-4 2xl:px-12 4xl:px-20 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-gray-400/60 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-all font-medium text-sm border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("cases.detail.backToCases")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 bg-brand-primary/20 border border-brand-primary/30 rounded-full backdrop-blur-sm"
          >
            <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">
              {role}
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
            className="text-display font-black mb-8 sm:mb-12 tracking-tight text-white drop-shadow-2xl flex flex-wrap justify-center gap-x-4 px-4 text-center"
          >
            {name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -20 },
                  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. OVERLAPPING RESULTS BAR */}
      <div className="relative z-20 max-w-5xl 2xl:max-w-5xl 4xl:max-w-[100rem] mx-auto px-4 2xl:px-12 4xl:px-20 -mt-16 sm:-mt-24 mb-16 sm:mb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } 
            }
          }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-[32px] shadow-2xl"
        >
          {results.map((res, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/5 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl cursor-default transition-colors duration-300"
            >
              <TrendingUp className="w-6 h-6 text-brand-primary" />
              <span className="font-bold text-sm sm:text-xl text-white">{res}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 3. CONTEÚDO PRINCIPAL (Editorial Style) */}
      <div className="max-w-4xl 2xl:max-w-4xl 4xl:max-w-[90rem] mx-auto px-4 2xl:px-12 4xl:px-20 pb-16 sm:pb-32">
        
        {/* O Desafio */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20"
            >
              <Target className="w-6 h-6 text-red-500" />
            </motion.div>
            <h2 className="text-h1 font-black text-white">{t("cases.detail.challengeTitle")}</h2>
          </div>
          <AnimatedText
            text={challenge}
            className="text-lg sm:text-2xl text-gray-400 leading-relaxed font-medium"
          />
        </motion.section>

        {/* Placeholders Visuais (Galeria da Operação) - Desafio */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6 } }
            }}
            whileHover={{ scale: 1.02, borderColor: "var(--color-brand-primary)" }}
            className="relative aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-br from-[#161616] to-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center text-center p-8 overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <BarChart className="relative z-10 w-12 h-12 text-gray-400/20 mb-4 group-hover:text-brand-primary transition-colors duration-500 group-hover:-translate-y-2" />
            <p className="relative z-10 text-gray-400/40 font-semibold uppercase tracking-widest text-xs mb-2 group-hover:text-white transition-colors">{t("cases.detail.placeholder")}</p>
            <p className="relative z-10 text-gray-400/60 text-sm">{t("cases.detail.dashboardPrint")}</p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 30, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6 } }
            }}
            whileHover={{ scale: 1.02, borderColor: "var(--color-brand-primary)" }}
            className="relative aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-bl from-[#161616] to-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center text-center p-8 overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ImageIcon className="relative z-10 w-12 h-12 text-gray-400/20 mb-4 group-hover:text-brand-primary transition-colors duration-500 group-hover:-translate-y-2" />
            <p className="relative z-10 text-gray-400/40 font-semibold uppercase tracking-widest text-xs mb-2 group-hover:text-white transition-colors">{t("cases.detail.placeholder")}</p>
            <p className="relative z-10 text-gray-400/60 text-sm">{t("cases.detail.fotoEquipe")}</p>
          </motion.div>
        </motion.section>

        {/* A Solução */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20"
            >
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </motion.div>
            <h2 className="text-h1 font-black text-white">{t("cases.detail.solucaoRatoeira")}</h2>
          </div>
          <AnimatedText
            text={solution}
            className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-medium"
          />
        </motion.section>

        {/* Placeholders Visuais (Solução) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
            }}
            whileHover={{ scale: 1.02, borderColor: "var(--color-brand-primary)" }}
            className="relative aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-tr from-[#161616] to-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center text-center p-8 overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="relative z-10 w-12 h-12 text-gray-400/20 mb-4 group-hover:text-brand-primary transition-colors duration-500 group-hover:-translate-y-2" />
            <p className="relative z-10 text-gray-400/40 font-semibold uppercase tracking-widest text-xs mb-2 group-hover:text-white transition-colors">{t("cases.detail.placeholder")}</p>
            <p className="relative z-10 text-gray-400/60 text-sm">{t("cases.detail.printFerramenta")}</p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
            }}
            whileHover={{ scale: 1.02, borderColor: "var(--color-brand-primary)" }}
            className="relative aspect-square md:aspect-[4/3] rounded-[32px] bg-gradient-to-tl from-[#161616] to-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center text-center p-8 overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ImageIcon className="relative z-10 w-12 h-12 text-gray-400/20 mb-4 group-hover:text-brand-primary transition-colors duration-500 group-hover:-translate-y-2" />
            <p className="relative z-10 text-gray-400/40 font-semibold uppercase tracking-widest text-xs mb-2 group-hover:text-white transition-colors">{t("cases.detail.placeholder")}</p>
            <p className="relative z-10 text-gray-400/60 text-sm">{t("cases.detail.criacaoPaginas")}</p>
          </motion.div>
        </motion.section>

        {/* Depoimento Gigante */}
        <motion.blockquote 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.01 }}
          className="relative p-6 sm:p-10 md:p-16 bg-gradient-to-br from-[#111111] to-[#050505] border border-brand-primary/20 rounded-[32px] sm:rounded-[40px] mb-16 sm:mb-32 shadow-2xl shadow-brand-primary/5 overflow-hidden group"
        >
          {/* Efeito Glow Interno */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Quote className="absolute top-10 left-10 w-20 h-20 text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors duration-500" />
          </motion.div>

          <p className="relative z-10 text-xl sm:text-3xl md:text-5xl font-bold text-white leading-tight italic mt-6 sm:mt-8 mb-8 sm:mb-12">
            &quot;{testimonial}&quot;
          </p>

          <div className="flex items-center gap-6 relative z-10">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-primary shadow-lg shadow-brand-primary/20"
            >
              <img loading="lazy" decoding="async" src={caseData.photo} alt={name} className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <p className="font-black text-xl sm:text-2xl text-white">{name}</p>
              <p className="text-brand-primary text-base sm:text-lg font-semibold">{role}</p>
            </div>
          </div>
        </motion.blockquote>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center p-8 sm:p-16 bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-white/10 rounded-[32px] sm:rounded-[40px] relative overflow-hidden group"
        >
          {/* Efeito hover background */}
          <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <h3 className="text-h1 font-black mb-4 sm:mb-6 relative z-10">{t("cases.detail.nextCtaTitle")}</h3>
          <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] mx-auto relative z-10">
            {t("cases.detail.nextCtaDescription")}
          </p>
          <Link
            href="/planos"
            className="relative z-10 inline-flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 bg-brand-primary hover:bg-brand-primary-hover text-black font-black rounded-button transition-all duration-300 text-base sm:text-xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95"
          >
            {t("cases.detail.nextCtaButton")}
          </Link>
        </motion.div>

      </div>
    </article>
  );
}
