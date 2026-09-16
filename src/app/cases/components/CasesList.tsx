"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

const caseStudies = [
  {
    id: "operacao-alpha",
    name: "Operação Alpha",
    role: "Infoprodutores",
    photo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Como a Operação Alpha reduziu em 40% os cliques fraudulentos no Google Ads usando o Ratoeira Ads, dobrando o ROI em menos de 60 dias.",
    results: ["+110% ROI", "-40% Fraudes", "R$ 50k salvos/mês"],
  },
  {
    id: "agencia-vortex",
    name: "Agência Vortex",
    role: "Gestão de Tráfego",
    photo: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "Migração completa para o Ratoeira Pages: aumento de 3x na velocidade de carregamento das landing pages e +25% na taxa de conversão direta.",
    results: ["3x Mais Rápido", "+25% Conversão", "15 Clientes Migrados"],
  },
  {
    id: "metodo-escala",
    name: "Método Escala",
    role: "Anunciante Top Player",
    photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    summary: "A união do Ratoeira Ads com o Pages permitiu ao Método Escala trackear 100% das vendas server-side e automatizar a criação de funis de alta performance.",
    results: ["~100% Tracking", "Setup em 1 Clique", "Múltiplos 7 Dígitos"],
  },
];

export default function CasesList() {
  const { t } = useLanguage();

  const translatedCases = useMemo(() => caseStudies.map(c => ({
    ...c,
    translatedRole: t(`cases.list.role.${c.id}`) || c.role,
    translatedSummary: t(`cases.list.summary.${c.id}`) || c.summary,
  })), [t]);

  return (
    <section className="py-16 md:py-24 bg-[#050505] relative">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
        
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="text-h1 font-black text-white mb-4">
            {t("cases.list.title")} <span className="text-brand-primary">{t("cases.list.titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            {t("cases.list.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {translatedCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col bg-[#111111] rounded-[32px] overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-colors duration-500"
            >
              {/* Imagem (Estilo Apple: Borda a borda no topo) */}
              <div className="relative h-[240px] w-full overflow-hidden bg-[#161616]">
                <img loading="lazy" decoding="async" 
                  src={caseStudy.photo} 
                  alt={caseStudy.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                
                {/* Nome e Role sobre a imagem */}
                <div className="absolute bottom-6 left-8">
                  <p className="text-white font-black text-xl sm:text-2xl">{caseStudy.name}</p>
                  <p className="text-brand-primary font-semibold text-sm">{caseStudy.translatedRole}</p>
                </div>
              </div>

              {/* Conteúdo Textual */}
              <div className="flex flex-col flex-1 p-8 pt-4">
                <p className="text-gray-400 text-sm leading-relaxed mb-6 md:mb-8 flex-1">
                  {caseStudy.translatedSummary}
                </p>

                {/* Micro Resultados */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {caseStudy.results.map((res, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300">
                      {res}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/cases/${caseStudy.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-brand-primary hover:text-black text-white font-bold rounded-2xl transition-all duration-300 group/btn"
                >
                  {t("cases.list.cta")}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
