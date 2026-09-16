"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComponentDemoProps {
  titleKey: string;
  descriptionKey: string;
  code: string;
  children: React.ReactNode;
}

function ComponentDemo({ titleKey, descriptionKey, code, children }: ComponentDemoProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-heading-subtitle text-text-primary mb-2">{t(titleKey)}</h3>
          <p className="text-body-base text-text-secondary">{t(descriptionKey)}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 px-4 py-2 bg-surface-subdued border border-border-default rounded-button text-body-label text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-all"
        >
          {copied ? t("designSystem.components.copied") : t("designSystem.components.copyCode")}
        </button>
      </div>

      <div className="p-8 bg-surface-default rounded-card border border-border-default shadow-card-resting flex items-center justify-center min-h-40">
        {children}
      </div>

      <div className="relative">
        <pre className="bg-text-primary text-surface-default p-6 rounded-card text-body-base font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}

export default function ComponentsSection() {
  const { t } = useLanguage();

  return (
    <section id="componentes" className="space-y-16">
      <div>
        <h2 className="text-h1 text-text-primary mb-4">
          {t("designSystem.components.title")}
        </h2>
        <p className="text-body-base text-text-secondary max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] ">
          {t("designSystem.components.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Botão Primário com Red Lines */}
        <ComponentDemo
          titleKey="designSystem.components.buttonPrimary"
          descriptionKey="designSystem.components.buttonPrimaryDesc"
          code={`<button className="bg-brand-primary h-[56px] px-8 rounded-button font-bold text-text-primary shadow-btn-primary">
  Botão Principal
</button>`}
        >
          <div className="relative inline-block">
            {/* Padding Left Indicator */}
            <div className="absolute top-0 bottom-0 left-0 w-[32px] bg-red-500/10 border-r border-dashed border-red-500 pointer-events-none z-10 flex items-center justify-center">
              <span className="text-[9px] text-red-500 font-mono bg-white px-0.5 rounded border border-red-200">px: 32</span>
            </div>
            
            {/* Padding Right Indicator */}
            <div className="absolute top-0 bottom-0 right-0 w-[32px] bg-red-500/10 border-l border-dashed border-red-500 pointer-events-none z-10" />
            
            {/* Height Indicator */}
            <div className="absolute -right-8 top-0 bottom-0 border-r border-dashed border-red-500 flex items-center pointer-events-none">
              <div className="absolute top-0 right-0 w-1 border-t border-red-500" />
              <div className="absolute bottom-0 right-0 w-1 border-t border-red-500" />
              <span className="text-[9px] text-red-500 font-mono bg-red-50 px-1 translate-x-full whitespace-nowrap border border-red-100 rounded ml-1">
                H: 56px
              </span>
            </div>

            <button className="bg-brand-primary h-[56px] px-8 rounded-button font-bold text-text-primary shadow-btn-primary hover:shadow-btn-primary-hover hover:-translate-y-0.5 transition-all">
              Botão Principal
            </button>
          </div>
        </ComponentDemo>

        {/* Campo de Texto com Red Lines */}
        <ComponentDemo
          titleKey="designSystem.components.textField"
          descriptionKey="designSystem.components.textFieldDesc"
          code={`<div className="w-full h-[48px] bg-surface-subdued border border-border-default rounded-input px-4 flex items-center">
  <input placeholder="E-mail" className="bg-transparent outline-none w-full" />
</div>`}
        >
          <div className="w-full max-w-xs">
            <div className="relative inline-block">
              {/* Padding Left Indicator */}
              <div className="absolute top-0 bottom-0 left-0 w-[16px] bg-red-500/10 border-r border-dashed border-red-500 pointer-events-none z-10 flex items-center justify-center">
                <span className="text-[9px] text-red-500 font-mono bg-white px-0.5 rounded border border-red-200">px: 16</span>
              </div>
              
              {/* Padding Right Indicator */}
              <div className="absolute top-0 bottom-0 right-0 w-[16px] bg-red-500/10 border-l border-dashed border-red-500 pointer-events-none z-10" />
              
              {/* Height Indicator */}
              <div className="absolute -right-8 top-0 bottom-0 border-r border-dashed border-red-500 flex items-center pointer-events-none">
                <div className="absolute top-0 right-0 w-1 border-t border-red-500" />
                <div className="absolute bottom-0 right-0 w-1 border-t border-red-500" />
                <span className="text-[9px] text-red-500 font-mono bg-red-50 px-1 translate-x-full whitespace-nowrap border border-red-100 rounded ml-1">
                  H: 48px
                </span>
              </div>

              <div className="w-64 h-[48px] bg-surface-subdued border border-border-default rounded-input px-4 flex items-center">
                <span className="text-text-secondary text-body-base">{t("designSystem.components.textFieldPlaceholder")}</span>
              </div>
            </div>
          </div>
        </ComponentDemo>

        {/* Card Elevado com Red Lines */}
        <ComponentDemo
          titleKey="designSystem.components.cardElevated"
          descriptionKey="designSystem.components.cardElevatedDesc"
          code={`<div className="bg-surface-default rounded-card shadow-card-resting p-8 border border-border-subdued">
  <h3 className="text-heading-subtitle">Conteúdo do Card</h3>
</div>`}
        >
          <div className="relative inline-block">
            {/* Padding Top Indicator */}
            <div className="absolute -top-4 left-8 right-8 h-[32px] bg-red-500/10 border-b border-dashed border-red-500 pointer-events-none z-10 flex items-center justify-center">
              <span className="text-[9px] text-red-500 font-mono bg-white px-0.5 rounded border border-red-200">px: 32</span>
            </div>
            
            {/* Padding Bottom Indicator */}
            <div className="absolute -bottom-4 left-8 right-8 h-[32px] bg-red-500/10 border-t border-dashed border-red-500 pointer-events-none z-10" />
            
            {/* Padding Left Indicator */}
            <div className="absolute top-0 bottom-0 left-0 w-[32px] bg-red-500/10 border-r border-dashed border-red-500 pointer-events-none z-10" />
            
            {/* Padding Right Indicator */}
            <div className="absolute top-0 bottom-0 right-0 w-[32px] bg-red-500/10 border-l border-dashed border-red-500 pointer-events-none z-10" />
            
            {/* Radius Indicator */}
            <div className="absolute -top-4 -right-4 w-6 h-6 border border-dashed border-red-500 rounded-full pointer-events-none z-10 flex items-center justify-center">
              <span className="text-[8px] text-red-500 font-mono">24</span>
            </div>

            <div className="bg-surface-default w-64 rounded-card shadow-card-resting border border-border-subdued p-8 relative">
              <h3 className="text-heading-subtitle text-text-primary text-center">{t("designSystem.components.cardContentTitle")}</h3>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          titleKey="designSystem.components.badgeStatus"
          descriptionKey="designSystem.components.badgeStatusDesc"
          code={`<span className="bg-orange-50 text-brand-secondary text-body-badge px-3 py-1 rounded-badge font-bold border border-orange-100 uppercase tracking-widest">
  Badge
</span>`}
        >
          <span className="bg-orange-50 text-brand-secondary text-body-badge px-3 py-1 rounded-badge font-bold border border-orange-100 uppercase tracking-widest">
            {t("designSystem.components.badgeText")}
          </span>
        </ComponentDemo>
      </div>
    </section>
  );
}
