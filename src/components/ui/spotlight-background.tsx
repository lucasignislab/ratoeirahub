"use client";

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Individual Spotlight element
const Spotlight = ({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-[80px] opacity-30 will-change-transform pointer-events-none",
        className
      )}
      {...props}
    />
  );
};

// SpotlightBackground container
interface SpotlightBackgroundProps {
  children: ReactNode;
  className?: string;
}

const SpotlightBackground = ({
  children,
  className,
}: SpotlightBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-visible bg-[#050505]",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Spotlight
          initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
          animate={{
            x: ["-50%", "-30%", "-70%", "-50%"],
            y: ["-50%", "-70%", "-30%", "-50%"],
            rotate: ["0deg", "15deg", "-15deg", "0deg"],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="w-[clamp(600px,30vw,1200px)] h-[clamp(600px,30vw,1200px)] -top-[100px] -left-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 40%, transparent 70%)",
          }}
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "0deg" }}
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "30%", "10%", "0%"],
            rotate: ["-20deg", "0deg", "20deg", "-20deg"],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1.5,
          }}
          className="w-[clamp(500px,25vw,1000px)] h-[clamp(500px,25vw,1000px)] top-1/2 left-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(234, 88, 12, 0.3) 40%, transparent 70%)",
          }}
        />

        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "10deg" }}
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
            rotate: ["10deg", "-10deg", "25deg", "10deg"],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2.5,
          }}
          className="w-[clamp(550px,28vw,1100px)] h-[clamp(550px,28vw,1100px)] -top-[50px] -right-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(252, 211, 77, 0.7) 0%, rgba(251, 191, 36, 0.3) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightBackground;
