"use client";

import { useState, Fragment, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionModal from "./SubscriptionModal";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

type PlanType = "ads" | "pages" | "hub";
type BillingCycle = "monthly" | "semiannual" | "annual";

const TABS: { id: PlanType; label: string; icon: string; badge?: string }[] = [
  {
    id: "ads",
    label: "Ratoeira Ads",
    icon: "/icons/pricing/ads-icon.png",
  },
  {
    id: "pages",
    label: "Ratoeira Pages",
    icon: "/icons/pricing/pages-icon.png",
  },
  {
    id: "hub",
    label: "Ratoeira Hub",
    icon: "/icons/pricing/hub-icon.png",
    badge: "RECOMENDADO",
  },
];

const GOOGLE_ADS_LOGO = "/icons/pricing/google-ads.webp";
const META_ADS_LOGO = "/icons/pricing/meta-ads.png";
const TABOOLA_LOGO = "/taboolalogo.png";
const NEWSBREAK_LOGO = "/newbreaklogo.webp";

const PERIODS: { id: BillingCycle; label: string }[] = [
  { id: "monthly", label: "Mensal" },
  { id: "semiannual", label: "Semestral" },
  { id: "annual", label: "Anual" },
];

const DESCRIPTIONS: Record<
  PlanType,
  Record<BillingCycle, string[]>
> = {
  ads: {
    monthly: [
      "Para testar o rastreamento sem compromisso.",
      "Para quem está validando as primeiras campanhas.",
      "Para anunciantes que já escalam com consistência.",
      "Para operações robustas de alto volume.",
    ],
    semiannual: [
      "Para quem está validando as primeiras campanhas.",
      "Para anunciantes que já escalam com consistência.",
      "Para operações robustas de alto volume.",
    ],
    annual: [
      "Para quem está validando as primeiras campanhas.",
      "Para anunciantes que já escalam com consistência.",
      "Para operações robustas de alto volume.",
    ],
  },
  pages: {
    monthly: [
      "Para testar a performance da Ratoeira Pages.",
      "Para quem está iniciando e precisa de mais páginas.",
      "Ideal para te dar flexibilidade de domínios.",
      "Plano ideal para não travar sua escala.",
    ],
    semiannual: [
      "Para quem está iniciando e precisa de mais páginas.",
      "Ideal para te dar flexibilidade de domínios.",
      "Plano ideal para não travar sua escala.",
    ],
    annual: [
      "Para quem está iniciando e precisa de mais páginas.",
      "Ideal para te dar flexibilidade de domínios.",
      "Plano ideal para não travar sua escala.",
    ],
  },
  hub: {
    monthly: [
      "Conheça o ecossistema Ratoeira sem compromisso.",
      "O combo ideal para iniciar sua escala integrada.",
      "Ideal para ter flexibilidade de teste e escala.",
      "Ideal para não travar sua escala.",
    ],
    semiannual: [
      "O combo ideal para iniciar sua escala integrada.",
      "Ideal para ter flexibilidade de teste e escala.",
      "Ideal para não travar sua escala.",
    ],
    annual: [
      "O combo ideal para iniciar sua escala integrada.",
      "Ideal para ter flexibilidade de teste e escala.",
      "Ideal para não travar sua escala.",
    ],
  },
};

// Source: /tmp/pricing_cards.json
const PRICING_CARDS: PricingCard[] = [
  {
    index: 30,
    product: "ads",
    cycle: "monthly",
    name: "Gratuito",
    badge: "",
    inst: "",
    val: "0,00",
    per: "/mês",
    avista: "",
    cta: "Começar Grátis",
    href: "https://clkdmg.site/subscribe/gratuito-ads",
    limits: [
      ["Tag Ratoeira Automática", "1"],
      ["Integrações / Webhooks", "1"],
      ["Perfis/E-mail Google Ads", "1"],
      ["Vendas aprovadas/mês", "Até 10 *"],
    ],
    platforms: [
      ["Google Ads", "1"],
      ["Meta Ads", "1"],
      ["Taboola", "1"],
      ["NewsBreak", "1"],
    ],
    hub_subs: [],
    footnote: "* Sem cobrança adicional – após é necessário upgrade",
  },
  {
    index: 1,
    product: "ads",
    cycle: "monthly",
    name: "Rato",
    badge: "",
    inst: "",
    val: "167,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/ratoeiraads-ratomensal",
    limits: [
      ["Tag Ratoeira Automática", "15"],
      ["Integrações / Webhooks", "7"],
      ["Perfis/E-mail Google Ads", "3"],
      ["Vendas aprovadas/mês", "Até 1.000 *"],
    ],
    platforms: [
      ["Google Ads", "10"],
      ["Meta Ads", "3"],
      ["Taboola", "2"],
      ["NewsBreak", "2"],
    ],
    hub_subs: [],
    footnote: "* R$0,12 por venda extra aprovada",
  },
  {
    index: 2,
    product: "ads",
    cycle: "monthly",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "",
    val: "247,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a0fc08d6-ae0a-4d89-9cb6-98bfc9763851",
    limits: [
      ["Tag Ratoeira Automática", "80"],
      ["Integrações / Webhooks", "15"],
      ["Perfis/E-mail Google Ads", "10"],
      ["Vendas aprovadas/mês", "Até 2.500 *"],
    ],
    platforms: [
      ["Google Ads", "20"],
      ["Meta Ads", "7"],
      ["Taboola", "5"],
      ["NewsBreak", "5"],
    ],
    hub_subs: [],
    footnote: "* R$0,10 por venda extra aprovada",
  },
  {
    index: 3,
    product: "ads",
    cycle: "monthly",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "",
    val: "397,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a17d51c4-6013-4e7e-81c1-619b60bcc628",
    limits: [
      ["Tag Ratoeira Automática", "300"],
      ["Integrações / Webhooks", "Ilimitado"],
      ["Perfis/E-mail Google Ads", "30"],
      ["Vendas aprovadas/mês", "Até 5.000 *"],
    ],
    platforms: [
      ["Google Ads", "Ilimitado"],
      ["Meta Ads", "Ilimitado"],
      ["Taboola", "Ilimitado"],
      ["NewsBreak", "Ilimitado"],
    ],
    hub_subs: [],
    footnote: "* R$0,07 por venda extra aprovada",
  },
  {
    index: 4,
    product: "ads",
    cycle: "semiannual",
    name: "Rato",
    badge: "",
    inst: "6X",
    val: "149,52",
    per: "/mês",
    avista: "por R$797,00 à vista",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/ratoeiraads-ratosemestral",
    limits: [
      ["Tag Ratoeira Automática", "15"],
      ["Integrações / Webhooks", "7"],
      ["Perfis/E-mail Google Ads", "3"],
      ["Vendas aprovadas/mês", "Até 1.000 *"],
    ],
    platforms: [
      ["Google Ads", "10"],
      ["Meta Ads", "3"],
      ["Taboola", "2"],
      ["NewsBreak", "2"],
    ],
    hub_subs: [],
    footnote: "* R$0,12 por venda extra aprovada",
  },
  {
    index: 5,
    product: "ads",
    cycle: "semiannual",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "6X",
    val: "205,80",
    per: "/mês",
    avista: "por R$1.097,00 à vista",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a0fc08d6-bf5e-4475-963e-40960af2d577",
    limits: [
      ["Tag Ratoeira Automática", "80"],
      ["Integrações / Webhooks", "15"],
      ["Perfis/E-mail Google Ads", "10"],
      ["Vendas aprovadas/mês", "Até 2.500 *"],
    ],
    platforms: [
      ["Google Ads", "20"],
      ["Meta Ads", "7"],
      ["Taboola", "5"],
      ["NewsBreak", "5"],
    ],
    hub_subs: [],
    footnote: "* R$0,10 por venda extra aprovada",
  },
  {
    index: 6,
    product: "ads",
    cycle: "semiannual",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "6X",
    val: "349,50",
    per: "/mês",
    avista: "por R$2.097,00 à vista",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a10ab249-68b1-4c16-a081-bb62cfc0b884",
    limits: [
      ["Tag Ratoeira Automática", "300"],
      ["Integrações / Webhooks", "Ilimitado"],
      ["Perfis/E-mail Google Ads", "30"],
      ["Vendas aprovadas/mês", "Até 5.000 *"],
    ],
    platforms: [
      ["Google Ads", "Ilimitado"],
      ["Meta Ads", "Ilimitado"],
      ["Taboola", "Ilimitado"],
      ["NewsBreak", "Ilimitado"],
    ],
    hub_subs: [],
    footnote: "* R$0,07 por venda extra aprovada",
  },
  {
    index: 7,
    product: "ads",
    cycle: "annual",
    name: "Rato",
    badge: "",
    inst: "12X",
    val: "139,31",
    per: "/mês",
    avista: "por R$1.347,00 à vista",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a0fe91e6-3880-48db-833d-e2db3576154d",
    limits: [
      ["Tag Ratoeira Automática", "15"],
      ["Integrações / Webhooks", "7"],
      ["Perfis/E-mail Google Ads", "3"],
      ["Vendas aprovadas/mês", "Até 1.000 *"],
    ],
    platforms: [
      ["Google Ads", "10"],
      ["Meta Ads", "3"],
      ["Taboola", "2"],
      ["NewsBreak", "2"],
    ],
    hub_subs: [],
    footnote: "* R$0,12 por venda extra aprovada",
  },
  {
    index: 8,
    product: "ads",
    cycle: "annual",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "12X",
    val: "185,85",
    per: "/mês",
    avista: "por R$1.797,00 à vista",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a0fc08d6-cfb7-4321-ab3b-01e729162465",
    limits: [
      ["Tag Ratoeira Automática", "80"],
      ["Integrações / Webhooks", "15"],
      ["Perfis/E-mail Google Ads", "10"],
      ["Vendas aprovadas/mês", "Até 2.500 *"],
    ],
    platforms: [
      ["Google Ads", "20"],
      ["Meta Ads", "7"],
      ["Taboola", "5"],
      ["NewsBreak", "5"],
    ],
    hub_subs: [],
    footnote: "* R$0,10 por venda extra aprovada",
  },
  {
    index: 9,
    product: "ads",
    cycle: "annual",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "12X",
    val: "333,08",
    per: "/mês",
    avista: "por R$3.997,00 à vista",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a17d5279-c049-440a-8d3a-ebd700504842",
    limits: [
      ["Tag Ratoeira Automática", "300"],
      ["Integrações / Webhooks", "Ilimitado"],
      ["Perfis/E-mail Google Ads", "30"],
      ["Vendas aprovadas/mês", "Até 5.000 *"],
    ],
    platforms: [
      ["Google Ads", "Ilimitado"],
      ["Meta Ads", "Ilimitado"],
      ["Taboola", "Ilimitado"],
      ["NewsBreak", "Ilimitado"],
    ],
    hub_subs: [],
    footnote: "* R$0,07 por venda extra aprovada",
  },
  {
    index: 29,
    product: "pages",
    cycle: "monthly",
    name: "Gratuito",
    badge: "",
    inst: "",
    val: "0,00",
    per: "/mês",
    avista: "",
    cta: "Começar Grátis",
    href: "https://clkdmg.site/subscribe/gratuito-pages",
    limits: [
      ["Acessos mensais", "500"],
      ["Domínios", "1"],
      ["Páginas", "1"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 10,
    product: "pages",
    cycle: "monthly",
    name: "Rato",
    badge: "",
    inst: "",
    val: "97,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a1b36ef2-2e9f-489a-a7c1-eb05767cf2f3",
    limits: [
      ["Acessos mensais", "200.000"],
      ["Domínios", "10"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 11,
    product: "pages",
    cycle: "monthly",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "",
    val: "117,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a1b36fd8-db05-4763-9812-8fa6065d65b0",
    limits: [
      ["Acessos mensais", "500.000"],
      ["Domínios", "20"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 12,
    product: "pages",
    cycle: "monthly",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "",
    val: "147,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a1b37046-3ae8-47a8-ac8c-5ceac8de02e9",
    limits: [
      ["Acessos mensais", "1.000.000"],
      ["Domínios", "40"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 13,
    product: "pages",
    cycle: "semiannual",
    name: "Rato",
    badge: "",
    inst: "6X",
    val: "82,83",
    per: "/mês",
    avista: "ou R$497,00 à vista",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a1b37270-31b7-426f-bd98-b789e79d1c55",
    limits: [
      ["Acessos mensais", "200.000"],
      ["Domínios", "10"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 14,
    product: "pages",
    cycle: "semiannual",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "6X",
    val: "99,50",
    per: "/mês",
    avista: "ou R$597,00 à vista",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a1b373fb-40f0-496c-afc8-2bda6aaaeec2",
    limits: [
      ["Acessos mensais", "500.000"],
      ["Domínios", "20"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 15,
    product: "pages",
    cycle: "semiannual",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "6X",
    val: "132,83",
    per: "/mês",
    avista: "ou R$797,00 à vista",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a1b375cf-d00d-448c-be15-b29cb2edc57c",
    limits: [
      ["Acessos mensais", "1.000.000"],
      ["Domínios", "40"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 16,
    product: "pages",
    cycle: "annual",
    name: "Rato",
    badge: "",
    inst: "12X",
    val: "54,75",
    per: "/mês",
    avista: "ou R$657,00 à vista",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a1b3721b-9c6c-4276-b81c-9224b8be4a71",
    limits: [
      ["Acessos mensais", "200.000"],
      ["Domínios", "10"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 17,
    product: "pages",
    cycle: "annual",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "12X",
    val: "73,08",
    per: "/mês",
    avista: "ou R$877,00 à vista",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a1b37447-b087-4e02-aaf8-22baae5e8ad8",
    limits: [
      ["Acessos mensais", "500.000"],
      ["Domínios", "20"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 18,
    product: "pages",
    cycle: "annual",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "12X",
    val: "116,42",
    per: "/mês",
    avista: "ou R$1.397,00 à vista",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a1b3755f-f052-4a3a-8dd4-98e56c03ecc2",
    limits: [
      ["Acessos mensais", "1.000.000"],
      ["Domínios", "40"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [],
    hub_subs: [],
  },
  {
    index: 28,
    product: "hub",
    cycle: "monthly",
    name: "Gratuito",
    badge: "",
    inst: "",
    val: "0,00",
    per: "/mês",
    avista: "",
    cta: "Começar Grátis",
    href: "https://clkdmg.site/subscribe/gratuito",
    limits: [
      ["Tag Ratoeira Automática", "1"],
      ["Integrações / Webhooks", "1"],
      ["Perfis/E-mail Google Ads", "1"],
      ["Vendas aprovadas/mês", "Até 10 *"],
      ["Acessos mensais", "500"],
      ["Domínios", "1"],
      ["Páginas", "1"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "1"],
      ["Meta Ads", "1"],
      ["Taboola", "1"],
      ["NewsBreak", "1"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* Sem cobrança adicional – após é necessário upgrade",
  },
  {
    index: 19,
    product: "hub",
    cycle: "monthly",
    name: "Rato",
    badge: "",
    inst: "",
    val: "197,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a172f1f0-1a94-44f6-b1c3-33c086144459",
    limits: [
      ["Tag Ratoeira Automática", "15"],
      ["Integrações / Webhooks", "7"],
      ["Perfis/E-mail Google Ads", "3"],
      ["Vendas aprovadas/mês", "Até 1.000 *"],
      ["Acessos mensais", "200.000"],
      ["Domínios", "10"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "10"],
      ["Meta Ads", "3"],
      ["Taboola", "2"],
      ["NewsBreak", "2"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,12 por venda extra aprovada",
  },
  {
    index: 20,
    product: "hub",
    cycle: "monthly",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "",
    val: "297,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a17b698f-2997-474a-8a36-fe7424fd09d8",
    limits: [
      ["Tag Ratoeira Automática", "80"],
      ["Integrações / Webhooks", "15"],
      ["Perfis/E-mail Google Ads", "10"],
      ["Vendas aprovadas/mês", "Até 2.500 *"],
      ["Acessos mensais", "500.000"],
      ["Domínios", "20"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "20"],
      ["Meta Ads", "7"],
      ["Taboola", "5"],
      ["NewsBreak", "5"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,10 por venda extra aprovada",
  },
  {
    index: 21,
    product: "hub",
    cycle: "monthly",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "",
    val: "497,00",
    per: "/mês",
    avista: "",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a17b7a64-dbe8-4325-b864-7078281fe0d6",
    limits: [
      ["Tag Ratoeira Automática", "300"],
      ["Integrações / Webhooks", "Ilimitado"],
      ["Perfis/E-mail Google Ads", "30"],
      ["Vendas aprovadas/mês", "Até 5.000 *"],
      ["Acessos mensais", "1.000.000"],
      ["Domínios", "40"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "Ilimitado"],
      ["Meta Ads", "Ilimitado"],
      ["Taboola", "Ilimitado"],
      ["NewsBreak", "Ilimitado"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,07 por venda extra aprovada",
  },
  {
    index: 22,
    product: "hub",
    cycle: "semiannual",
    name: "Rato",
    badge: "",
    inst: "6X",
    val: "182,83",
    per: "/mês",
    avista: "ou R$1.097,00 à vista",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a17b67b2-9424-4d5b-a25b-a3c675256b40",
    limits: [
      ["Tag Ratoeira Automática", "15"],
      ["Integrações / Webhooks", "7"],
      ["Perfis/E-mail Google Ads", "3"],
      ["Vendas aprovadas/mês", "Até 1.000 *"],
      ["Acessos mensais", "200.000"],
      ["Domínios", "10"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "10"],
      ["Meta Ads", "3"],
      ["Taboola", "2"],
      ["NewsBreak", "2"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,12 por venda extra aprovada",
  },
  {
    index: 23,
    product: "hub",
    cycle: "semiannual",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "6X",
    val: "266,17",
    per: "/mês",
    avista: "ou R$1.597,00 à vista",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a17b79c4-9997-4916-ae61-3f9a2c644284",
    limits: [
      ["Tag Ratoeira Automática", "80"],
      ["Integrações / Webhooks", "15"],
      ["Perfis/E-mail Google Ads", "10"],
      ["Vendas aprovadas/mês", "Até 2.500 *"],
      ["Acessos mensais", "500.000"],
      ["Domínios", "20"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "20"],
      ["Meta Ads", "7"],
      ["Taboola", "5"],
      ["NewsBreak", "5"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,10 por venda extra aprovada",
  },
  {
    index: 24,
    product: "hub",
    cycle: "semiannual",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "6X",
    val: "432,83",
    per: "/mês",
    avista: "ou R$2.597,00 à vista",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a17b7aae-f76f-49b8-856c-ca6da46f391d",
    limits: [
      ["Tag Ratoeira Automática", "300"],
      ["Integrações / Webhooks", "Ilimitado"],
      ["Perfis/E-mail Google Ads", "30"],
      ["Vendas aprovadas/mês", "Até 5.000 *"],
      ["Acessos mensais", "1.000.000"],
      ["Domínios", "40"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "Ilimitado"],
      ["Meta Ads", "Ilimitado"],
      ["Taboola", "Ilimitado"],
      ["NewsBreak", "Ilimitado"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,07 por venda extra aprovada",
  },
  {
    index: 25,
    product: "hub",
    cycle: "annual",
    name: "Rato",
    badge: "",
    inst: "12X",
    val: "158,08",
    per: "/mês",
    avista: "ou R$1.897,00 à vista",
    cta: "Assinar Rato",
    href: "https://clkdmg.site/subscribe/a17b688b-ff5d-4a4f-b171-74b16652a239",
    limits: [
      ["Tag Ratoeira Automática", "15"],
      ["Integrações / Webhooks", "7"],
      ["Perfis/E-mail Google Ads", "3"],
      ["Vendas aprovadas/mês", "Até 1.000 *"],
      ["Acessos mensais", "200.000"],
      ["Domínios", "10"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "10"],
      ["Meta Ads", "3"],
      ["Taboola", "2"],
      ["NewsBreak", "2"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,12 por venda extra aprovada",
  },
  {
    index: 26,
    product: "hub",
    cycle: "annual",
    name: "Ratazana",
    badge: "MAIS ESCOLHIDO",
    inst: "12X",
    val: "216,42",
    per: "/mês",
    avista: "ou R$2.597,00 à vista",
    cta: "Assinar Ratazana",
    href: "https://clkdmg.site/subscribe/a17b7a02-ea67-4937-8f7d-6e598562ca50",
    limits: [
      ["Tag Ratoeira Automática", "80"],
      ["Integrações / Webhooks", "15"],
      ["Perfis/E-mail Google Ads", "10"],
      ["Vendas aprovadas/mês", "Até 2.500 *"],
      ["Acessos mensais", "500.000"],
      ["Domínios", "20"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "20"],
      ["Meta Ads", "7"],
      ["Taboola", "5"],
      ["NewsBreak", "5"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,10 por venda extra aprovada",
  },
  {
    index: 27,
    product: "hub",
    cycle: "annual",
    name: "Ratazana Plus",
    badge: "MELHOR PREÇO",
    inst: "12X",
    val: "416,42",
    per: "/mês",
    avista: "ou R$4.997,00 à vista",
    cta: "Assinar Ratazana Plus",
    href: "https://clkdmg.site/subscribe/a17b7b12-a65c-4a48-84f9-ac1d2c1dc8a5",
    limits: [
      ["Tag Ratoeira Automática", "300"],
      ["Integrações / Webhooks", "Ilimitado"],
      ["Perfis/E-mail Google Ads", "30"],
      ["Vendas aprovadas/mês", "Até 5.000 *"],
      ["Acessos mensais", "1.000.000"],
      ["Domínios", "40"],
      ["Páginas", "Ilimitadas"],
      ["Hospedagem Grátis", "Ilimitada"],
      ["Conexão com IA", "✓"],
    ],
    platforms: [
      ["Google Ads", "Ilimitado"],
      ["Meta Ads", "Ilimitado"],
      ["Taboola", "Ilimitado"],
      ["NewsBreak", "Ilimitado"],
    ],
    hub_subs: ["RATOEIRA ADS", "RATOEIRA PAGES"],
    footnote: "* R$0,07 por venda extra aprovada",
  },
];

type PricingCard = {
  index: number;
  product: PlanType;
  cycle: BillingCycle;
  name: string;
  badge: string;
  inst: string;
  val: string;
  per: string;
  avista: string;
  cta: string;
  href?: string;
  limits: [string, string][];
  platforms: [string, string][];
  hub_subs: string[];
  footnote?: string;
};

type CompareRow =
  | { type: "section"; target: string; label: string }
  | {
      type: "row";
      section: string;
      label: string;
      gratuito: string;
      rato: string;
      ratazana: string;
      ratazana_plus: string;
    };

// Source: /tmp/pricing_compare.json
const COMPARE_ROWS: CompareRow[] = [
  { type: "section", target: "rows-ads", label: "Ratoeira Ads" },
  { type: "section", target: "rows-pgs", label: "Ratoeira Pages" },
  { type: "section", target: "rows-hub", label: "Ratoeira Hub" },
  {
    type: "row",
    section: "rows-ads",
    label: "Tag Ratoeira Automática",
    gratuito: "1",
    rato: "15",
    ratazana: "80",
    ratazana_plus: "300",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Integrações / Webhooks",
    gratuito: "1",
    rato: "7",
    ratazana: "15",
    ratazana_plus: "Ilimitado",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Perfis/E-mail Google Ads",
    gratuito: "1",
    rato: "3",
    ratazana: "10",
    ratazana_plus: "30",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Vendas aprovadas/mês",
    gratuito: "Até 10 *",
    rato: "Até 1.000 *",
    ratazana: "Até 2.500 *",
    ratazana_plus: "Até 5.000 *",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Contas Google Ads",
    gratuito: "1",
    rato: "10",
    ratazana: "20",
    ratazana_plus: "Ilimitado",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Contas Meta Ads",
    gratuito: "1",
    rato: "3",
    ratazana: "7",
    ratazana_plus: "Ilimitado",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Contas Taboola",
    gratuito: "1",
    rato: "2",
    ratazana: "5",
    ratazana_plus: "Ilimitado",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Contas NewsBreak",
    gratuito: "1",
    rato: "2",
    ratazana: "5",
    ratazana_plus: "Ilimitado",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Gerenciador Integrado",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Dashboard Financeiro",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Acesso aos leads",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Analytics Avançado",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Aulas e tutoriais",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Integração com IA (MCP)",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Acesso Beta VIP à novas funcionalidades",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Acesso a todos os eventos",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Acesso às vendas com detalhes",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Acesso à todas as visitas",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-ads",
    label: "Suporte WhatsApp",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Acessos mensais",
    gratuito: "500",
    rato: "200.000",
    ratazana: "500.000",
    ratazana_plus: "1.000.000",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Domínios customizados",
    gratuito: "1",
    rato: "10",
    ratazana: "20",
    ratazana_plus: "40",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Páginas",
    gratuito: "1",
    rato: "Ilimitadas",
    ratazana: "Ilimitadas",
    ratazana_plus: "Ilimitadas",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Hospedagem Turbo",
    gratuito: "Ilimitada",
    rato: "Ilimitada",
    ratazana: "Ilimitada",
    ratazana_plus: "Ilimitada",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Construtor de página intuitivo",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Analytics Avançado",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Templates Exclusivos",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Aulas e tutoriais",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Clonador de páginas",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Integração com IA (MCP)",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Conexão com IA",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Acesso Beta VIP à novas funcionalidades",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-pgs",
    label: "Suporte WhatsApp",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-hub",
    label: "Tudo acima de Ads e Pages",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-hub",
    label: "Maior performance",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-hub",
    label: "Segurança reforçada",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-hub",
    label: "Maior economia",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-hub",
    label: "Maior taxa de rastreamento",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
  {
    type: "row",
    section: "rows-hub",
    label: "Login unificado",
    gratuito: "",
    rato: "",
    ratazana: "",
    ratazana_plus: "",
  },
];

function getCards(product: PlanType, cycle: BillingCycle): PricingCard[] {
  return PRICING_CARDS.filter(
    (c) => c.product === product && c.cycle === cycle && c.name !== "Gratuito",
  );
}

function getPlanHref(card: PricingCard) {
  return card.href || "/planos#vamos-transformar";
}

function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, x, y, strategy, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ fallbackAxisSideDirection: "end" }),
      shift({ padding: 8 }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 0, close: 100 },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={(node) => {
          refs.setReference(node);
        }}
        {...getReferenceProps()}
        className="inline-flex items-center cursor-pointer pointer-events-auto"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={() => setIsOpen(!isOpen)}
      >
        {children}
      </div>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={(node) => {
                refs.setFloating(node);
              }}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                pointerEvents: "none",
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="z-[99999] max-w-[250px] rounded-lg bg-white/10 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-md border border-white/20 text-center"
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

function LimitValue({ value }: { value: string }) {
  if (value === "✓" || value.toLowerCase() === "incluído") {
    return <Check className="h-4 w-4 text-[#FFB800]" />;
  }
  if (/^ilimit/i.test(value)) {
    return (
      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] font-semibold text-white whitespace-nowrap">
        {value}
      </span>
    );
  }
  return <span className="text-xs font-bold text-white whitespace-nowrap">{value}</span>;
}

function PricingCardComponent({
  card,
  description,
  product,
  onSubscribe,
}: {
  card: PricingCard;
  description: string;
  product: PlanType;
  onSubscribe: (planName: string, checkoutUrl: string) => void;
}) {
  const isYellow = card.badge === "MAIS ESCOLHIDO";
  const isGreen = card.badge === "MELHOR PREÇO";

  const ctaClass = isGreen
    ? "bg-[#22c55e] text-[#0d0d0d] hover:bg-[#16a34a]"
    : isYellow
      ? "bg-[#f59f0a] text-[#0d0d0d] hover:bg-[#d97706]"
      : "bg-white/[0.08] text-white hover:bg-white/[0.14]";

  const renderAdAccounts = () => {
    if (card.platforms.length === 0) return null;
    return (
      <>
        <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#666666] mt-3 mb-2">
          Contas de Anúncio
        </div>
        <div className="flex flex-col gap-1.5">
          {card.platforms.map(([name, value]) => (
            <div
              key={name}
              className="flex justify-between items-center bg-white/[0.03] rounded-lg px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                <img loading="lazy" decoding="async"
                  src={
                    name === "Google Ads"
                      ? GOOGLE_ADS_LOGO
                      : name === "Taboola"
                        ? TABOOLA_LOGO
                        : name === "NewsBreak"
                          ? NEWSBREAK_LOGO
                          : META_ADS_LOGO
                  }
                  alt={name}
                  className="w-[18px] h-[18px] object-contain rounded-[3px]"
                />
                <span className="text-xs text-[#cccccc]">{name}</span>
              </div>
              <LimitValue value={value} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderLimitRow = (label: string, value: string) => (
    <div key={label} className="flex justify-between items-center gap-2 mb-1.5">
      <span className="text-xs text-[#aaaaaa]">{label}</span>
      <LimitValue value={value} />
    </div>
  );

  // Render limits with optional subsection headers for Hub
  const renderLimits = () => {
    if (product === "hub" && card.hub_subs.length > 0) {
      // Split limits between Ratoeira Ads and Ratoeira Pages sections
      const adsLimitCount = 4;
      const adsLimits = card.limits.slice(0, adsLimitCount);
      const pagesLimits = card.limits.slice(adsLimitCount);

      return (
        <>
          <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#f59f0a] mb-1.5">
            RATOEIRA ADS
          </div>
          {adsLimits.map(([label, value]) => renderLimitRow(label, value))}
          {renderAdAccounts()}
          {card.footnote && (
            <div className="text-xs text-[#888888] mt-1.5 mb-1">
              {card.footnote}
            </div>
          )}
          <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#f59f0a] mt-2.5 mb-1.5">
            RATOEIRA PAGES
          </div>
          {pagesLimits.map(([label, value]) => renderLimitRow(label, value))}
        </>
      );
    }

    return (
      <>
        {card.limits.map(([label, value]) => renderLimitRow(label, value))}
        {renderAdAccounts()}
        {card.footnote && (
          <div className="text-xs text-[#888888] mt-1.5 mb-1">
            {card.footnote}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[20px] p-6 transition-all duration-200 h-full",
        "bg-[#111111] border",
        isYellow
          ? "border-[#f59f0a]"
          : isGreen
            ? "border-[#22c55e]"
            : "border-white/[0.08]",
      )}
    >
      {card.badge && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap",
            isYellow
              ? "bg-[#f59f0a] text-[#0d0d0d]"
              : "bg-[#22c55e] text-[#0d0d0d]",
          )}
        >
          {card.badge}
        </span>
      )}

      <div className="text-xl font-extrabold text-white mb-1">{card.name}</div>
      <div className="text-[13px] text-[#888888] mb-4 min-h-[36px]">{description}</div>

      {card.inst && (
        <div className="text-[11px] font-bold text-[#f59f0a] uppercase tracking-[0.08em] mb-0.5">
          {card.inst}
        </div>
      )}
      <div className="flex items-baseline gap-1 mb-1">
        {card.val === "0,00" ? (
          <span className="text-[32px] font-black text-white leading-none">Grátis</span>
        ) : (
          <>
            <span className="text-base text-[#aaaaaa]">R$</span>
            <span className="text-[32px] font-black text-white leading-none">{card.val}</span>
            <span className="text-[13px] text-[#888888]">{card.per}</span>
          </>
        )}
      </div>
      {card.avista && (
        <div className="text-xs text-[#666666] mb-3">{card.avista}</div>
      )}

      <div className="h-px bg-white/[0.07] my-4" />

      <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#666666] mb-2.5">
        Limites do Plano
      </div>

      {renderLimits()}

      <div className="flex-1" />

      <button
        id="btn_checkout_ratoeira"
        type="button"
        onClick={() => onSubscribe(card.name, getPlanHref(card))}
        className={cn(
          "w-full mt-4 py-3 rounded-xl text-sm font-bold text-center transition-colors",
          ctaClass,
        )}
      >
        {card.cta}
      </button>
    </div>
  );
}

function ComparisonTable() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    "rows-ads": true,
    "rows-pgs": true,
    "rows-hub": false,
  });

  const toggleSection = (target: string) => {
    setCollapsed((prev) => ({ ...prev, [target]: !prev[target] }));
  };

  const sections: { target: string; label: string }[] = [
    { target: "rows-ads", label: "Ratoeira Ads" },
    { target: "rows-pgs", label: "Ratoeira Pages" },
    { target: "rows-hub", label: "Ratoeira Hub" },
  ];

  const renderCell = (value: string) => {
    if (value === "") {
      return (
        <div className="flex justify-center">
          <Check className="h-[18px] w-[18px] text-[#FFB800]" strokeWidth={2.5} />
        </div>
      );
    }
    if (/^ilimit/i.test(value)) {
      return (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] font-semibold text-white whitespace-nowrap">
          {value}
        </span>
      );
    }
    return <span className="text-[13px] text-neutral-300">{value}</span>;
  };

  return (
    <div className="max-md:overflow-auto max-md:max-h-[70vh] rounded-lg">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-[13px] compare-table">
        <colgroup>
          <col className="w-[35%]" />
          <col className="w-[21.67%]" />
          <col className="w-[21.67%]" />
          <col className="w-[21.67%]" />
        </colgroup>
        <thead className="sticky top-0 md:top-16 z-10">
          <tr>
            <th className="bg-[#0d0d0d] text-[#aaaaaa] text-xs font-bold uppercase tracking-[0.06em] text-left py-3 px-3.5 border-b border-white/[0.06]">
              Recursos
            </th>
            <th className="bg-[#0d0d0d] text-[#aaaaaa] text-xs font-bold uppercase tracking-[0.06em] text-center py-3 px-3.5 border-b border-white/[0.06]">
              Rato
            </th>
            <th className="bg-[#0d0d0d] text-[#aaaaaa] text-xs font-bold uppercase tracking-[0.06em] text-center py-3 px-3.5 border-b border-white/[0.06]">
              Ratazana
            </th>
            <th className="bg-[#0d0d0d] text-[#f59f0a] text-xs font-bold uppercase tracking-[0.06em] text-center py-3 px-3.5 border-b border-white/[0.06]">
              <span className="block text-[10px] text-[#22c55e] font-bold uppercase tracking-[0.08em] mb-0.5">
                Recomendado
              </span>
              Ratazana Plus
            </th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => {
            const sectionRows = COMPARE_ROWS.filter(
              (r): r is Extract<CompareRow, { type: "row" }> =>
                r.type === "row" && r.section === section.target,
            );
            const isCollapsed = collapsed[section.target];

            return (
              <Fragment key={section.target}>
                <tr
                  className="cursor-pointer"
                  onClick={() => toggleSection(section.target)}
                >
                  <td colSpan={4} className="p-0 border-b border-white/[0.06]">
                    <div className="flex justify-between items-center bg-white/[0.04] rounded-lg mx-0 my-1 py-2.5 px-3.5">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                        {section.label}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f59f0a] px-3 py-1 text-xs font-bold text-[#0d0d0d]">
                        <span>{isCollapsed ? "Expandir" : "Fechar"}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200 text-[#d97706]",
                            isCollapsed ? "-rotate-90" : "",
                          )}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
                {!isCollapsed &&
                  sectionRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={cn(
                        "transition-colors hover:bg-white/[0.02]",
                        i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent",
                      )}
                    >
                      <td className="py-3 px-3.5 text-left text-[13px] font-medium text-[#cccccc] border-b border-white/[0.06]">
                        {row.label === "Gerenciador Integrado" ? (
                          <span className="inline-flex items-center gap-1.5">
                            {row.label}
                            <img loading="lazy" decoding="async"
                              src={GOOGLE_ADS_LOGO}
                              alt="Google Ads"
                              className="w-[18px] h-[18px] object-contain rounded-[3px] inline-block"
                            />
                          </span>
                        ) : (
                          row.label
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-center border-b border-white/[0.06]">
                        {renderCell(row.rato)}
                      </td>
                      <td className="py-3 px-3.5 text-center border-b border-white/[0.06]">
                        {renderCell(row.ratazana)}
                      </td>
                      <td className="py-3 px-3.5 text-center border-b border-white/[0.06]">
                        {renderCell(row.ratazana_plus)}
                      </td>
                    </tr>
                  ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState<PlanType>("hub");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; checkoutUrl: string } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const cards = getCards(activeTab, billingCycle);
  const descriptions = DESCRIPTIONS[activeTab][billingCycle];

  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.children[0]?.getBoundingClientRect().width ?? 1;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveSlide(Math.min(Math.max(index, 0), cards.length - 1));
  }, [cards.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset active slide when tab/cycle changes
  useEffect(() => {
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [activeTab, billingCycle]);

  function handleSubscribe(planName: string, checkoutUrl: string) {
    setSelectedPlan({ name: planName, checkoutUrl });
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedPlan(null);
  }

  return (
    <section
      id="pricing-cards"
      className="scroll-mt-24 py-12 md:scroll-mt-28 md:py-16 bg-[#0d0d0d] text-white"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-8 pb-5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-[#f59f0a] text-[#0d0d0d] border-[#f59f0a]"
                    : "bg-white/[0.04] text-[#aaaaaa] border-white/[0.12] hover:border-[#f59f0a]/50 hover:bg-white/[0.08]",
                )}
              >
                <img loading="lazy" decoding="async"
                  src={tab.icon}
                  alt={tab.label}
                  className="w-5 h-5 object-contain"
                />
                {tab.label}
                {tab.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#22c55e] text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Billing cycle */}
        <div className="flex justify-center pb-6">
          <div className="inline-flex items-center gap-1 p-1 bg-white/[0.05] border border-white/[0.1] rounded-full">
            {PERIODS.map((p) => {
              const isActive = billingCycle === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setBillingCycle(p.id)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#1a1a1a] text-white"
                      : "text-[#888888] hover:text-white",
                  )}
                >
                  {p.label}
                  {p.id === "annual" && (
                    <span className="absolute -top-3 -right-1 px-2.5 py-0.5 bg-[#22c55e] text-white text-[11px] font-bold rounded-full whitespace-nowrap">
                      -20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + billingCycle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cards */}
            <div ref={carouselRef} className={cn("md:grid md:grid-cols-2 md:gap-4 pt-4 pb-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-6 scrollbar-hide", cards.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {cards.map((card, i) => (
                <div key={card.index} className="snap-center shrink-0 w-[85vw] max-w-[340px] md:w-auto md:max-w-none md:snap-align-none md:shrink md:flex-none md:h-full">
                  <PricingCardComponent
                    card={card}
                    description={descriptions[i]}
                    product={activeTab}
                    onSubscribe={handleSubscribe}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <p className="text-center text-xs text-[#FFB800] pb-4 md:pb-10 px-6">
          * Renovação automática – Ao prosseguir você concorda que a assinatura
          será renovada automaticamente.
        </p>

        {/* Mobile slide indicators */}
        <div className="flex justify-center gap-2 pb-10 md:hidden">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const el = carouselRef.current;
                if (!el) return;
                const child = el.children[i] as HTMLElement;
                if (child) {
                  child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }
              }}
              className={cn(
                "rounded-full transition-all duration-300",
                i === activeSlide
                  ? "w-6 h-2 bg-[#f59f0a]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <SubscriptionModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          planName={selectedPlan?.name ?? ""}
          checkoutUrl={selectedPlan?.checkoutUrl ?? ""}
        />

        {/* Comparison table */}
        <div className="pt-10 pb-16">
          <div className="text-center mb-6">
            <h2 className="text-h1 font-extrabold text-white mb-1.5">
              Compare os Planos
            </h2>
            <p className="text-sm text-[#888888]">
              Encontre a configuração ideal para sua operação
            </p>
          </div>
          <ComparisonTable />
        </div>
      </div>
    </section>
  );
}
