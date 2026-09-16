"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle, Zap, ArrowRight, Info } from "lucide-react";


const plans = [
  {
    name: "Starter",
    description: "Ideal para pequenas equipes começando",
    monthlyPrice: 97,
    yearlyPrice: 77,
    color: "gray",
    features: [
      "Até 2 agentes",
      "WhatsApp + Instagram",
      "500 conversas/mês",
      "Chatbot básico",
      "Relatórios simples",
      "Suporte via e-mail",
    ],
    missing: ["IA generativa", "CRM integrado", "API avançada"],
    cta: "Assinar Agora",
    popular: false,
  },
  {
    name: "Professional",
    description: "Para times que querem crescer rápido",
    monthlyPrice: 247,
    yearlyPrice: 197,
    color: "yellow",
    features: [
      "Até 10 agentes",
      "Todos os canais",
      "5.000 conversas/mês",
      "IA generativa inclusa",
      "CRM integrado",
      "Automações avançadas",
      "API completa",
      "Suporte via chat",
    ],
    missing: [],
    cta: "Escolher Professional",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Para empresas com demanda escalável",
    monthlyPrice: 597,
    yearlyPrice: 477,
    color: "slate",
    features: [
      "Agentes ilimitados",
      "Todos os canais + custom",
      "Conversas ilimitadas",
      "IA customizável",
      "SLA dedicado",
      "Segurança enterprise",
      "Treinamento da equipe",
      "CSM exclusivo",
    ],
    missing: [],
    cta: "Falar com vendas",
    popular: false,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [yearly, setYearly] = useState(false);
  const getPlanHref = (cta: string) =>
    cta.toLowerCase() === "assinar agora" ? "/planos#pricing-cards" : "/planos#vamos-transformar";

  return (
    <section ref={ref} className="py-16 md:py-28 bg-gray-50/50" id="planos">
      <div className="max-w-7xl 3xl:max-w-[100rem] 4xl:max-w-[110rem] 5xl:max-w-[120rem] 6xl:max-w-[132rem] mx-auto px-4 sm:px-6 lg:px-12 3xl:px-16 4xl:px-24 5xl:px-32 6xl:px-40">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 lg:mb-10 space-y-3 lg:space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-orange-700 text-sm font-semibold">
            💰 Preços
          </div>
          <h2 className="text-h1 font-black text-gray-900 leading-tight max-w-4xl mx-auto">
            Simples, transparente,{" "}
            <span className="gradient-text">sem surpresas</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-xl 3xl:text-[1.75rem] max-w-xl 2xl:max-w-[34rem] 3xl:max-w-[44rem] 4xl:max-w-[52rem] 5xl:max-w-[58rem] 6xl:max-w-[64rem] mx-auto ">
            Comece gratuitamente. Escale conforme seus resultados.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-4 lg:mt-6">
            <span className={`text-sm font-medium ${!yearly ? "text-gray-900" : "text-gray-400"}`}>
              Mensal
            </span>
            <button
              onClick={() => setYearly((y) => !y)}
              id="billing-toggle"
              className={`relative w-14 h-7 md:w-12 md:h-6 rounded-button border-2 transition-all duration-300 ${
                yearly ? "bg-yellow-500 border-yellow-500" : "bg-gray-200 border-gray-200"
              }`}
            >
              <div
                className={`absolute top-0.5 md:top-0.5 w-5 h-5 md:w-4 md:h-4 rounded-full bg-white shadow transition-all duration-300 ${
                  yearly ? "left-7 md:left-6" : "left-0.5"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${yearly ? "text-gray-900" : "text-gray-400"}`}>
                Anual
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                -20%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 2xl:gap-10 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex flex-col rounded-3xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-yellow-500 border-yellow-400 shadow-2xl shadow-yellow-500/30 lg:scale-[1.02] z-10"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-400/30">
                    <Zap className="w-3 h-3" /> Mais Popular
                  </div>
                </div>
              )}

              <div className="p-8 2xl:p-9 flex-1 flex flex-col">
                {/* Plan info */}
                <div className="mb-8">
                  <h3 className={`text-xl md:text-xl 2xl:text-[1.75rem] font-black mb-1 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm 2xl:text-base ${plan.popular ? "text-yellow-200" : "text-gray-500"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-2">
                    <span className={`text-3xl sm:text-5xl 2xl:text-6xl font-black tabular-nums ${plan.popular ? "text-white" : "text-gray-900"}`}>
                      R${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className={`text-sm mb-2 ${plan.popular ? "text-yellow-200" : "text-gray-400"}`}>/mês</span>
                  </div>
                  {yearly && (
                    <p className={`text-xs mt-1 ${plan.popular ? "text-yellow-200" : "text-gray-500"}`}>
                      Cobrado anualmente • Economize{" "}
                      <span className="font-bold">R${(plan.monthlyPrice - plan.yearlyPrice) * 12}/ano</span>
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="flex-1 space-y-3 2xl:space-y-0 2xl:grid 2xl:grid-cols-2 2xl:gap-x-4 2xl:gap-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? "text-yellow-300" : "text-emerald-500"}`} />
                      <span className={`text-sm 2xl:text-lg ${plan.popular ? "text-gray-400" : "text-gray-600"}`}>{feat}</span>
                    </div>
                  ))}
                  {plan.missing.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 opacity-40">
                      <div className={`w-4 h-4 flex-shrink-0 mt-0.5 rounded-full border-2 ${plan.popular ? "border-yellow-300" : "border-gray-300"}`} />
                      <span className={`text-sm 2xl:text-lg line-through ${plan.popular ? "text-yellow-200" : "text-gray-400"}`}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={getPlanHref(plan.cta)}
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 min-h-12 rounded-button font-bold text-sm transition-all duration-200 group ${
                    plan.popular
                      ? "bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
                      : "bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg shadow-yellow-500/20"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mt-10 text-sm text-gray-500"
        >
          <Info className="w-4 h-4" />
          <span>Dúvidas? <a href="#" className="text-yellow-500 font-semibold hover:underline">Fale com nosso time</a> ou veja nossas <a href="#" className="text-yellow-500 font-semibold hover:underline">perguntas frequentes</a>.</span>
        </motion.div>
      </div>
    </section>
  );
}
