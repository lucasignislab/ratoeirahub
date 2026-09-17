"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Product = "ads" | "pages" | "hub";
type Billing = "monthly" | "semiannual" | "annual";
type Network = "google" | "meta" | "taboola" | "newsbreak" | "mgid" | "tiktok";
type CalculatorStep = "product" | "networks" | "volume" | "accounts" | "googleEmails" | "result";

const PLAN_NAMES = ["Basic", "Starter", "Scale", "Max"] as const;
const NETWORKS: { id: Network; label: string; logo: string; logoWidth?: number }[] = [
  { id: "google", label: "Google Ads", logo: "/icons/pricing/google-ads.webp" },
  { id: "meta", label: "Meta Ads", logo: "/icons/pricing/meta-ads.png" },
  { id: "taboola", label: "Taboola", logo: "/taboolalogo.png" },
  { id: "newsbreak", label: "NewsBreak", logo: "/newbreaklogo.webp" },
  { id: "mgid", label: "MGID", logo: "/logos/mgid.svg", logoWidth: 32 },
  { id: "tiktok", label: "TikTok Ads", logo: "/logos/tiktoklogo - Editado.png" },
];

const PRODUCT_LABELS: Record<Product, string> = {
  ads: "Ratoeira Ads",
  pages: "Ratoeira Pages",
  hub: "Ratoeira Hub",
};

const PRODUCT_LOGOS: Record<Product, { src: string; width: number }> = {
  ads: { src: "/logoraads2.png", width: 24 },
  pages: { src: "/logopages2.png", width: 24 },
  hub: { src: "/logo_ads_pages2.png", width: 34 },
};

const PRODUCT_DESCRIPTIONS: Record<Product, string[]> = {
  ads: [
    "Para validar as primeiras campanhas.",
    "Para anunciantes que já escalam com consistência.",
    "Para operações robustas de alto volume.",
    "Para quem não pode ter limites pela frente.",
  ],
  pages: [
    "Para testar a performance da Ratoeira Pages.",
    "Para quem precisa publicar mais páginas.",
    "Para ganhar flexibilidade de domínios.",
    "Para operações de alto tráfego.",
  ],
  hub: [
    "O combo para iniciar sua escala integrada.",
    "Flexibilidade para testar e escalar.",
    "Estrutura para não travar sua operação.",
    "O ecossistema completo, sem teto.",
  ],
};

type PriceSet = {
  monthly: number[];
  semiannual: number[];
  semiannualCash: number[];
  annual: number[];
  annualCash: number[];
};

const PRICES: Record<Product, Record<"one" | "two" | "all", PriceSet>> = {
  ads: {
    one: { monthly: [197, 297, 447, 1097], semiannual: [182, 275, 413, 1015], semiannualCash: [1037, 1567, 2357, 5787], annual: [180, 272, 409, 1005], annualCash: [1970, 2970, 4470, 10970] },
    two: { monthly: [347, 497, 797, 1497], semiannual: [321, 460, 737, 1385], semiannualCash: [1827, 2617, 4197, 7897], annual: [318, 455, 730, 1371], annualCash: [3470, 4970, 7970, 14970] },
    all: { monthly: [497, 697, 997, 1797], semiannual: [460, 645, 922, 1662], semiannualCash: [2617, 3677, 5257, 9477], annual: [455, 639, 913, 1646], annualCash: [4970, 6970, 9970, 17970] },
  },
  pages: {
    one: { monthly: [97, 117, 147, 297], semiannual: [88, 106, 141, 282], semiannualCash: [497, 597, 797, 1597], annual: [62, 82, 130, 262], annualCash: [657, 877, 1397, 2797] },
    two: { monthly: [97, 117, 147, 297], semiannual: [88, 106, 141, 282], semiannualCash: [497, 597, 797, 1597], annual: [62, 82, 130, 262], annualCash: [657, 877, 1397, 2797] },
    all: { monthly: [97, 117, 147, 297], semiannual: [88, 106, 141, 282], semiannualCash: [497, 597, 797, 1597], annual: [62, 82, 130, 262], annualCash: [657, 877, 1397, 2797] },
  },
  hub: {
    one: { monthly: [277, 397, 567, 1327], semiannual: [252, 356, 519, 1217], semiannualCash: [1457, 2057, 2997, 7017], annual: [223, 328, 499, 1176], annualCash: [2497, 3657, 5577, 13077] },
    two: { monthly: [417, 587, 897, 1707], semiannual: [384, 532, 826, 1569], semiannualCash: [2207, 3057, 4747, 9017], annual: [354, 502, 804, 1524], annualCash: [3917, 5557, 8897, 16877] },
    all: { monthly: [567, 777, 1087, 1987], semiannual: [516, 707, 1002, 1832], semiannualCash: [2957, 4057, 5747, 10517], annual: [484, 676, 978, 1785], annualCash: [5347, 7457, 10797, 19727] },
  },
};

const SALES = ["1.000", "2.500", "5.000", "15.000"];
const VISITS = ["200 mil", "500 mil", "1 milhão", "3 milhões"];
const PAGE_VISITS = ["200.000", "500.000", "1.000.000", "3.000.000"];
const DOMAINS = ["10", "20", "40", "100"];
const TAGS = ["15", "80", "300", "Ilimitadas"];
const WEBHOOKS = ["7", "15", "Ilimitados", "Ilimitados"];
const NETWORK_ACCOUNT_LIMITS: Record<Network, number[]> = {
  google: [10, 20, 999, 999],
  meta: [3, 7, 999, 999],
  taboola: [2, 5, 999, 999],
  newsbreak: [2, 5, 999, 999],
  mgid: [2, 5, 999, 999],
  tiktok: [2, 5, 999, 999],
};
const GOOGLE_EMAIL_LIMITS = [3, 10, 30, 999];
const EXTRA_SALE_RATE = {
  one: ["0,15", "0,09", "0,07", "0,05"],
  two: ["0,26", "0,15", "0,12", "0,07"],
  all: ["0,37", "0,21", "0,15", "0,09"],
};

const SALES_OPTIONS = ["Até 500", "500 a 1 mil", "1 a 2,5 mil", "2,5 a 5 mil", "5 a 15 mil", "+ de 15 mil"];
const VISIT_OPTIONS = ["Até 200 mil", "200 a 500 mil", "500 mil a 1 milhão", "1 a 3 milhões", "+ de 3 milhões"];
const VOLUME_PLAN = [0, 0, 1, 2, 3, 3];

const currency = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

function networkTier(count: number): "one" | "two" | "all" {
  if (count <= 1) return "one";
  if (count === 2) return "two";
  return "all";
}

function SectionTitle({ children, description }: { children: React.ReactNode; description: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <h2 className="text-h1 text-white">{children}</h2>
      <p className="text-body mx-auto mt-4 max-w-[68ch] text-gray-300">{description}</p>
    </div>
  );
}

function ChoiceButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "text-body-label min-h-12 rounded-input border px-4 py-3 text-left outline-none transition-colors focus-visible:border-brand-secondary focus-visible:ring-2 focus-visible:ring-brand-secondary/30",
        active ? "border-brand-primary bg-brand-primary text-text-primary" : "border-white/10 bg-white/[0.04] text-gray-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function QuantityControl({
  label,
  logo,
  logoWidth,
  value,
  onChange,
}: {
  label: string;
  logo: string;
  logoWidth?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const updateValue = (nextValue: number) => {
    onChange(Math.min(999, Math.max(1, nextValue)));
  };

  return (
    <div className="flex min-h-14 items-center justify-between gap-3 rounded-input border border-white/10 bg-white/[0.04] px-3 py-2">
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-6 w-8 shrink-0 items-center justify-center">
          <Image src={logo} alt="" width={logoWidth ?? 24} height={24} className="max-h-6 w-auto object-contain" />
        </span>
        <span className="text-sm font-semibold leading-5 text-white">{label}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1 rounded-input bg-black/25 p-1">
        <button type="button" aria-label={`Diminuir ${label}`} onClick={() => updateValue(value - 1)} className="grid h-10 w-10 place-items-center rounded-input text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"><Minus className="h-4 w-4" /></button>
        <input aria-label={`Quantidade de ${label}`} inputMode="numeric" min={1} max={999} value={value} onChange={(event) => updateValue(Number(event.target.value.replace(/\D/g, "")) || 1)} className="h-10 w-12 bg-transparent text-center font-bold tabular-nums text-white outline-none" />
        <button type="button" aria-label={`Aumentar ${label}`} onClick={() => updateValue(value + 1)} className="grid h-10 w-10 place-items-center rounded-input text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"><Plus className="h-4 w-4" /></button>
      </span>
    </div>
  );
}

function ResultPriceCard({
  label,
  installment,
  price,
  cashPrice,
  savings,
  featured = false,
}: {
  label: string;
  installment?: string;
  price: number;
  cashPrice?: number;
  savings?: number;
  featured?: boolean;
}) {
  return (
    <div className={cn("flex min-h-36 flex-col rounded-card border p-3", featured ? "border-emerald-500/70 bg-emerald-500/[0.08]" : "border-white/10 bg-white/[0.035]")}>
      <span className={cn("text-xs font-bold uppercase tracking-[0.08em]", featured ? "text-emerald-400" : "text-gray-400")}>{label}</span>
      <div className="mt-2 flex items-baseline gap-1 tabular-nums text-white">
        {installment && <span className="text-h4">{installment}</span>}
        <span className="text-2xl font-black tracking-[-0.03em]">R$ {currency.format(price)}</span>
        {!installment && <span className="text-small text-gray-400">/mês</span>}
      </div>
      {cashPrice && <p className="text-small mt-1 text-gray-300">ou <strong className="text-white">R$ {currency.format(cashPrice)}</strong> à vista</p>}
      {savings && savings > 0 ? <span className="mt-2 rounded-badge border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">Economia de {savings}%</span> : null}
      <div className="flex-1" />
      <Button type="button" size="sm" variant={featured ? "default" : "outline"} disabled className="mt-2 w-full">Checkout em configuração</Button>
    </div>
  );
}

function formatLimit(value: number, feminine = true): string {
  if (value >= 999) return feminine ? "Ilimitadas" : "Ilimitados";
  return String(value);
}

type SummaryItem = { label: string; step: CalculatorStep };

function getAnswerSummaryItems(
  product: Product,
  networks: Network[],
  volume: number,
  accounts: Record<Network, number>,
  googleEmails: number,
): SummaryItem[] {
  const options = product === "pages" ? VISIT_OPTIONS : SALES_OPTIONS;
  const highestAccountCount = Math.max(...networks.map((network) => accounts[network]));

  return [
    { label: PRODUCT_LABELS[product], step: "product" },
    ...(product !== "pages" ? [{ label: networks.map((id) => NETWORKS.find((network) => network.id === id)?.label).join(", "), step: "networks" as CalculatorStep }] : []),
    { label: options[volume], step: "volume" },
    ...(product !== "pages" ? [{ label: `${highestAccountCount} ${highestAccountCount === 1 ? "conta" : "contas"}`, step: "accounts" as CalculatorStep }] : []),
    ...(product !== "pages" && networks.includes("google") ? [{ label: `${googleEmails} ${googleEmails === 1 ? "e-mail" : "e-mails"}`, step: "googleEmails" as CalculatorStep }] : []),
  ];
}

function AnswerSummary({ items, onEdit, className }: { items: SummaryItem[]; onEdit: (step: CalculatorStep) => void; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <button key={item.step} type="button" onClick={() => onEdit(item.step)} className="group rounded-badge border border-white/10 bg-white/[0.05] px-3 py-1.5 text-small font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">
          {item.label} <span className="ml-1 text-gray-400 transition-colors group-hover:text-white">editar</span>
        </button>
      ))}
    </div>
  );
}

function RecommendedPlanResult({
  product,
  networks,
  volume,
  accounts,
  googleEmails,
  recommended,
  onEdit,
}: {
  product: Product;
  networks: Network[];
  volume: number;
  accounts: Record<Network, number>;
  googleEmails: number;
  recommended: number;
  onEdit: (step: CalculatorStep) => void;
}) {
  const tier = networkTier(networks.length);
  const selectedPrices = PRICES[product][tier];
  const monthlyTotal = selectedPrices.monthly[recommended];
  const semiannualSavings = Math.max(0, Math.round((1 - selectedPrices.semiannualCash[recommended] / (monthlyTotal * 6)) * 100));
  const annualSavings = Math.max(0, Math.round((1 - selectedPrices.annualCash[recommended] / (monthlyTotal * 12)) * 100));
  const summaryItems = getAnswerSummaryItems(product, networks, volume, accounts, googleEmails);

  return (
    <div aria-live="polite">
      <AnswerSummary items={summaryItems} onEdit={onEdit} className="mb-2" />

      <div className="rounded-card border border-brand-primary/70 bg-[#111] p-5 sm:p-6">
        <span className="rounded-badge bg-brand-primary px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-black">Plano indicado para você</span>
        <h3 className="text-h4 mt-3 text-white">{PRODUCT_LABELS[product]} {PLAN_NAMES[recommended]}</h3>
        <p className="mt-2 max-w-none text-sm text-gray-300">{PRODUCT_DESCRIPTIONS[product][recommended]} A configuração abaixo já considera o seu volume, as redes escolhidas e os limites informados.</p>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <ResultPriceCard label="Mensal" price={selectedPrices.monthly[recommended]} />
          <ResultPriceCard label="Semestral" installment="6x" price={selectedPrices.semiannual[recommended]} cashPrice={selectedPrices.semiannualCash[recommended]} savings={semiannualSavings} />
          <ResultPriceCard label="Anual" installment="12x" price={selectedPrices.annual[recommended]} cashPrice={selectedPrices.annualCash[recommended]} savings={annualSavings} featured />
        </div>

        <p className="mt-3 text-center text-xs text-brand-primary">Economia calculada sobre o pagamento mensal. Valores sujeitos a reajuste.</p>

        <div className={cn("mt-4 grid gap-8 border-t border-white/10 pt-4", product === "hub" && "lg:grid-cols-2")}>
          {product !== "pages" && (
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-gray-400">
                <Image src="/logoraads2.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                <span>Ratoeira Ads</span>
              </div>
              <p className="text-sm leading-6 text-gray-300"><strong className="text-white">{SALES[recommended]}</strong> vendas aprovadas/mês · venda extra a <strong className="text-white">R$ {EXTRA_SALE_RATE[tier][recommended]}</strong></p>
              <span className="mb-2 mt-4 block text-xs font-bold uppercase tracking-[0.08em] text-gray-400">Contas de anúncio</span>
              <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {networks.map((networkId) => {
                  const network = NETWORKS.find((item) => item.id === networkId);
                  if (!network) return null;
                  return (
                    <div key={network.id} className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-2 text-sm">
                      <span className="flex items-center gap-3 text-gray-300"><Image src={network.logo} alt="" width={network.logoWidth ?? 22} height={22} className="h-[22px] w-auto object-contain" />{network.label}</span>
                      <strong className="text-white">{formatLimit(NETWORK_ACCOUNT_LIMITS[network.id][recommended])}</strong>
                    </div>
                  );
                })}
                {networks.includes("google") && (
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-2 text-sm sm:col-span-2">
                    <span className="flex items-center gap-3 font-bold uppercase tracking-[0.06em] text-gray-400"><Image src="/icons/pricing/google-ads.webp" alt="" width={22} height={22} className="h-[22px] w-auto object-contain" />E-mails do Google Ads</span>
                    <strong className="text-white">{formatLimit(GOOGLE_EMAIL_LIMITS[recommended], false)}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {product !== "ads" && (
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-gray-400">
                <Image src="/logopages2.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                <span>Ratoeira Pages</span>
              </div>
              <div className="space-y-2 text-sm leading-6 text-gray-300">
                <p><strong className="text-white">{PAGE_VISITS[recommended]}</strong> acessos por mês · páginas e hospedagem ilimitadas</p>
                <p><strong className="text-white">{DOMAINS[recommended]}</strong> domínios customizados</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getCalculatorSteps(product: Product, networks: Network[]): CalculatorStep[] {
  if (product === "pages") return ["product", "volume", "result"];
  const steps: CalculatorStep[] = ["product", "networks", "volume", "accounts"];
  if (networks.includes("google")) steps.push("googleEmails");
  steps.push("result");
  return steps;
}

function CalculatorQuestion({
  step,
  product,
  networks,
  volume,
  accounts,
  googleEmails,
  onProductChange,
  onToggleNetwork,
  onVolumeChange,
  onAccountChange,
  onGoogleEmailsChange,
}: {
  step: CalculatorStep;
  product: Product;
  networks: Network[];
  volume: number;
  accounts: Record<Network, number>;
  googleEmails: number;
  onProductChange: (product: Product) => void;
  onToggleNetwork: (network: Network) => void;
  onVolumeChange: (volume: number) => void;
  onAccountChange: (network: Network, value: number) => void;
  onGoogleEmailsChange: (value: number) => void;
}) {
  const options = product === "pages" ? VISIT_OPTIONS : SALES_OPTIONS;

  if (step === "product") {
    return (
      <fieldset>
        <legend className="text-h4 mb-2 text-white">O que você precisa?</legend>
        <p className="text-small mb-5 text-gray-400">Escolha o produto que melhor representa sua operação.</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {(["ads", "pages", "hub"] as Product[]).map((item) => (
            <ChoiceButton key={item} active={product === item} onClick={() => onProductChange(item)}>{PRODUCT_LABELS[item]}</ChoiceButton>
          ))}
        </div>
      </fieldset>
    );
  }

  if (step === "networks") {
    return (
      <fieldset>
        <legend className="text-h4 mb-2 text-white">Em quais redes você anuncia ao mesmo tempo?</legend>
        <p className="text-small mb-5 text-gray-400">Marque todas as redes que fazem parte da sua operação.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {NETWORKS.map((network) => (
            <ChoiceButton key={network.id} active={networks.includes(network.id)} onClick={() => onToggleNetwork(network.id)}>
              <span className="flex items-center gap-3">
                <span className="flex h-6 w-8 shrink-0 items-center justify-center">
                  <Image src={network.logo} alt="" width={network.logoWidth ?? 24} height={24} className="max-h-6 w-auto object-contain" />
                </span>
                <span>{network.label}</span>
              </span>
            </ChoiceButton>
          ))}
        </div>
      </fieldset>
    );
  }

  if (step === "volume") {
    return (
      <fieldset>
        <legend className="text-h4 mb-2 text-white">{product === "pages" ? "Quantos acessos suas páginas recebem por mês?" : "Quantas vendas aprovadas você faz por mês?"}</legend>
        <p className="text-small mb-5 text-gray-400">Use a faixa que mais se aproxima do seu volume atual.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option, index) => (
            <ChoiceButton key={option} active={volume === index} onClick={() => onVolumeChange(index)}>{option}</ChoiceButton>
          ))}
        </div>
      </fieldset>
    );
  }

  if (step === "accounts") {
    return (
      <fieldset>
        <legend className="text-h4 mb-2 text-white">Quantas contas de anúncio você usa em cada rede?</legend>
        <p className="text-small mb-5 text-gray-400">Se não souber o número exato, use uma estimativa.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {networks.map((networkId) => {
            const network = NETWORKS.find((item) => item.id === networkId);
            if (!network) return null;
            return <QuantityControl key={network.id} label={network.label} logo={network.logo} logoWidth={network.logoWidth} value={accounts[network.id]} onChange={(value) => onAccountChange(network.id, value)} />;
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset>
      <legend className="text-h4 mb-2 text-white">Quantos e-mails diferentes você usa no Google Ads?</legend>
      <p className="text-small mb-5 text-gray-400">Conte cada e-mail que tem acesso às suas contas do Google Ads. Só o Google usa esse limite.</p>
      <div className="max-w-lg">
        <QuantityControl label="E-mails com acesso ao Google Ads" logo="/icons/pricing/google-ads.webp" value={googleEmails} onChange={onGoogleEmailsChange} />
      </div>
    </fieldset>
  );
}

function PlanCalculator() {
  const [product, setProduct] = useState<Product>("hub");
  const [networks, setNetworks] = useState<Network[]>(["google", "meta"]);
  const [volume, setVolume] = useState(2);
  const [accounts, setAccounts] = useState<Record<Network, number>>({
    google: 1,
    meta: 1,
    taboola: 1,
    newsbreak: 1,
    mgid: 1,
    tiktok: 1,
  });
  const [googleEmails, setGoogleEmails] = useState(1);
  const [stepIndex, setStepIndex] = useState(0);

  const recommended = useMemo(() => {
    const volumeIndex = VOLUME_PLAN[volume] ?? 0;
    const accountIndex = networks.reduce((highestIndex, network) => {
      const limits = NETWORK_ACCOUNT_LIMITS[network];
      const matchingIndex = limits.findIndex((limit) => accounts[network] <= limit);
      return Math.max(highestIndex, matchingIndex < 0 ? 3 : matchingIndex);
    }, 0);
    const googleEmailIndex = networks.includes("google")
      ? GOOGLE_EMAIL_LIMITS.findIndex((limit) => googleEmails <= limit)
      : 0;
    return Math.max(volumeIndex, accountIndex, googleEmailIndex < 0 ? 3 : googleEmailIndex);
  }, [accounts, googleEmails, networks, volume]);

  const toggleNetwork = (network: Network) => {
    setNetworks((current) => {
      if (current.includes(network)) {
        return current.length === 1 ? current : current.filter((item) => item !== network);
      }
      return [...current, network];
    });
  };

  const updateAccounts = (network: Network, nextValue: number) => {
    setAccounts((current) => ({
      ...current,
      [network]: Math.min(999, Math.max(1, nextValue)),
    }));
  };

  const steps = getCalculatorSteps(product, networks);
  const safeStepIndex = Math.min(stepIndex, steps.length - 1);
  const activeStep = steps[safeStepIndex];
  const completedSummaryItems = getAnswerSummaryItems(product, networks, volume, accounts, googleEmails)
    .filter((item) => steps.indexOf(item.step) < safeStepIndex);
  const goToStep = (step: CalculatorStep) => {
    const nextIndex = steps.indexOf(step);
    if (nextIndex >= 0) setStepIndex(nextIndex);
  };

  return (
    <section id="calculadora" className="relative scroll-mt-24 overflow-hidden bg-[#080808] px-4 py-12 sm:px-6 md:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-brand-primary/[0.06] blur-[120px]" />
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-card border border-white/[0.08] bg-[#111] p-4 shadow-card-hover sm:p-5 lg:p-4">
          <div className="mx-auto mb-2 max-w-3xl text-center">
            <h2 className="text-h3 text-white">Descubra o plano certo para você</h2>
            <p className="mx-auto mt-1 max-w-[68ch] text-xs text-gray-300">Uma pergunta por vez. Suas respostas ficam salvas e você pode voltar quando quiser.</p>
          </div>
          <div className="mb-3 h-1 w-full overflow-hidden rounded-badge bg-white/10">
            <div className="h-full rounded-badge bg-brand-primary transition-[width] duration-300" style={{ width: `${((safeStepIndex + 1) / steps.length) * 100}%` }} />
          </div>

          {activeStep === "result" ? (
            <RecommendedPlanResult product={product} networks={networks} volume={volume} accounts={accounts} googleEmails={googleEmails} recommended={recommended} onEdit={goToStep} />
          ) : (
            <div className="flex min-h-72 flex-col justify-between">
              <div>
                {completedSummaryItems.length > 0 && <AnswerSummary items={completedSummaryItems} onEdit={goToStep} className="mb-5" />}
                <CalculatorQuestion
                  step={activeStep}
                  product={product}
                  networks={networks}
                  volume={volume}
                  accounts={accounts}
                  googleEmails={googleEmails}
                  onProductChange={setProduct}
                  onToggleNetwork={toggleNetwork}
                  onVolumeChange={setVolume}
                  onAccountChange={updateAccounts}
                  onGoogleEmailsChange={setGoogleEmails}
                />
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5">
                <Button type="button" variant="ghost" disabled={safeStepIndex === 0} onClick={() => setStepIndex((current) => Math.max(0, current - 1))}>Voltar</Button>
                <Button type="button" onClick={() => setStepIndex((current) => Math.min(steps.length - 1, current + 1))}>Continuar</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const COMPARE_ROWS = [
  { label: "Vendas aprovadas por mês", values: SALES },
  { label: "Tags Ratoeira Automática", values: TAGS },
  { label: "Integrações e webhooks", values: WEBHOOKS },
  { label: "Acessos mensais", values: VISITS },
  { label: "Domínios customizados", values: DOMAINS },
  { label: "Páginas ilimitadas", values: [true, true, true, true] },
  { label: "Hospedagem Turbo", values: [true, true, true, true] },
  { label: "Suporte via WhatsApp", values: [true, true, true, true] },
];

function ComparisonTable() {
  const [open, setOpen] = useState(true);
  return (
    <section id="comparacao" className="scroll-mt-24 bg-[#0d0d0d] px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle description="Compare os limites essenciais de cada plano antes de escolher.">Compare plano por plano</SectionTitle>
        <div className="overflow-hidden rounded-card border border-white/[0.08] bg-[#111] shadow-card-resting">
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="text-h4 flex min-h-14 w-full items-center justify-between px-5 py-4 text-left text-white transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-secondary sm:px-6">Recursos e limites <ChevronDown className={cn("h-5 w-5 text-brand-primary transition-transform", open && "rotate-180")} /></button>
          {open && (
            <div className="overflow-x-auto">
              <table className="text-small w-full min-w-[760px] border-collapse">
                <thead><tr className="border-t border-white/10 bg-black/20"><th className="sticky left-0 z-10 bg-[#0d0d0d] px-5 py-4 text-left text-[#aaa] sm:px-6">Recurso</th>{PLAN_NAMES.map((name) => <th key={name} className="px-4 py-4 text-center text-white">{name}</th>)}</tr></thead>
                <tbody>{COMPARE_ROWS.map((row) => <tr key={row.label} className="border-t border-white/[0.07] hover:bg-white/[0.025]"><th scope="row" className="sticky left-0 z-10 bg-[#111] px-5 py-4 text-left font-medium text-gray-300 sm:px-6">{row.label}</th>{row.values.map((value, index) => <td key={`${row.label}-${index}`} className="px-4 py-4 text-center text-gray-200">{value === true ? <Check className="mx-auto h-5 w-5 text-brand-primary" /> : value}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PlanDetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  const isUnlimited = typeof value === "string" && value.toLowerCase().startsWith("ilimitad");
  return (
    <div className="flex items-center justify-between gap-3 text-xs leading-5 text-gray-300">
      <span>{label}</span>
      <strong className={cn("shrink-0 text-right text-white", isUnlimited && "rounded-badge bg-white/10 px-2 py-0.5 text-[11px]")}>{value}</strong>
    </div>
  );
}

function PlanProductHeading({ product }: { product: "ads" | "pages" }) {
  const isAds = product === "ads";
  return (
    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-gray-400">
      <Image src={isAds ? "/logoraads2.png" : "/logopages2.png"} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
      <span>{isAds ? "Ratoeira Ads" : "Ratoeira Pages"}</span>
    </div>
  );
}

function PricingCardDetails({ product, index, networkCount, tier }: { product: Product; index: number; networkCount: 1 | 2 | 6; tier: "one" | "two" | "all" }) {
  return (
    <div className="space-y-5 border-t border-white/[0.08] pt-5">
      {product !== "pages" && (
        <div>
          <PlanProductHeading product="ads" />
          <div className="space-y-1.5">
            <PlanDetailRow label="Redes simultâneas" value={networkCount === 6 ? "Todas" : networkCount} />
            <PlanDetailRow label="Vendas aprovadas/mês" value={SALES[index]} />
            <PlanDetailRow label="Venda extra aprovada" value={`R$ ${EXTRA_SALE_RATE[tier][index]}`} />
            <PlanDetailRow label="Tag Ratoeira Automática" value={TAGS[index]} />
            <PlanDetailRow label="Integrações / Webhooks" value={WEBHOOKS[index]} />
            <PlanDetailRow label="E-mails do Google Ads" value={formatLimit(GOOGLE_EMAIL_LIMITS[index], false)} />
          </div>

          <span className="mb-2 mt-4 block text-[11px] font-black uppercase tracking-[0.08em] text-gray-400">Contas de anúncio por rede</span>
          <div className="space-y-1.5">
            {NETWORKS.map((network) => (
              <div key={network.id} className="flex items-center justify-between gap-3 text-xs leading-5">
                <span className="flex items-center gap-2 font-semibold text-gray-200">
                  <span className="flex h-5 w-6 shrink-0 items-center justify-center"><Image src={network.logo} alt="" width={network.logoWidth ?? 20} height={20} className="max-h-5 w-auto object-contain" /></span>
                  {network.label}
                </span>
                <strong className={cn("shrink-0 text-white", NETWORK_ACCOUNT_LIMITS[network.id][index] >= 999 && "rounded-badge bg-white/10 px-2 py-0.5 text-[11px]")}>{formatLimit(NETWORK_ACCOUNT_LIMITS[network.id][index])}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {product !== "ads" && (
        <div>
          <PlanProductHeading product="pages" />
          <div className="space-y-1.5">
            <PlanDetailRow label="Acessos mensais" value={PAGE_VISITS[index]} />
            <PlanDetailRow label="Domínios customizados" value={DOMAINS[index]} />
            <PlanDetailRow label="Páginas" value="Ilimitadas" />
            <PlanDetailRow label="Hospedagem Turbo" value="Ilimitada" />
            <PlanDetailRow label="Conexão com IA" value={<Check className="h-4 w-4 text-white" />} />
          </div>
        </div>
      )}
    </div>
  );
}

function PricingCards() {
  const [product, setProduct] = useState<Product>("hub");
  const [billing, setBilling] = useState<Billing>("annual");
  const [networkCount, setNetworkCount] = useState<1 | 2 | 6>(2);
  const tier = networkTier(networkCount);
  const prices = PRICES[product][tier][billing];

  return (
    <section id="pricing-cards" className="scroll-mt-24 bg-[#080808] px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle description="Escolha o produto, o número de redes simultâneas e o período para visualizar os valores corretos.">Escolha como quer começar</SectionTitle>
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {(["ads", "pages", "hub"] as Product[]).map((item) => (
              <ChoiceButton key={item} active={product === item} onClick={() => setProduct(item)}>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-9 shrink-0 items-center justify-center">
                    <Image src={PRODUCT_LOGOS[item].src} alt="" width={PRODUCT_LOGOS[item].width} height={24} className={cn("max-h-6 w-auto object-contain", product === item && "brightness-0")} />
                  </span>
                  <span>{PRODUCT_LABELS[item]}</span>
                </span>
              </ChoiceButton>
            ))}
          </div>
          <div className={cn("mt-3 grid w-full max-w-5xl items-end gap-6", product !== "pages" && "lg:grid-cols-2")}>
            {product !== "pages" && (
              <div>
                <label htmlFor="network-count" className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-gray-400">Quantas redes de tráfego</label>
                <div className="relative">
                  <select
                    id="network-count"
                    value={networkCount}
                    onChange={(event) => setNetworkCount(Number(event.target.value) as 1 | 2 | 6)}
                    className="min-h-14 w-full appearance-none rounded-badge border border-white/15 bg-[#171717] px-5 pr-12 text-base font-semibold text-white outline-none transition-colors hover:border-white/25 focus-visible:border-brand-secondary focus-visible:ring-2 focus-visible:ring-brand-secondary/30"
                  >
                    <option value={1}>1 rede de tráfego disponível</option>
                    <option value={2}>2 redes de tráfego disponíveis</option>
                    <option value={6}>Todas as redes de tráfego disponíveis</option>
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}

            <div className={cn(product === "pages" && "mx-auto w-full max-w-lg")}>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-gray-400">Por quanto tempo</span>
              <div role="group" aria-label="Período de contratação" className="relative flex min-h-14 items-center rounded-badge border border-white/15 bg-[#171717] p-1">
                <span className="absolute -right-2 -top-4 rounded-badge bg-emerald-500 px-3 py-1 text-xs font-black uppercase text-black">2 meses grátis</span>
                {(["monthly", "semiannual", "annual"] as Billing[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={billing === item}
                    onClick={() => setBilling(item)}
                    className={cn(
                      "min-h-11 flex-1 rounded-badge px-4 text-base font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-secondary",
                      billing === item ? "bg-white/15 text-white" : "text-gray-400 hover:bg-white/[0.06] hover:text-white",
                    )}
                  >
                    {{ monthly: "Mensal", semiannual: "Semestral", annual: "Anual" }[item]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLAN_NAMES.map((name, index) => {
            const featured = index === 1;
            const unlimited = index === PLAN_NAMES.length - 1;
            const selectedPriceSet = PRICES[product][tier];
            const monthlyTotal = selectedPriceSet.monthly[index];
            const cashPrice = billing === "annual" ? selectedPriceSet.annualCash[index] : billing === "semiannual" ? selectedPriceSet.semiannualCash[index] : undefined;
            const months = billing === "annual" ? 12 : billing === "semiannual" ? 6 : 1;
            const savings = cashPrice ? Math.max(0, Math.round((1 - cashPrice / (monthlyTotal * months)) * 100)) : 0;
            const installment = billing === "annual" ? "12x" : billing === "semiannual" ? "6x" : null;
            return (
              <article key={name} className={cn("relative flex min-h-[760px] flex-col rounded-card border border-white/[0.12] bg-[#111] p-5 shadow-card-resting transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-card-hover", featured && "border-brand-primary/80 ring-1 ring-brand-primary/70", unlimited && "border-emerald-500/80 ring-1 ring-emerald-500/60")}>
                {featured && <span className="text-body-badge absolute -top-3 left-5 rounded-badge bg-brand-primary px-3 py-1 font-bold uppercase tracking-[0.08em] text-text-primary">Mais escolhido</span>}
                {unlimited && <span className="text-body-badge absolute -top-3 right-5 rounded-badge bg-emerald-500 px-3 py-1 font-bold uppercase tracking-[0.08em] text-black">Sem limites</span>}
                <h3 className="text-h3 text-white">{name}</h3>
                <p className="text-small mt-2 min-h-12 text-gray-400">{PRODUCT_DESCRIPTIONS[product][index]}</p>
                <div className="mt-5 min-h-28 tabular-nums">
                  {installment && <span className="text-sm font-black uppercase text-brand-primary">{installment}</span>}
                  <div className="flex items-end gap-1"><span className="mb-1 text-sm text-gray-400">R$</span><span className="text-4xl font-black tracking-[-0.04em] text-white">{currency.format(prices[index])}</span><span className="mb-1 text-sm text-gray-400">/mês</span></div>
                  {cashPrice ? <p className="mt-1 text-sm text-gray-300">ou <strong className="text-white">R$ {currency.format(cashPrice)}</strong> à vista</p> : <p className="mt-1 text-sm text-gray-400">Cobrança mensal</p>}
                  {savings > 0 && <span className="mt-3 block rounded-badge border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">Economize {savings}% pagando à vista</span>}
                </div>

                <PricingCardDetails product={product} index={index} networkCount={networkCount} tier={tier} />
                <div className="flex-1" />
                <Button type="button" variant={featured ? "default" : "outline"} size="lg" disabled title="O link de checkout será configurado na próxima etapa" className={cn("mt-6 w-full disabled:opacity-100", unlimited && "border-emerald-500 bg-emerald-500 text-black")}>Assinar {name}</Button>
                <p className="mt-3 text-center text-xs text-gray-500">{billing === "annual" ? "12x sem juros ou à vista com desconto" : billing === "semiannual" ? "6x sem juros ou à vista com desconto" : "Cobrança mensal"}</p>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-[#777]">Os links de contratação serão conectados após a aprovação desta nova estrutura.</p>
      </div>
    </section>
  );
}

export default function PlansExperience() {
  return (
    <>
      <PlanCalculator />
      <ComparisonTable />
      <PricingCards />
    </>
  );
}
