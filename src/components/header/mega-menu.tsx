"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { NavMenu } from "./nav-data";

type Direction = "ltr" | "rtl";

interface MegaMenuProps {
  menu: NavMenu | null;
  direction: Direction;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onEscape: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function MegaMenuPanel({
  menu,
  direction,
  onMouseEnter,
  onMouseLeave,
  panelRef,
  onEscape,
}: MegaMenuProps & { menu: NavMenu }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, x: direction === "ltr" ? 18 : -18 }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.32, ease: EASE },
      }}
      exit={{
        opacity: 0,
        y: 6,
        x: direction === "ltr" ? -14 : 14,
        transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] as const },
      }}
      ref={panelRef}
      role="dialog"
      aria-label={`${menu.id} menu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(event) => {
        if (event.key === "Escape") onEscape();
      }}
      className="absolute left-0 top-0 mt-3 w-full rounded-card border border-white/30 bg-[#0a0a0a]/95 backdrop-blur-none lg:backdrop-blur-xl p-4 shadow-[0_0_60px_rgba(255,255,255,0.12)]"
    >
      <div className="flex gap-3 items-start">
        {menu.columns.map((column) => (
          <div
            key={column.heading}
            className={cn(
              "rounded-card p-4",
              column.accent ? "bg-white/5 border border-white/10 min-w-[200px] lg:min-w-[220px]" : "bg-transparent flex-1 min-w-0",
            )}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-gray-100">
              {column.heading}
            </p>
            <div className="space-y-1">
              {column.items.map((item) => {
                const itemKey = `${column.heading}-${item.label}`;
                const content = (
                  <>
                    <span className={cn("block text-sm font-semibold whitespace-nowrap", item.disabled ? "text-gray-500" : "text-gray-100")}>
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-1 block text-xs text-gray-500">
                        {item.description}
                      </span>
                    )}
                  </>
                );

                if (item.disabled) {
                  return (
                    <div
                      key={itemKey}
                      className="block w-full rounded-button px-3 py-2 text-left border border-transparent bg-transparent opacity-60 cursor-not-allowed select-none"
                      aria-disabled="true"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={itemKey}
                    href={item.href || "#"}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={() => setHoveredItem(itemKey)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onFocus={() => setHoveredItem(itemKey)}
                    onBlur={() => setHoveredItem(null)}
                    className={cn(
                      "block w-full rounded-button px-3 py-2 text-left transition-colors border border-transparent bg-transparent focus-visible:outline-none",
                      hoveredItem === itemKey
                        ? "bg-brand-100/30 ring-2 ring-orange-400 ring-offset-2 ring-offset-surface-default"
                        : "hover:bg-brand-100/20",
                    )}
                  >
                    {content}
                  </motion.a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function MegaMenu({
  menu,
  direction,
  onMouseEnter,
  onMouseLeave,
  panelRef,
  onEscape,
}: MegaMenuProps) {
  return (
    <AnimatePresence>
      {menu && (
        <MegaMenuPanel
          key="mega-menu-panel"
          menu={menu}
          direction={direction}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          panelRef={panelRef}
          onEscape={onEscape}
        />
      )}
    </AnimatePresence>
  );
}
