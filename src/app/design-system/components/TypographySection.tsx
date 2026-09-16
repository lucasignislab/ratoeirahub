"use client";

import { motion } from "motion/react";

interface TypographySpecProps {
  label: string;
  token: string;
  className: string;
  example: string;
}

function TypographySpec({ label, token, className, example }: TypographySpecProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-8 bg-surface-subdued rounded-card border border-border-default grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
    >
      {/* Coluna da Esquerda: Metainformações */}
      <div className="space-y-2">
        <span className="text-small text-text-secondary block">{label}</span>
        <code className="text-[11px] font-mono text-brand-secondary bg-orange-50 px-2 py-1 rounded border border-orange-100 block w-fit">
          .{token}
        </code>
      </div>

      {/* Coluna da Direita: Exemplo Real */}
      <div className="md:col-span-2">
        <p className={className}>{example}</p>
      </div>
    </motion.div>
  );
}

interface TypographyGroupProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function TypographyGroup({ title, description, children }: TypographyGroupProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-h3 text-text-primary mb-2">{title}</h3>
        <p className="text-body text-text-secondary">{description}</p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export default function TypographySection() {
  return (
    <section id="tipografia" className="space-y-12">
      <div>
        <h2 className="text-h1 text-text-primary mb-4">
          Tipografia
        </h2>
        <p className="text-body text-text-secondary max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] ">
          Sistema tipográfico modular baseado na família Inter. Escala com proporção ~1.25x entre níveis, line-height e letter-spacing consistentes para cada função.
        </p>
      </div>

      <TypographyGroup
        title="Display & Headings"
        description="Estilos de grande escala para títulos de impacto e hierarquia de seções."
      >
        <TypographySpec
          label="Display (48px desktop)"
          token="text-display"
          className="text-display text-text-primary"
          example="Escalar no Tráfego"
        />
        <TypographySpec
          label="Heading 1 (42px desktop)"
          token="text-h1"
          className="text-h1 text-text-primary"
          example="Nossa Trajetória"
        />
        <TypographySpec
          label="Heading 2"
          token="text-h2"
          className="text-h2 text-text-primary"
          example="Integração Nativa"
        />
        <TypographySpec
          label="Heading 3"
          token="text-h3"
          className="text-h3 text-text-primary"
          example="Missão, Visão e Valores"
        />
        <TypographySpec
          label="Heading 4"
          token="text-h4"
          className="text-h4 text-text-primary"
          example="Detalhes da Oferta"
        />
      </TypographyGroup>

      <TypographyGroup
        title="Body, Labels & Code"
        description="Estilos para leitura contínua, descrições, elementos de interface e código."
      >
        <TypographySpec
          label="Body Large"
          token="text-body-lg"
          className="text-body-lg text-text-secondary"
          example="Rastreamento cirúrgico e páginas de alta conversão em um único lugar. Pare de perder dinheiro."
        />
        <TypographySpec
          label="Body"
          token="text-body"
          className="text-body text-text-secondary"
          example="Texto descritivo padrão para parágrafos e descrições de seções que exigem leitura clara."
        />
        <TypographySpec
          label="Small"
          token="text-small"
          className="text-small text-text-primary"
          example="Nome Completo / E-mail de Trabalho"
        />
        <TypographySpec
          label="Code"
          token="text-code"
          className="text-code text-text-primary"
          example="npm install ratoeira"
        />
      </TypographyGroup>
    </section>
  );
}
