"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface IconProps {
  id: number;
  className: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  imageSrc?: string;
  imageAlt?: string;
}

export interface FloatingIconsHeroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  icons: IconProps[];
}

const Icon = ({
  mouseX,
  mouseY,
  iconData,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: IconProps;
  index: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const floatDuration = React.useMemo(() => 5 + (iconData.id % 7) * 0.6, [iconData.id]);

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
          Math.pow(mouseY.current - (rect.top + rect.height / 2), 2),
      );

      if (distance < 150) {
        const angle = Math.atan2(
          mouseY.current - (rect.top + rect.height / 2),
          mouseX.current - (rect.left + rect.width / 2),
        );
        const force = (1 - distance / 150) * 50;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute pointer-events-auto", iconData.className)}
    >
      <motion.div
        className="flex items-center justify-center h-14 w-14 md:h-20 md:w-20 p-3 rounded-3xl shadow-xl bg-white/[0.06] backdrop-blur-md border border-white/10"
        animate={{ y: [0, -8, 0, 8, 0], x: [0, 6, 0, -6, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        {iconData.imageSrc ? (
          iconData.imageSrc.endsWith(".svg") ? (
            <img
              src={iconData.imageSrc}
              alt={iconData.imageAlt ?? ""}
              className="h-full w-full object-contain"
              draggable={false}
            />
          ) : (
            <Image
              src={iconData.imageSrc}
              alt={iconData.imageAlt ?? ""}
              width={96}
              height={96}
              className="h-full w-full object-contain"
              draggable={false}
            />
          )
        ) : iconData.icon ? (
          <iconData.icon className="h-7 w-7 md:h-10 md:w-10 text-gray-400/90" />
        ) : null}
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef<
  HTMLElement,
  Omit<React.ComponentPropsWithoutRef<"section">, "title"> & FloatingIconsHeroProps
>(({ className, title, subtitle, ctaText, ctaHref, icons, ...props }, ref) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050505]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#FFB800]/15 blur-[120px]" />
        <div className="absolute -bottom-48 left-16 h-[520px] w-[520px] rounded-full bg-[#FF7E4A]/10 blur-[140px]" />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {icons.map((iconData, index) => (
          <Icon key={iconData.id} mouseX={mouseX} mouseY={mouseY} iconData={iconData} index={index} />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-display font-black tracking-tight text-white leading-[1.03] max-w-3xl lg:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl mx-auto text-center hyphens-none">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl 2xl:max-w-[36rem] 3xl:max-w-[50rem] 4xl:max-w-[70rem] 5xl:max-w-[90rem] 6xl:max-w-[110rem] mx-auto text-[clamp(1.05rem,1.2vw,1.35rem)] text-gray-400/70 leading-relaxed ">
          {subtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="px-8">
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  );
});

FloatingIconsHero.displayName = "FloatingIconsHero";

export { FloatingIconsHero };
