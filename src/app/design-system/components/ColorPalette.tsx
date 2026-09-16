"use client";

interface ColorSwatchProps {
  name: string;
  token: string;
  bgClass: string;
  textClass?: string;
  isGradient?: boolean;
  isBorder?: boolean;
  borderClass?: string;
}

function ColorSwatch({ weight, hex, bgClass, textClass = "text-text-primary" }: { weight: string; hex: string; bgClass: string; textClass?: string }) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`
          h-16 w-full rounded-md border border-border-subdued mb-2
          ${bgClass}
          transition-transform duration-200 group-hover:scale-105
        `}
      />
      <div className="flex flex-col items-center mt-2">
        <span className="text-[10px] font-bold text-gray-700 leading-none">{weight}</span>
        <span className="text-[9px] font-mono text-gray-400 mt-1 uppercase">{hex}</span>
      </div>
    </div>
  );
}

interface ColorScaleProps {
  title: string;
  description: string;
  colors: { weight: string; hex: string; bgClass: string }[];
}

function ColorScale({ title, description, colors }: ColorScaleProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-heading-subtitle text-text-primary mb-2">{title}</h3>
        <p className="text-body-base text-text-secondary">{description}</p>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
        {colors.map((color, index) => (
          <ColorSwatch key={index} {...color} />
        ))}
      </div>
    </div>
  );
}

export default function ColorPalette() {
  const brandGold = [
    { weight: "50", hex: "#FFF8E6", bgClass: "bg-[#FFF8E6]" },
    { weight: "100", hex: "#FFEEB8", bgClass: "bg-[#FFEEB8]" },
    { weight: "200", hex: "#FFE08A", bgClass: "bg-[#FFE08A]" },
    { weight: "300", hex: "#FFD15C", bgClass: "bg-[#FFD15C]" },
    { weight: "400", hex: "#FFC22E", bgClass: "bg-[#FFC22E]" },
    { weight: "500", hex: "#FFB800", bgClass: "bg-[#FFB800]" },
    { weight: "600", hex: "#E6A600", bgClass: "bg-[#E6A600]" },
    { weight: "700", hex: "#CC9200", bgClass: "bg-[#CC9200]" },
    { weight: "800", hex: "#B37E00", bgClass: "bg-[#B37E00]" },
  ];

  const brandOrange = [
    { weight: "50", hex: "#FFF5F2", bgClass: "bg-[#FFF5F2]" },
    { weight: "100", hex: "#FFEBE5", bgClass: "bg-[#FFEBE5]" },
    { weight: "200", hex: "#FFD1C2", bgClass: "bg-[#FFD1C2]" },
    { weight: "300", hex: "#FFA385", bgClass: "bg-[#FFA385]" },
    { weight: "400", hex: "#FF8C66", bgClass: "bg-[#FF8C66]" },
    { weight: "500", hex: "#FF7E4A", bgClass: "bg-[#FF7E4A]" },
    { weight: "600", hex: "#E67142", bgClass: "bg-[#E67142]" },
    { weight: "700", hex: "#CC653B", bgClass: "bg-[#CC653B]" },
    { weight: "800", hex: "#B35833", bgClass: "bg-[#B35833]" },
  ];

  return (
    <section id="cores" className="space-y-12">
      <div>
        <h2 className="text-h1 text-text-primary mb-4">
          Paleta de Cores
        </h2>
        <p className="text-body-base text-text-secondary max-w-2xl 2xl:max-w-[50rem] 4xl:max-w-[70rem] ">
          Cores semânticas e escalas de marca organizadas para máxima consistência visual.
        </p>
      </div>

      <ColorScale
        title="Gold (Brand Primary)"
        description="Escala principal usada para destaque e branding."
        colors={brandGold}
      />

      <ColorScale
        title="Orange (Brand Secondary)"
        description="Escala secundária para ações complementares e suporte."
        colors={brandOrange}
      />

    </section>
  );
}
