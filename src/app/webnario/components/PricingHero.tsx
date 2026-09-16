"use client";

import { motion } from "motion/react";
import VturbPlayer from "./VturbPlayer";

export default function PricingHero() {
  return (
    <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 overflow-hidden bg-black">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl 2xl:max-w-[70rem] 4xl:max-w-[90rem] h-[400px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl 2xl:max-w-[60rem] 4xl:max-w-[80rem] mx-auto mb-16"
        >
          <h1 className="text-display font-black text-white leading-tight mb-6 max-w-4xl 2xl:max-w-5xl 4xl:max-w-6xl mx-auto text-center">
            Escolha o Plano Ideal Para <span className="text-brand-primary">Escalar sua Operação</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 px-4 sm:px-0 ">
            Sem surpresas ou letras miúdas. Entenda os limites de cada plano e escolha a estrutura que vai multiplicar seus resultados.
          </p>
        </motion.div>

        {/* VTurb Player */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl 2xl:max-w-[70rem] 4xl:max-w-[90rem] mx-auto rounded-3xl overflow-hidden border border-white/10 bg-surface-subdued shadow-2xl aspect-video"
        >
          <VturbPlayer />
        </motion.div>
      </div>
    </section>
  );
}
