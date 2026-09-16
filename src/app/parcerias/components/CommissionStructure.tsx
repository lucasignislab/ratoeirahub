"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";

type Tier = {
  name: string;
  comission: string;
  perks: string[];
  note?: string;
  req?: string;
};

const CommissionStructure = () => {
  const { t } = useLanguage();

  const tiers: Tier[] = useMemo(() => [
    {
      name: t("parcerias.commission.tier1.name"),
      comission: t("parcerias.commission.tier1.comission"),
      perks: [t("parcerias.commission.tier1.perks1")],
      note: t("parcerias.commission.tier1.note"),
    },
    {
      name: t("parcerias.commission.tier2.name"),
      comission: t("parcerias.commission.tier2.comission"),
      perks: [t("parcerias.commission.tier2.perks1"), t("parcerias.commission.tier2.perks2"), t("parcerias.commission.tier2.perks3")],
    },
    {
      name: t("parcerias.commission.tier3.name"),
      comission: t("parcerias.commission.tier3.comission"),
      perks: [t("parcerias.commission.tier3.perks1"), t("parcerias.commission.tier3.perks2"), t("parcerias.commission.tier3.perks3"), t("parcerias.commission.tier3.perks4")],
    },
  ], [t]);

  return (
    <section className="py-16 md:py-24 bg-[#050505]">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] 5xl:max-w-[140rem] 6xl:max-w-[160rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20 5xl:px-28 6xl:px-36">
        <div className="text-center mb-16">
          <h2 className="text-h1 font-black text-white mb-4 tracking-tight ">
            {t("parcerias.commission.title")} <span className="text-brand-primary">{t("parcerias.commission.titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] mx-auto px-4 sm:px-0 ">
            {t("parcerias.commission.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl 2xl:max-w-[90rem] 4xl:max-w-[100rem] mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col rounded-3xl p-8 border bg-[#111111] border-white/10"
            >
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                {tier.req && <p className="text-gray-500 text-sm">{tier.req}</p>}
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl sm:text-5xl font-black text-white mb-2">{tier.comission}</div>
                <p className="text-brand-primary font-bold text-sm uppercase tracking-widest">{t("parcerias.commission.recorrente")}</p>
              </div>

              <ul className="space-y-4 flex-1">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
              {tier.note && (
                <p className="mt-4 text-xs text-gray-500 text-center italic">{tier.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommissionStructure;
