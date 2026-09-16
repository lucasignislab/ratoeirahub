"use client";

import { motion, useAnimationFrame, useMotionValue, useInView } from "motion/react";
import { useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Server, ShieldCheck, Target, Ghost, LineChart, Zap } from "lucide-react";
import { Radar, IconContainer } from "@/components/ui/radar-effect";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTAAds() {
  const { t } = useLanguage();
  const angle = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const radarItems = useMemo(() => ({
    serverSide: t("heroAds.cta.radar.serverSide"),
    antiFraud: t("heroAds.cta.radar.antiFraud"),
    tracking: t("heroAds.cta.radar.tracking"),
    clarity: t("heroAds.cta.radar.clarity"),
    realTime: t("heroAds.cta.radar.realTime"),
    fullFunnel: t("heroAds.cta.radar.fullFunnel"),
    realData: t("heroAds.cta.radar.realData"),
  }), [t]);

  useAnimationFrame(() => {
    // Pausa a animação quando a seção sai da viewport (economia de bateria no mobile)
    if (!isInView) return;
    angle.set((angle.get() + 0.8) % 360);
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center min-h-[auto] md:min-h-[clamp(700px,90vh,1100px)]">

      {/* Background glow para o Radar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Radar Effect Section (Agora como Background Absoluto) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-60">
        <div className="relative flex h-[800px] w-full max-w-5xl 2xl:max-w-[90rem] 4xl:max-w-[100rem] flex-col items-center justify-center space-y-4 overflow-visible px-4">
          {/* Row 1 */}
          <div className="mx-auto w-full max-w-4xl 2xl:max-w-[90rem] 4xl:max-w-[90rem] absolute top-16">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer
                text={radarItems.serverSide}
                delay={0.2}
                icon={<Server className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={45} // Superior Esquerdo
              />
              <IconContainer
                delay={0.4}
                text={radarItems.antiFraud}
                icon={<ShieldCheck className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={90} // Topo
              />
              <IconContainer
                text={radarItems.tracking}
                delay={0.3}
                icon={<Target className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={135} // Superior Direito
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="mx-auto w-full max-w-5xl 2xl:max-w-[90rem] 4xl:max-w-[100rem] absolute top-1/2 -translate-y-1/2">
            <div className="flex w-full items-center justify-between">
              <IconContainer
                text={radarItems.clarity}
                delay={0.5}
                icon={<Ghost className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={0} // Esquerda Central
              />
              <IconContainer
                text={radarItems.realTime}
                delay={0.8}
                icon={<LineChart className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={180} // Direita Central
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="mx-auto w-full max-w-4xl 2xl:max-w-[90rem] 4xl:max-w-[90rem] absolute bottom-16">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer
                delay={0.6}
                text={radarItems.fullFunnel}
                icon={<Zap className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={315} // Inferior Esquerdo
              />
              <IconContainer
                delay={0.7}
                text={radarItems.realData}
                icon={<Target className="h-6 w-6 text-brand-primary" />}
                angle={angle}
                targetAngle={225} // Inferior Direito
              />
            </div>
          </div>

          <Radar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" angle={angle} />
        </div>
      </div>

      {/* Content Section (Sobreposto no centro) */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center w-full max-w-6xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[130rem] 6xl:max-w-[150rem] mx-auto"
        >
          <h2 className="text-h1 text-white mb-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] px-4 hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroAds.cta.title") }} />
          <p className="text-body-lg text-gray-300 max-w-3xl 2xl:max-w-[50rem] 4xl:max-w-[80rem] mx-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] px-4 hyphens-none" dangerouslySetInnerHTML={{ __html: t("heroAds.cta.description") }} />
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <Link
            href="/planos#pricing-cards"
            className="inline-flex items-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-brand-primary text-black font-black rounded-button hover:bg-brand-primary-hover transition-all text-lg sm:text-xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95"
          >
            {t("heroAds.cta.button")} <ArrowRight className="w-6 h-6" />
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-4 py-2 text-brand-primary font-semibold hover:text-brand-primary-hover transition-colors min-h-[44px]"
          >
            {t("heroAds.cta.tutorial")}
          </Link>
        </div>
      </div>

    </section>
  );
}
