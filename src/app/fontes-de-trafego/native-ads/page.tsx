"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Gauge,
  LayoutDashboard,
  Network,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { HeroNativeAds } from "./components/HeroNativeAds";
import { MotionImageCard } from "./components/MotionImageCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

export default function NativeAdsTrafficSourcePage() {
  const { t } = useLanguage();

  const networks = useMemo(() => [
    { name: "Taboola", logo: "/taboolalogo.png" },
    { name: "NewsBreak", logo: "/newbreaklogo.webp" },
    { name: "MGID", logo: "/logos/mgid.svg" },
    { name: "RevContent", logo: "/logos/revcontent-mark.avif" },
  ], []);

  const taboolaCards = useMemo(() => [
    {
      icon: Network,
      title: t("nativeAds.taboola.cards.adToSale.title"),
      description: t("nativeAds.taboola.cards.adToSale.description"),
      image: "/card1nativeads.webp",
    },
    {
      icon: Target,
      title: t("nativeAds.taboola.cards.creativeProfits.title"),
      description: t("nativeAds.taboola.cards.creativeProfits.description"),
      image: "/qualcriativolucra.webp",
    },
    {
      icon: Gauge,
      title: t("nativeAds.taboola.cards.fastOptimize.title"),
      description: t("nativeAds.taboola.cards.fastOptimize.description"),
      image: "/dash.png",
    },
  ], [t]);

  const newsbreakCards = useMemo(() => [
    {
      icon: Network,
      title: t("nativeAds.newsbreak.cards.feedToSale.title"),
      description: t("nativeAds.newsbreak.cards.feedToSale.description"),
      image: "/feedateavenda.webp",
    },
    {
      icon: Eye,
      title: t("nativeAds.newsbreak.cards.headlines.title"),
      description: t("nativeAds.newsbreak.cards.headlines.description"),
      image: "/manchetesqueconvertem.webp",
    },
    {
      icon: LayoutDashboard,
      title: t("nativeAds.newsbreak.cards.unifiedPanel.title"),
      description: t("nativeAds.newsbreak.cards.unifiedPanel.description"),
      image: "/mesmopainel.webp",
    },
  ], [t]);

  const steps = useMemo(() => [
    {
      number: "01",
      title: t("nativeAds.steps.connect.title"),
      description: t("nativeAds.steps.connect.description"),
    },
    {
      number: "02",
      title: t("nativeAds.steps.track.title"),
      description: t("nativeAds.steps.track.description"),
    },
    {
      number: "03",
      title: t("nativeAds.steps.scale.title"),
      description: t("nativeAds.steps.scale.description"),
    },
  ], [t]);

  const sectionTitle = useMemo(() => t("nativeAds.section.title"), [t]);
  const sectionSubtitle = useMemo(() => t("nativeAds.section.subtitle"), [t]);
  const taboolaSubtitle = useMemo(() => t("nativeAds.taboola.subtitle"), [t]);
  const newsbreakSubtitle = useMemo(() => t("nativeAds.newsbreak.subtitle"), [t]);
  const platformsTitle = useMemo(() => t("nativeAds.platforms.title"), [t]);
  const operationTitle = useMemo(() => t("nativeAds.operation.title"), [t]);
  const howItWorksTitle = useMemo(() => t("nativeAds.howItWorks.title"), [t]);
  const howItWorksSubtitle = useMemo(() => t("nativeAds.howItWorks.subtitle"), [t]);
  const ctaTitle = useMemo(() => t("nativeAds.cta.title"), [t]);
  const ctaDescription = useMemo(() => t("nativeAds.cta.description"), [t]);
  const ctaButton = useMemo(() => t("nativeAds.cta.button"), [t]);
  const networksLabel = useMemo(() => t("nativeAds.networks.label"), [t]);

  return (
    <main className="flex flex-col flex-1 bg-[#050505] text-white">
      <Navbar />
      <HeroNativeAds />

      <section className="py-10 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-6 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {networksLabel}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {networks.map((network) => (
                <span
                  key={network.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white"
                >
                  <Image
                    src={network.logo}
                    alt={network.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {network.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#050505]">
        <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-6 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
          <div className="text-center mb-20 max-w-5xl 2xl:max-w-[80rem] 4xl:max-w-[100rem] mx-auto">
            <h2 className="text-h1 font-black text-white mb-6 tracking-tight leading-tight hyphens-none" dangerouslySetInnerHTML={{ __html: sectionTitle }} />
            <p className="text-body-lg text-gray-300 max-w-3xl mx-auto px-4 sm:px-0 hyphens-none">
              {sectionSubtitle}
            </p>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-h2 font-black text-brand-primary tracking-tight leading-tight hyphens-none">
                {platformsTitle}
              </h3>
              <p className="mt-3 text-body-lg text-gray-300 max-w-2xl mx-auto hyphens-none">
                {taboolaSubtitle}
              </p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {taboolaCards.map((feature, index) => {
                const isDark = index % 2 === 0;
                return (
                  <div
                    key={feature.title}
                    className={`grid gap-10 lg:grid-cols-2 lg:items-center rounded-3xl p-6 sm:p-8 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}
                  >
                    <div
                      className={
                        index % 2 === 1
                          ? "space-y-6 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] lg:order-2"
                          : "space-y-6 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] lg:order-1"
                      }
                    >
                      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-brand-primary" />
                      </div>
                      <h3
                        className={`text-h2 font-black leading-tight tracking-tight hyphens-none ${isDark ? "text-white" : "text-[#111111]"}`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-body leading-relaxed hyphens-none ${isDark ? "text-gray-300" : "text-[#4b5563]"}`}
                      >
                        {feature.description}
                      </p>
                    </div>

                    <div
                      className={
                        index % 2 === 1
                          ? "w-full lg:order-1"
                          : "w-full lg:order-2"
                      }
                    >
                      <MotionImageCard
                        src={feature.image}
                        alt={feature.title}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-h2 font-black text-brand-primary tracking-tight leading-tight hyphens-none">
                {operationTitle}
              </h3>
              <p className="mt-3 text-body-lg text-gray-300 max-w-2xl mx-auto hyphens-none">
                {newsbreakSubtitle}
              </p>
            </div>

            <div className="space-y-16 md:space-y-24">
              {newsbreakCards.map((feature, index) => {
                const isDark = index % 2 === 0;
                return (
                  <div
                    key={feature.title}
                    className={`grid gap-10 lg:grid-cols-2 lg:items-center rounded-3xl p-6 sm:p-8 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}
                  >
                    <div
                      className={
                        index % 2 === 1
                          ? "space-y-6 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] lg:order-2"
                          : "space-y-6 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] lg:order-1"
                      }
                    >
                      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-brand-primary" />
                      </div>
                      <h3
                        className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight hyphens-none ${isDark ? "text-white" : "text-[#111111]"}`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-base sm:text-xl leading-relaxed ${isDark ? "text-gray-300" : "text-[#4b5563]"}`}
                      >
                        {feature.description}
                      </p>
                    </div>

                    <div
                      className={
                        index % 2 === 1
                          ? "w-full lg:order-1"
                          : "w-full lg:order-2"
                      }
                    >
                      <MotionImageCard
                        src={feature.image}
                        alt={feature.title}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-6 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
          <div className="text-center mb-16 max-w-3xl 2xl:max-w-[60rem] 4xl:max-w-[80rem] mx-auto">
            <h2 className="text-h1 font-black text-white mb-6 tracking-tight leading-tight hyphens-none">
              {howItWorksTitle}
            </h2>
            <p className="text-body-lg text-gray-300 max-w-2xl mx-auto hyphens-none">
              {howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <ShineBorder
                key={step.number}
                borderRadius={24}
                borderWidth={2}
                duration={8}
                color={["#FFB800", "#FF7E4A", "#FFB800", "#FF7E4A"]}
                className="w-full"
              >
                <div className="h-full rounded-3xl border border-white/10 bg-[#111111] p-8">
                  <div className="text-xs font-black uppercase tracking-widest text-brand-primary">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-h2 font-black text-white hyphens-none">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body text-gray-300 leading-relaxed hyphens-none">
                    {step.description}
                  </p>
                </div>
              </ShineBorder>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[130rem] 6xl:max-w-[150rem] px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
          <div className="rounded-[32px] border border-white/10 bg-[#0A0A0A] p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div>
              <h3 className="text-h2 font-black text-white tracking-tight leading-tight hyphens-none" dangerouslySetInnerHTML={{ __html: ctaTitle }} />
              <p className="mt-3 text-body-lg text-gray-300 max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] hyphens-none">
                {ctaDescription}
              </p>
            </div>
            <Button asChild size="lg" className="h-12 px-8 text-base whitespace-nowrap">
              <Link href="/planos">
                {ctaButton} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
