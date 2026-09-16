"use client";
import { motion, useAnimationFrame, useMotionValue, useTransform, MotionValue, HTMLMotionProps } from "motion/react";
import { twMerge } from "tailwind-merge";
import React, { useRef, useState } from "react";

export const Circle = ({ className, children, idx, angle, ...rest }: HTMLMotionProps<"div"> & { idx: number; angle: MotionValue<number> }) => {
  // Converte o ângulo contínuo para o brilho do círculo
  // Cria um efeito onde parte do círculo que está próxima do ângulo atual brilha mais
  const opacity = useTransform(
    angle,
    (a: number) => {
      // Como não podemos facilmente colorir um pedaço da borda,
      // faremos o anel inteiro pulsar levemente quando o radar passar pelo topo (90 graus)
      // Apenas um efeito sutil
      const normalizedAngle = ((a % 360) + 360) % 360;
      const dist = Math.min(Math.abs(normalizedAngle - 90), 360 - Math.abs(normalizedAngle - 90));
      return dist < 30 ? 1 : 0.4;
    }
  );

  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full",
        className
      )}
      style={{
        ...rest.style,
        borderColor: `rgba(230, 166, 0, ${0.3 - (idx + 1) * 0.03})`,
      }}
    />
  );
};

export const Radar = ({ className, angle }: { className?: string; angle: MotionValue<number> }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      {/* Rotating sweep line */}
      <motion.div
        style={{ 
          transformOrigin: "right center",
          rotate: angle 
        }}
        className="absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-[#E6A600] to-transparent" />
      </motion.div>
      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          key={`circle-${idx}`}
          idx={idx}
          angle={angle}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
  angle,
  targetAngle,
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
  angle: MotionValue<number>; // motionValue
  targetAngle: number; // O ângulo onde o radar "cruza" este ícone
}) => {
  // Calcula o brilho com base na distância entre o ângulo atual do radar e o targetAngle deste ícone
  const glowOpacity = useTransform(
    angle,
    (currentAngle: number) => {
      // Normaliza ambos para 0-360
      const normCurrent = ((currentAngle % 360) + 360) % 360;
      const normTarget = ((targetAngle % 360) + 360) % 360;
      
      // Para fazer com que o ícone acenda EXATAMENTE quando a linha cruzar por ele
      // e só depois esfrie gradativamente (efeito tail/rastro), precisamos saber
      // se a linha "acabou de passar" pelo alvo na direção horária.
      
      // A diferença direcional (quantos graus a linha já passou do alvo)
      let diff = normCurrent - normTarget;
      
      // Corrige a volta no círculo (ex: se o current é 5 e o target é 350)
      if (diff < 0) {
        diff += 360;
      }

      // Se a linha passou pelo alvo em um raio de até 45 graus para trás
      // (Isso cria o rastro de resfriamento. Não acende *antes* de passar)
      if (diff >= 0 && diff < 45) {
        return 1 - (diff / 45);
      }
      
      return 0;
    }
  );

  const scale = useTransform(glowOpacity, [0, 1], [1, 1.15]);
  const borderColor = useTransform(glowOpacity, [0, 1], ["rgba(255,255,255,0.1)", "rgba(230,166,0,1)"]);
  const shadowOpacity = useTransform(glowOpacity, [0, 1], [0.1, 0.8]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center justify-center space-y-2"
      style={{ scale }}
    >
      <motion.div 
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111]"
        style={{ 
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: borderColor,
          boxShadow: useTransform(shadowOpacity, (v) => `inset 0 0 20px rgba(230,166,0,${v}), 0 0 20px rgba(230,166,0,${v})`)
        }}
      >
        <motion.div style={{ color: useTransform(glowOpacity, [0, 1], ["#E6A600", "#FFD700"]) }}>
          {icon}
        </motion.div>
      </motion.div>
      <motion.div 
        className="hidden rounded-md px-2 py-1 md:block bg-black/40 backdrop-blur-sm"
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: borderColor,
          boxShadow: useTransform(shadowOpacity, (v) => `0 0 10px rgba(230,166,0,${v})`)
        }}
      >
        <motion.div 
          className="text-center text-[10px] font-bold uppercase tracking-widest"
          style={{
            color: useTransform(glowOpacity, [0, 1], ["rgb(156, 163, 175)", "rgb(255, 255, 255)"])
          }}
        >
          {text || "Tracking"}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
