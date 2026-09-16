"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Check,
  Palette,
  Type,
  Move,
  Box,
  Layers,
  Component,
  CheckCircle2,
  XCircle,
  Sparkles,
  Monitor,
  Smartphone,
  Code2,
  Terminal,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
type ColorFormat = "hex" | "rgb" | "hsl";

type ColorItem = {
  step: string;
  hex: string;
  name?: string;
};

type ColorScale = {
  title: string;
  family: string;
  description: string;
  colors: ColorItem[];
};

type TypeToken = {
  name: string;
  token: string;
  className: string;
  mobile: { size: string; lineHeight: string; weight: string; letterSpacing?: string };
  desktop: { size: string; lineHeight: string; weight: string; letterSpacing?: string };
  usage: string;
  example: string;
};

type SpacingToken = {
  token: string;
  px: string;
  rem: string;
  usage: string;
};

type ShadowToken = {
  name: string;
  token: string;
  usage: string;
};

type RadiusToken = {
  name: string;
  token: string;
  value: string;
  usage: string;
};

type UsageRule = {
  title: string;
  do: string;
  dont: string;
};

// ============================================================
// DATA
// ============================================================
const colorScales: ColorScale[] = [
  {
    title: "Brand Gold",
    family: "gold",
    description: "Cor primária de marca. Use para CTAs, destaques e estados de foco.",
    colors: [
      { step: "50", hex: "#FFF8E6" },
      { step: "100", hex: "#FFEEB8" },
      { step: "200", hex: "#FFE08A" },
      { step: "300", hex: "#FFD15C" },
      { step: "400", hex: "#FFC22E" },
      { step: "500", hex: "#FFB800" },
      { step: "600", hex: "#E6A600" },
      { step: "700", hex: "#CC9200" },
      { step: "800", hex: "#B37E00" },
      { step: "900", hex: "#996A00" },
      { step: "950", hex: "#4D3500" },
    ],
  },
  {
    title: "Brand Orange",
    family: "orange",
    description: "Cor secundária. Use para ações complementares, badges e estados ativos.",
    colors: [
      { step: "50", hex: "#FFF5F2" },
      { step: "100", hex: "#FFEBE5" },
      { step: "200", hex: "#FFD1C2" },
      { step: "300", hex: "#FFA385" },
      { step: "400", hex: "#FF8C66" },
      { step: "500", hex: "#FF7E4A" },
      { step: "600", hex: "#E67142" },
      { step: "700", hex: "#CC653B" },
      { step: "800", hex: "#B35833" },
      { step: "900", hex: "#994A2B" },
      { step: "950", hex: "#4D2515" },
    ],
  },
  {
    title: "Neutral Scale",
    family: "gray",
    description: "Escala de cinzas para textos, superfícies, bordas e hierarquia visual.",
    colors: [
      { step: "50", hex: "#F9FAFB" },
      { step: "100", hex: "#F3F4F6" },
      { step: "200", hex: "#E5E7EB" },
      { step: "300", hex: "#D1D5DB" },
      { step: "400", hex: "#9CA3AF" },
      { step: "500", hex: "#6B7280" },
      { step: "600", hex: "#4B5563" },
      { step: "700", hex: "#374151" },
      { step: "800", hex: "#1F2937" },
      { step: "900", hex: "#111827" },
      { step: "950", hex: "#0A0A0A" },
    ],
  },
];

const semanticColors = [
  { name: "Brand Primary", token: "--color-brand-primary", hex: "#FFB800", usage: "Botões primários, links principais, destaques de marca" },
  { name: "Brand Primary Hover", token: "--color-brand-primary-hover", hex: "#E6A600", usage: "Estado hover de elementos primários" },
  { name: "Brand Secondary", token: "--color-brand-secondary", hex: "#FF7E4A", usage: "Ações secundárias, badges, indicadores ativos" },
  { name: "Surface Default", token: "--color-surface-default", hex: "#FFFFFF", usage: "Fundo principal de cards e páginas" },
  { name: "Surface Subdued", token: "--color-surface-subdued", hex: "#F9FAFB", usage: "Fundo de seções alternadas e inputs" },
  { name: "Text Primary", token: "--color-text-primary", hex: "#0A0A0A", usage: "Títulos e textos de alta ênfase" },
  { name: "Text Secondary", token: "--color-text-secondary", hex: "#6B7280", usage: "Descrições e textos de média ênfase" },
  { name: "Text Muted", token: "--color-text-muted", hex: "#9CA3AF", usage: "Placeholders, labels secundários, metadados" },
  { name: "Border Default", token: "--color-border-default", hex: "#E5E7EB", usage: "Bordas de inputs, cards e divisores" },
  { name: "Border Subdued", token: "--color-border-subdued", hex: "#F3F4F6", usage: "Bordas sutis e estados inativos" },
  { name: "Success", token: "--color-feedback-success", hex: "#10B981", usage: "Mensagens de sucesso, estados positivos" },
  { name: "Error", token: "--color-feedback-error", hex: "#EF4444", usage: "Erros de validação, estados críticos" },
];

const typeTokens: TypeToken[] = [
  {
    name: "Display",
    token: "text-display",
    className: "text-display",
    mobile: { size: "32px / 2rem", lineHeight: "1.15", weight: "900 Black", letterSpacing: "-0.02em" },
    desktop: { size: "48px / 3rem", lineHeight: "1.15", weight: "900 Black", letterSpacing: "-0.02em" },
    usage: "Título principal de hero sections. Máximo impacto visual.",
    example: "Escalar no Tráfego",
  },
  {
    name: "Heading 1",
    token: "text-h1",
    className: "text-h1",
    mobile: { size: "28px / 1.75rem", lineHeight: "1.15", weight: "700 Bold", letterSpacing: "-0.02em" },
    desktop: { size: "42px / 2.625rem", lineHeight: "1.15", weight: "700 Bold", letterSpacing: "-0.02em" },
    usage: "Títulos das demais seções de cada página.",
    example: "Nossa Trajetória",
  },
  {
    name: "Heading 2",
    token: "text-h2",
    className: "text-h2",
    mobile: { size: "25px / 1.5625rem", lineHeight: "1.15", weight: "700 Bold", letterSpacing: "-0.02em" },
    desktop: { size: "32px / 2rem", lineHeight: "1.15", weight: "700 Bold", letterSpacing: "-0.02em" },
    usage: "Títulos de seção e headings de página.",
    example: "Integração Nativa",
  },
  {
    name: "Heading 3",
    token: "text-h3",
    className: "text-h3",
    mobile: { size: "20px / 1.25rem", lineHeight: "1.15", weight: "600 SemiBold", letterSpacing: "-0.02em" },
    desktop: { size: "25px / 1.5625rem", lineHeight: "1.15", weight: "600 SemiBold", letterSpacing: "-0.02em" },
    usage: "Subtítulos, títulos de cards e blocos de conteúdo.",
    example: "Missão, Visão e Valores",
  },
  {
    name: "Heading 4",
    token: "text-h4",
    className: "text-h4",
    mobile: { size: "16px / 1rem", lineHeight: "1.15", weight: "600 SemiBold", letterSpacing: "-0.02em" },
    desktop: { size: "20px / 1.25rem", lineHeight: "1.15", weight: "600 SemiBold", letterSpacing: "-0.02em" },
    usage: "Labels de destaque e títulos menores.",
    example: "Detalhes da Oferta",
  },
  {
    name: "Body Large",
    token: "text-body-lg",
    className: "text-body-lg",
    mobile: { size: "18px / 1.125rem", lineHeight: "1.6", weight: "400 Regular" },
    desktop: { size: "18px / 1.125rem", lineHeight: "1.6", weight: "400 Regular" },
    usage: "Parágrafos descritivos e textos de leitura contínua.",
    example: "Rastreamento cirúrgico e páginas de alta conversão em um único lugar.",
  },
  {
    name: "Body",
    token: "text-body",
    className: "text-body",
    mobile: { size: "16px / 1rem", lineHeight: "1.6", weight: "400 Regular" },
    desktop: { size: "16px / 1rem", lineHeight: "1.6", weight: "400 Regular" },
    usage: "Texto padrão de interface e conteúdo geral.",
    example: "Texto descritivo padrão para parágrafos e descrições.",
  },
  {
    name: "Small",
    token: "text-small",
    className: "text-small",
    mobile: { size: "13px / 0.8125rem", lineHeight: "1.6", weight: "400 Regular" },
    desktop: { size: "13px / 0.8125rem", lineHeight: "1.6", weight: "400 Regular" },
    usage: "Legendas, metadados e textos auxiliares.",
    example: "Atualizado em 30 de junho de 2026",
  },
  {
    name: "Code",
    token: "text-code",
    className: "text-code",
    mobile: { size: "14px / 0.875rem", lineHeight: "1.6", weight: "400 Regular" },
    desktop: { size: "14px / 0.875rem", lineHeight: "1.6", weight: "400 Regular" },
    usage: "Código inline, snippets e elementos técnicos.",
    example: "npm install ratoeira",
  },
];

const spacingTokens: SpacingToken[] = [
  { token: "space-1", px: "4px", rem: "0.25rem", usage: "Micro ajustes, ícones pequenos" },
  { token: "space-2", px: "8px", rem: "0.5rem", usage: "Gap entre elementos relacionados" },
  { token: "space-3", px: "12px", rem: "0.75rem", usage: "Padding interno compacto" },
  { token: "space-4", px: "16px", rem: "1rem", usage: "Espaçamento base entre componentes" },
  { token: "space-6", px: "24px", rem: "1.5rem", usage: "Padding de cards e seções internas" },
  { token: "space-8", px: "32px", rem: "2rem", usage: "Padding de cards grandes e gaps de grid" },
  { token: "space-12", px: "48px", rem: "3rem", usage: "Espaçamento entre seções" },
  { token: "space-16", px: "64px", rem: "4rem", usage: "Espaçamento entre seções principais" },
  { token: "space-20", px: "80px", rem: "5rem", usage: "Espaçamento de hero sections" },
  { token: "space-24", px: "96px", rem: "6rem", usage: "Espaçamento máximo entre seções" },
];

const shadowTokens: ShadowToken[] = [
  { name: "Card Resting", token: "--shadow-card-resting", usage: "Estado padrão de cards e superfícies elevadas" },
  { name: "Card Hover", token: "--shadow-card-hover", usage: "Estado hover de cards interativos" },
  { name: "Button Primary", token: "--shadow-btn-primary", usage: "Botão primário em estado default" },
  { name: "Button Primary Hover", token: "--shadow-btn-primary-hover", usage: "Botão primário em hover" },
];

const radiusTokens: RadiusToken[] = [
  { name: "Input", token: "--radius-input", value: "12px", usage: "Inputs, selects, campos de formulário" },
  { name: "Button", token: "--radius-button", value: "16px", usage: "Botões e CTAs" },
  { name: "Card", token: "--radius-card", value: "24px", usage: "Cards, modais e painéis" },
  { name: "Badge", token: "--radius-badge", value: "9999px", usage: "Badges, pills, tags" },
];

const usageRules: UsageRule[] = [
  {
    title: "Contraste de Texto",
    do: "Use texto escuro (#0A0A0A) sobre fundos claros e texto claro sobre superfícies escuras.",
    dont: "Nunca use texto cinza médio (#9CA3AF) sobre fundos claros para conteúdo de leitura.",
  },
  {
    title: "Uso da Cor Primária",
    do: "Reserve o Brand Gold (#FFB800) para CTAs principais, links e momentos de destaque.",
    dont: "Não use o Brand Gold para textos grandes de leitura contínua.",
  },
  {
    title: "Hierarquia Tipográfica",
    do: "Mantenha no máximo 3 tamanhos de título por página para clareza visual.",
    dont: "Não misture múltiplos pesos e tamanhos aleatoriamente na mesma seção.",
  },
  {
    title: "Espaçamento Consistente",
    do: "Use múltiplos de 4px e 8px para manter ritmo visual harmonioso.",
    dont: "Evite espaçamentos arbitrários como 7px, 13px ou 19px.",
  },
];

const navItems = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "colors", label: "Cores", icon: Palette },
  { id: "typography", label: "Tipografia", icon: Type },
  { id: "spacing", label: "Espaçamento", icon: Move },
  { id: "shadows", label: "Sombras", icon: Box },
  { id: "radius", label: "Radius", icon: Layers },
  { id: "components", label: "Componentes", icon: Component },
  { id: "usage", label: "Uso", icon: CheckCircle2 },
];

// ============================================================
// UTILS
// ============================================================
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function getContrastColor(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#0A0A0A" : "#FFFFFF";
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const handle = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(id);
      });
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(handle(id), { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [ids]);

  return active;
}

// ============================================================
// COMPONENTS
// ============================================================
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="space-y-4 mb-10"
    >
      <span className="inline-flex items-center gap-2 text-body-badge uppercase tracking-widest text-brand-secondary font-bold">
        <span className="w-6 h-px bg-brand-secondary" />
        {eyebrow}
      </span>
      <h2 className="text-h1 text-text-primary">{title}</h2>
      <p className="text-body-description text-text-secondary max-w-3xl">{description}</p>
    </motion.div>
  );
}

function CopyBadge({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-subdued border border-border-default text-[10px] font-mono text-text-secondary hover:border-brand-secondary hover:text-text-primary transition-colors"
      title="Clique para copiar"
    >
      {copied ? <Check className="w-3 h-3 text-feedback-success" /> : <Copy className="w-3 h-3" />}
      {label || value}
    </button>
  );
}

function ColorSwatch({ color, family }: { color: ColorItem; family: string }) {
  const [copied, setCopied] = useState(false);
  const contrast = getContrastColor(color.hex);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <button
        onClick={handleCopy}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 rounded-xl"
        aria-label={`Copiar cor ${color.hex}`}
      >
        <motion.div
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative h-24 w-full rounded-xl border border-border-subdued shadow-sm overflow-hidden"
          style={{ backgroundColor: color.hex }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: contrast === "#FFFFFF" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)" }}
          >
            {copied ? (
              <Check className="w-6 h-6" style={{ color: contrast }} />
            ) : (
              <Copy className="w-5 h-5" style={{ color: contrast }} />
            )}
          </div>
        </motion.div>
      </button>

      <div className="mt-3 space-y-1">
        <span className="block text-[11px] font-medium text-text-primary truncate text-center">{family}-{color.step}</span>
        <CopyBadge value={color.hex} />
      </div>
    </motion.div>
  );
}

function SemanticColorCard({ item }: { item: typeof semanticColors[0] }) {
  const [copied, setCopied] = useState(false);
  const contrast = getContrastColor(item.hex);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-border-default bg-surface-default overflow-hidden shadow-card-resting hover:shadow-card-hover transition-shadow"
    >
      <button onClick={handleCopy} className="w-full h-24 flex items-center justify-center relative focus:outline-none">
        <div className="absolute inset-0" style={{ backgroundColor: item.hex }} />
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs"
              style={{ color: contrast, backgroundColor: contrast === "#FFFFFF" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }}
            >
              <Check className="w-3.5 h-3.5" /> Copiado
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs"
              style={{ color: contrast, backgroundColor: contrast === "#FFFFFF" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }}
            >
              <Copy className="w-3.5 h-3.5" /> Copiar HEX
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-body-label font-semibold text-text-primary">{item.name}</span>
          <CopyBadge value={item.hex} />
        </div>
        <code className="text-[10px] font-mono text-text-muted block">{item.token}</code>
        <p className="text-[11px] text-text-secondary leading-relaxed">{item.usage}</p>
      </div>
    </motion.div>
  );
}

function TypeSpecCard({ token, index }: { token: TypeToken; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl border border-border-default bg-surface-default overflow-hidden shadow-card-resting"
    >
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-body-label font-bold text-text-primary">{token.name}</span>
            <CopyBadge value={token.token} label={`.${token.token}`} />
          </div>
          <p className={token.className + " text-text-primary"}>{token.example}</p>
          <p className="text-body-base text-text-secondary">{token.usage}</p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl bg-surface-subdued border border-border-default p-4 space-y-3">
            <div className="flex items-center gap-2 text-body-label text-brand-secondary font-bold">
              <Smartphone className="w-4 h-4" /> Mobile
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-text-secondary">
              <div className="space-y-1">
                <span className="text-text-muted block">Size</span>
                <span className="text-text-primary">{token.mobile.size}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block">Line</span>
                <span className="text-text-primary">{token.mobile.lineHeight}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block">Weight</span>
                <span className="text-text-primary">{token.mobile.weight}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface-subdued border border-border-default p-4 space-y-3">
            <div className="flex items-center gap-2 text-body-label text-brand-secondary font-bold">
              <Monitor className="w-4 h-4" /> Desktop
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-text-secondary">
              <div className="space-y-1">
                <span className="text-text-muted block">Size</span>
                <span className="text-text-primary">{token.desktop.size}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block">Line</span>
                <span className="text-text-primary">{token.desktop.lineHeight}</span>
              </div>
              <div className="space-y-1">
                <span className="text-text-muted block">Weight</span>
                <span className="text-text-primary">{token.desktop.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-8 py-3 border-t border-border-default bg-surface-subdued flex flex-wrap gap-4 text-[10px] font-mono text-text-muted">
        <span>Fonte: Inter</span>
        {token.mobile.letterSpacing && <span>Mobile Letter: {token.mobile.letterSpacing}</span>}
        {token.desktop.letterSpacing && <span>Desktop Letter: {token.desktop.letterSpacing}</span>}
      </div>
    </motion.div>
  );
}

function SpacingCard({ item, index }: { item: SpacingToken; index: number }) {
  const widthClass = index < 5 ? `w-${index + 1}` : `w-${[6, 8, 12, 16, 20, 24][index - 5]}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-xl border border-border-default bg-surface-default p-4 space-y-3"
    >
      <div className="h-12 flex items-center">
        <div className={`h-6 bg-brand-primary rounded-sm ${widthClass}`} />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-body-label font-semibold text-text-primary">{item.token}</span>
          <CopyBadge value={item.rem} label={item.rem} />
        </div>
        <p className="text-[10px] font-mono text-text-muted">
          {item.px} / {item.rem}
        </p>
        <p className="text-[11px] text-text-secondary">{item.usage}</p>
      </div>
    </motion.div>
  );
}

function ShadowCard({ shadow }: { shadow: ShadowToken }) {
  const shadowClass =
    shadow.token === "--shadow-card-resting"
      ? "shadow-card-resting"
      : shadow.token === "--shadow-card-hover"
      ? "shadow-card-hover"
      : shadow.token === "--shadow-btn-primary"
      ? "shadow-btn-primary"
      : "shadow-btn-primary-hover";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border-default bg-surface-default p-6 space-y-4"
    >
      <div className={`h-24 rounded-xl bg-surface-subdued border border-border-subdued ${shadowClass}`} />
      <div className="space-y-1">
        <span className="text-body-label font-semibold text-text-primary">{shadow.name}</span>
        <code className="text-[10px] font-mono text-text-muted block">{shadow.token}</code>
        <p className="text-[11px] text-text-secondary">{shadow.usage}</p>
      </div>
    </motion.div>
  );
}

function RadiusCard({ item }: { item: RadiusToken }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-border-default bg-surface-default p-6 space-y-4"
    >
      <div
        className="h-24 bg-brand-primary/10 border-2 border-dashed border-brand-primary flex items-center justify-center"
        style={{ borderRadius: item.value }}
      >
        <span className="text-body-label font-bold text-brand-secondary">{item.value}</span>
      </div>
      <div className="space-y-1">
        <span className="text-body-label font-semibold text-text-primary">{item.name}</span>
        <code className="text-[10px] font-mono text-text-muted block">{item.token}</code>
        <p className="text-[11px] text-text-secondary">{item.usage}</p>
      </div>
    </motion.div>
  );
}

function ComponentShowcase() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-border-default bg-surface-default p-8 space-y-6"
      >
        <div>
          <h3 className="text-heading-subtitle text-text-primary mb-2">Botão Primário</h3>
          <p className="text-body-base text-text-secondary">Altura 56px, padding-x 32px, radius 16px.</p>
        </div>
        <div className="flex items-center justify-center min-h-32 bg-surface-subdued rounded-xl">
          <button className="bg-brand-primary hover:bg-brand-primary-hover text-text-primary shadow-btn-primary hover:shadow-btn-primary-hover hover:-translate-y-0.5 rounded-button px-8 h-14 transition-all duration-200 font-bold">
            Botão Principal
          </button>
        </div>
        <pre className="bg-text-primary text-surface-default p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
          <code>{`<button className="bg-brand-primary text-text-primary shadow-btn-primary rounded-button px-8 h-14 font-bold">
  Botão Principal
</button>`}</code>
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border-default bg-surface-default p-8 space-y-6"
      >
        <div>
          <h3 className="text-heading-subtitle text-text-primary mb-2">Input de Texto</h3>
          <p className="text-body-base text-text-secondary">Altura 48px, padding-x 16px, radius 12px.</p>
        </div>
        <div className="flex items-center justify-center min-h-32 bg-surface-subdued rounded-xl px-6">
          <input
            placeholder="nome@empresa.com"
            className="w-full max-w-xs h-12 bg-surface-subdued border border-border-default rounded-input px-4 text-text-primary transition-all focus:outline-none focus:ring-2 focus:ring-border-focus/20 focus:border-border-focus"
          />
        </div>
        <pre className="bg-text-primary text-surface-default p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
          <code>{`<input className="w-full h-12 bg-surface-subdued border border-border-default rounded-input px-4 text-text-primary focus:ring-2 focus:ring-border-focus/20" />`}</code>
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border-default bg-surface-default p-8 space-y-6"
      >
        <div>
          <h3 className="text-heading-subtitle text-text-primary mb-2">Card Elevado</h3>
          <p className="text-body-base text-text-secondary">Padding 32px, radius 24px, sombra em hover.</p>
        </div>
        <div className="flex items-center justify-center min-h-32 bg-surface-subdued rounded-xl">
          <div className="bg-surface-default rounded-card shadow-card-resting hover:shadow-card-hover border border-border-subdued p-8 transition-all duration-300 w-full max-w-xs">
            <h4 className="text-heading-subtitle text-text-primary">Plano Pro</h4>
            <p className="text-body-base text-text-secondary mt-2">Acesso total às ferramentas.</p>
          </div>
        </div>
        <pre className="bg-text-primary text-surface-default p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
          <code>{`<div className="bg-surface-default rounded-card shadow-card-resting hover:shadow-card-hover border border-border-subdued p-8">
  <h4 className="text-heading-subtitle">Plano Pro</h4>
</div>`}</code>
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-border-default bg-surface-default p-8 space-y-6"
      >
        <div>
          <h3 className="text-heading-subtitle text-text-primary mb-2">Badge de Status</h3>
          <p className="text-body-base text-text-secondary">Pill radius, texto em uppercase com tracking.</p>
        </div>
        <div className="flex items-center justify-center min-h-32 bg-surface-subdued rounded-xl">
          <span className="bg-orange-50 text-brand-secondary text-body-badge px-4 py-1.5 rounded-badge font-bold border border-orange-100 uppercase tracking-widest">
            Badge Status
          </span>
        </div>
        <pre className="bg-text-primary text-surface-default p-4 rounded-xl text-[11px] font-mono overflow-x-auto">
          <code>{`<span className="bg-orange-50 text-brand-secondary text-body-badge px-4 py-1.5 rounded-badge font-bold border border-orange-100 uppercase tracking-widest">
  Badge Status
</span>`}</code>
        </pre>
      </motion.div>
    </div>
  );
}

function UsageRuleCard({ rule, index }: { rule: UsageRule; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-2xl border border-border-default bg-surface-default overflow-hidden"
    >
      <div className="p-5 border-b border-border-default">
        <h3 className="text-heading-subtitle text-text-primary">{rule.title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-5 space-y-3 bg-feedback-success/5 border-b md:border-b-0 md:border-r border-border-default">
          <div className="flex items-center gap-2 text-feedback-success font-bold text-body-label">
            <CheckCircle2 className="w-4 h-4" /> Faça
          </div>
          <p className="text-body-base text-text-secondary">{rule.do}</p>
        </div>
        <div className="p-5 space-y-3 bg-feedback-error/5">
          <div className="flex items-center gap-2 text-feedback-error font-bold text-body-label">
            <XCircle className="w-4 h-4" /> Não faça
          </div>
          <p className="text-body-base text-text-secondary">{rule.dont}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SideNavigation({ active }: { active: string }) {
  return (
    <aside className="hidden lg:block sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <div className="p-6 space-y-6 bg-surface-subdued/50 backdrop-blur-sm rounded-2xl border border-border-default">
        <div>
          <p className="text-body-label text-brand-secondary font-bold">Ratoeira Hub</p>
          <p className="text-body-badge text-text-muted font-mono mt-1">Design System v2.0</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-label transition-all ${
                  isActive
                    ? "bg-brand-primary text-text-primary font-bold shadow-btn-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-default"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section id="overview" className="relative overflow-hidden rounded-3xl bg-surface-subdued border border-border-default mb-16">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>
      <div className="relative px-8 py-16 md:px-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-secondary font-bold text-body-badge uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Documentação Visual
          </div>
          <h1 className="text-display text-text-primary text-center">
            Design System
          </h1>
          <p className="text-body-description text-text-secondary max-w-2xl">
            Sistema de design completo do Ratoeira Hub. Tokens semânticos, escalas de cor,
            tipografia responsiva, espaçamento e anatomia de componentes — tudo documentado
            e pronto para consulta de produto, design e engenharia.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#colors"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-text-primary rounded-button px-6 h-12 font-bold shadow-btn-primary hover:shadow-btn-primary-hover transition-all"
            >
              <Palette className="w-4 h-4" /> Explorar Cores
            </a>
            <a
              href="#typography"
              className="inline-flex items-center gap-2 bg-surface-default border border-border-default text-text-primary hover:bg-surface-subdued rounded-button px-6 h-12 font-bold transition-all"
            >
              <Type className="w-4 h-4" /> Ver Tipografia
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Cores", value: "30+" },
            { label: "Tokens", value: "40+" },
            { label: "Tipos", value: "7" },
            { label: "Componentes", value: "4" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-xl bg-surface-default border border-border-default p-4 text-center"
            >
              <div className="text-heading-section text-brand-secondary">{stat.value}</div>
              <div className="text-body-label text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function DesignSystem() {
  const activeSection = useActiveSection(navItems.map((i) => i.id));

  return (
    <div className="min-h-screen bg-surface-default">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <SideNavigation active={activeSection} />

          <main className="space-y-24 pb-24">
            <Hero />

            {/* COLORS */}
            <section id="colors" className="space-y-12">
              <SectionHeader
                eyebrow="Fundamento Visual"
                title="Paleta de Cores"
                description="Sistema completo de cores da marca. Clique em qualquer swatch para copiar o valor no formato desejado (HEX, RGB ou HSL)."
              />

              <div className="space-y-14">
                {colorScales.map((scale) => (
                  <div key={scale.family} className="space-y-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h3 className="text-heading-subtitle text-text-primary">{scale.title}</h3>
                        <p className="text-body-base text-text-secondary mt-1">{scale.description}</p>
                      </div>
                      <span className="text-body-badge text-text-muted font-mono">{scale.colors.length} steps</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
                      {scale.colors.map((color) => (
                        <ColorSwatch key={color.step} color={color} family={scale.family} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <h3 className="text-heading-subtitle text-text-primary">Tokens Semânticos</h3>
                <p className="text-body-base text-text-secondary">Cores funcionais aplicadas em componentes e estados de interface.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {semanticColors.map((item) => (
                    <SemanticColorCard key={item.token} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* TYPOGRAPHY */}
            <section id="typography" className="space-y-10">
              <SectionHeader
                eyebrow="Tipografia"
                title="Escala Tipográfica Modular"
                description="Sistema baseado na família Inter, com proporção ~1.25x entre níveis. Tokens unificados para heading, body e código, com line-height e letter-spacing consistentes."
              />

              <div className="rounded-2xl bg-surface-subdued border border-border-default p-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-body-label font-bold text-text-primary">
                  <Code2 className="w-4 h-4 text-brand-secondary" /> Fonte Principal:
                </div>
                <div className="flex flex-wrap gap-3">
                  <CopyBadge value="Inter" label="Inter" />
                  <CopyBadge value="var(--font-inter)" label="var(--font-inter)" />
                  <CopyBadge value="weights: 300-900" label="weights: 300-900" />
                </div>
              </div>

              <div className="space-y-6">
                {typeTokens.map((token, index) => (
                  <TypeSpecCard key={token.token} token={token} index={index} />
                ))}
              </div>
            </section>

            {/* SPACING */}
            <section id="spacing" className="space-y-10">
              <SectionHeader
                eyebrow="Espaçamento"
                title="Escala de Espaçamento"
                description="Sistema baseado em múltiplos de 4px para ritmo visual consistente entre componentes e seções."
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {spacingTokens.map((item, index) => (
                  <SpacingCard key={item.token} item={item} index={index} />
                ))}
              </div>
            </section>

            {/* SHADOWS */}
            <section id="shadows" className="space-y-10">
              <SectionHeader
                eyebrow="Elevação"
                title="Sistema de Sombras"
                description="Tokens de sombra para criar hierarquia visual e feedback de interação em componentes."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {shadowTokens.map((shadow) => (
                  <ShadowCard key={shadow.token} shadow={shadow} />
                ))}
              </div>
            </section>

            {/* RADIUS */}
            <section id="radius" className="space-y-10">
              <SectionHeader
                eyebrow="Forma"
                title="Border Radius"
                description="Escalas de arredondamento para manter consistência visual em inputs, botões, cards e badges."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {radiusTokens.map((item) => (
                  <RadiusCard key={item.token} item={item} />
                ))}
              </div>
            </section>

            {/* COMPONENTS */}
            <section id="components" className="space-y-10">
              <SectionHeader
                eyebrow="Componentes"
                title="Anatomia de Componentes"
                description="Especificações visuais e exemplos de uso dos componentes base do Ratoeira Hub."
              />
              <ComponentShowcase />
            </section>

            {/* USAGE */}
            <section id="usage" className="space-y-10">
              <SectionHeader
                eyebrow="Diretrizes"
                title="Boas Práticas"
                description="Regras de uso para manter consistência, legibilidade e hierarquia visual em todas as interfaces."
              />
              <div className="space-y-6">
                {usageRules.map((rule, index) => (
                  <UsageRuleCard key={rule.title} rule={rule} index={index} />
                ))}
              </div>
            </section>

            {/* FOOTER CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-text-primary text-surface-default p-10 md:p-16 text-center space-y-6"
            >
              <Terminal className="w-10 h-10 mx-auto text-brand-primary" />
              <h2 className="text-h1">Pronto para construir?</h2>
              <p className="text-body-description text-text-inverse/80 max-w-2xl mx-auto">
                Use os tokens e componentes documentados aqui para manter a identidade visual do Ratoeira Hub consistente em todas as páginas.
              </p>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-text-primary rounded-button px-8 h-12 font-bold shadow-btn-primary transition-all"
              >
                <Sparkles className="w-4 h-4" /> Voltar ao topo
              </a>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
