"use client";

import ChainCarousel, { type ChainItem } from "@/components/ui/chain-carousel";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOGO_FILES = [
  "AdCombo-logo.png",
  "CPAOMNI.jpg",
  "Coinzz.png",
  "DigitalManagerGuru.webp",
  "Doppus.jpeg",
  "Eduzz.png",
  "EverAd.png",
  "ImperiumPay.png",
  "Kirvano.webp",
  "MonadLead.jpeg",
  "SHARK-Platform-logo.png",
  "adexico_logo.jpg",
  "adsinsider.png",
  "adtech.webp",
  "aff1.png",
  "affbay.png",
  "affiliateworld.jpeg",
  "ambalaya.jpeg",
  "appmax.avif",
  "blcok2.png",
  "blitzads_limited_logo.jpeg",
  "block1.png",
  "braip.webp",
  "buygoods.png",
  "cahsfactories.webp",
  "cartpanda.png",
  "click_hunts.png",
  "clickbank.svg",
  "clickdealerltd_logo.jpeg",
  "clickhunts.png",
  "clicksadv.jpeg",
  "cpa_house.png",
  "cpacombo.webp",
  "cpagetti.png",
  "cpapro.png",
  "digistore.png",
  "drcash.png",
  "eliteaffiliates.png",
  "everflow.png",
  "gasmobi.webp",
  "giant_mobi.png",
  "gurumedia.png",
  "health_trader.png",
  "hebreus.png",
  "hotmart.jpg",
  "jvzoo.png",
  "kawailogo.png",
  "keedpay.jpeg",
  "kiwify.png",
  "kma.png",
  "lead_reaktor.png",
  "leadbeat.png",
  "leadrock.png",
  "lemonad.png",
  "logzz.png",
  "manymoney.png",
  "marketeershub.png",
  "maxbounty.png",
  "maxweb.png",
  "mediascalers.png",
  "metacpa.jpg",
  "monetizze.png",
  "moreniche.png",
  "mylead.png",
  "nutrabank.png",
  "nutrahub.jpeg",
  "nutriprofits.png",
  "offersify.png",
  "orbio.png",
  "pagtrust.png",
  "payt.png",
  "perfectpay.png",
  "profitin.png",
  "profitnxt.png",
  "profitpay.png",
  "sellhealth.png",
  "shakespro.png",
  "skylead_logo.png",
  "smartadv_logo.png",
  "smashloud.png",
  "terraleads.png",
  "ticto.png",
  "traffic_light.png",
  "webvork.png",
  "yampi.png",
  "actionpay.png",
  "bearpay.png",
  "blitzads.png",
  "brgateway.svg",
  "cakto.svg",
  "cashfactories.svg",
  "clickbankv8.png",
  "clickdealer.svg",
  "digipag.webp",
  "digistore24.svg",
  "directpag.png",
  "ezaff.svg",
  "hwaffiliate.png",
  "leadbit.svg",
  "mobidea.svg",
  "netvork.svg",
  "skylead.png",
  "smartadv.png",
  "sweeply.svg",
  "trivexpay.avif",
] as const;

const SEARCH_ONLY_ITEMS: ChainItem[] = [
  {
    id: "search-corvex",
    name: "Corvex",
    icon: TrendingUp,
    logo: "/logos/search-only/corvex.svg",
  },
  {
    id: "search-goatpay",
    name: "GoatPay",
    icon: TrendingUp,
    logo: "/logos/search-only/goatpay.svg",
  },
  {
    id: "search-hubla",
    name: "Hubla",
    icon: TrendingUp,
    logo: "/logos/search-only/hubla.ico",
  },
  {
    id: "search-klivo",
    name: "Klivo",
    icon: TrendingUp,
    logo: "/logos/search-only/klivo.ico",
  },
  {
    id: "search-lastlink",
    name: "LastLink",
    icon: TrendingUp,
    logo: "/logos/search-only/lastlink.ico",
  },
  {
    id: "search-salduu",
    name: "Salduu",
    icon: TrendingUp,
    logo: "/logos/search-only/salduu.ico",
  },
  {
    id: "search-tiktok-ads",
    name: "TikTok Ads",
    icon: TrendingUp,
    logo: "/logos/tiktoklogo - Editado.png",
  },
  {
    id: "search-mgid",
    name: "MGID",
    icon: TrendingUp,
    logo: "/logos/mgid.svg",
  },
  {
    id: "search-tribopay",
    name: "TriboPay",
    icon: TrendingUp,
    logo: "/logos/search-only/tribopay.ico",
  },
  {
    id: "search-zippy",
    name: "Zippy",
    icon: TrendingUp,
    logo: "/logos/search-only/zippy.svg",
  },
];

function humanizeLogoName(fileName: string) {
  const withoutExt = fileName.replace(/\.[^.]+$/, "");
  if (withoutExt.toLowerCase() === "kawailogo" || withoutExt.toLowerCase() === "kwailogo") return "Kwai";
  if (withoutExt.toLowerCase() === "adcombo-logo") return "AdCombo";
  if (withoutExt.toLowerCase() === "adexico_logo") return "Adexico";
  if (withoutExt.toLowerCase() === "blitzads_limited_logo") return "Blitzads Limited";
  if (withoutExt.toLowerCase() === "clickdealerltd_logo") return "Clickdealerltd";
  if (withoutExt.toLowerCase() === "shark-platform-logo") return "SHARK Platform";
  if (withoutExt.toLowerCase() === "clickbankv8") return "ClickBankV8";
  if (withoutExt.toLowerCase() === "digistore24") return "Digistore24";
  if (withoutExt.toLowerCase() === "ezaff") return "EzAff";
  if (withoutExt.toLowerCase() === "hwaffiliate") return "HWAffiliate";
  if (withoutExt.toLowerCase() === "skylead") return "SkyLead";
  if (withoutExt.toLowerCase() === "smartadv") return "SmartAdv";
  if (withoutExt.toLowerCase() === "trivexpay") return "TrivexPay";
  return withoutExt
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

export default function Mais70ChainCarousel() {
  const { t } = useLanguage();
  const safeFiles = LOGO_FILES.filter((name) => !name.includes(" "));
  const items: ChainItem[] = safeFiles.slice(0, 150).map((file, idx) => ({
    id: `${idx}-${file}`,
    name: humanizeLogoName(file),
    icon: TrendingUp,
    logo: `/logos/${file}`,
  }));

  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
        <h2 className="text-center text-h1 font-black text-[#FFB800] tracking-tight">
          {t("mais70.carousel.title")}
        </h2>
        <div className="h-10" />
        <ChainCarousel
          items={items}
          searchOnlyItems={SEARCH_ONLY_ITEMS}
          visibleItemCount={9}
          scrollSpeedMs={1200}
        />
      </div>
    </section>
  );
}
