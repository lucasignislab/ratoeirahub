"use client";

import { motion } from "motion/react";
import { Zap, Shield, MessageCircle, BarChart3, Globe, Smartphone, Bell, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdsSkeleton = () => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 2, repeat: Infinity, repeatDelay: 1 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-linear-to-br from-yellow-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex-col space-y-2 p-4"
    >
      {[40, 60, 80].map((w, i) => (
        <div key={i} className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            variants={variants}
            style={{ width: `${w}%` }}
            className="h-full bg-linear-to-r from-yellow-400 to-[#E6A600]"
          />
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-[#E6A600]" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-2 w-20 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-1.5 w-12 bg-neutral-100 dark:bg-neutral-800 rounded" />
        </div>
      </div>
    </motion.div>
  );
};

export const PagesSkeleton = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-orange-50 dark:bg-neutral-900 rounded-xl p-4 gap-4 overflow-hidden">
      <div className="w-1/3 h-full border-r border-orange-100 dark:border-neutral-800 flex flex-col gap-2 pr-2">
        <div className="h-2 w-full bg-orange-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-2 w-2/3 bg-orange-100 dark:bg-neutral-700 rounded-full" />
        <div className="h-10 w-full bg-orange-500/20 rounded-lg border border-orange-500/30" />
      </div>
      <div className="flex-1 space-y-4">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="h-24 w-full bg-linear-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-white dark:bg-neutral-800 rounded-lg shadow-sm" />
          <div className="h-8 bg-white dark:bg-neutral-800 rounded-lg shadow-sm" />
        </div>
      </div>
    </motion.div>
  );
};

export const IntegrationsSkeleton = () => {
  const logos = [Globe, Smartphone, Zap, Bell, Shield, MessageCircle];
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-neutral-50 dark:bg-neutral-900 items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-4">
        {logos.map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
            className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shadow-sm"
          >
            <Icon className="w-5 h-5 text-neutral-400 group-hover:text-[#E6A600] transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const NotificationSkeleton = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-linear-to-br from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex-col p-4 relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="space-y-3"
      >
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="p-3 bg-white dark:bg-neutral-800 rounded-xl border border-blue-100 dark:border-neutral-700 shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-blue-500" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-600 rounded" />
              <div className="h-1.5 w-16 bg-neutral-100 dark:bg-neutral-700 rounded" />
            </div>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-white/90 dark:from-neutral-900/90 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export const SecuritySkeleton = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] bg-emerald-50 dark:bg-neutral-900 items-center justify-center p-4">
      <motion.div
        animate={{
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center relative"
      >
        <Shield className="w-10 h-10 text-emerald-600" />
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-emerald-500"
        />
      </motion.div>
    </div>
  );
};
