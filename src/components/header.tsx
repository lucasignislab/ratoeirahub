"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, ChevronLeft, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type NavMenu } from "./header/nav-data";
import { MegaMenu } from "./header/mega-menu";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useTranslatedNav } from "@/hooks/useTranslatedNav";
import { useLanguage } from "@/contexts/LanguageContext";

const SHELL_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EXIT_EASE = [0.7, 0, 0.84, 0] as [number, number, number, number];
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function hasNavigableHref(href?: string): href is string {
  return Boolean(href && href !== "#");
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 md:gap-4 select-none max-lg:absolute max-lg:inset-x-0 max-lg:w-full max-lg:justify-center lg:mr-8 xl:mr-16 2xl:mr-24"
      aria-label="Ratoeira Hub"
    >
      <div className="flex items-center justify-center self-center max-lg:absolute max-lg:right-[calc(50%+6.8rem)]">
        <Image
          src="/logohub.png"
          alt="Ratoeira Hub"
          width={72}
          height={72}
          priority
          className="h-11 w-auto object-contain sm:h-12 lg:h-16 xl:h-[72px]"
        />
      </div>
      <span className="whitespace-nowrap text-[1.25rem] font-black tracking-tight text-brand-primary max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 sm:text-[1.5rem] lg:text-[2rem] xl:text-[2.5rem]">
        Ratoeira Hub
      </span>
    </Link>
  );
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <motion.span
    className="inline-flex text-current"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{
      duration: 0.2,
      ease: SHELL_EASE,
    }}
    aria-hidden
  >
    <ChevronDown className="size-3.5" strokeWidth={1.6} />
  </motion.span>
);

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: SHELL_EASE,
    },
  },
};

const panelVariants = {
  enter: { opacity: 0, x: 26 },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.34,
      ease: SHELL_EASE,
    },
  },
  exit: {
    opacity: 0,
    x: -18,
    transition: {
      duration: 0.24,
      ease: EXIT_EASE,
    },
  },
};

function HeaderActions({
  mobile = false,
  onAction,
}: {
  mobile?: boolean;
  onAction?: () => void;
}) {
  const { t } = useLanguage();
  const primaryLabel = t("header.signIn");

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        mobile && "grid w-full grid-cols-2 gap-4",
      )}
    >
      {/* Design System link hidden temporarily */}
      <Link
        href="/planos#pricing-cards"
        onClick={onAction}
        className={cn(
          "flex select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-button bg-brand-primary text-gray-900 font-black transition-colors duration-150 hover:bg-brand-primary-hover",
          mobile ? "min-h-14 text-lg" : "px-6 py-2 text-sm",
        )}
      >
        {primaryLabel}
        <ArrowRight
          className="size-3.5 shrink-0 text-gray-900"
          strokeWidth={1.6}
        />
      </Link>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileStack, setMobileStack] = useState<number[]>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const navLinks = useTranslatedNav();

  const activeMenu: NavMenu | null =
    activeIndex !== null ? navLinks[activeIndex]?.menu ?? null : null;

  const openMenu = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeMenu = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    const onDocPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!navRef.current?.contains(target)) {
        closeMenu();
      }
    };
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [closeMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!activeMenu || !panelRef.current) return;
    const firstFocusable = panelRef.current.querySelector<HTMLElement>(
      FOCUSABLE_SELECTOR,
    );
    firstFocusable?.focus();
  }, [activeMenu]);

  const activeMobileIndex = mobileStack[mobileStack.length - 1] ?? null;
  const activeMobileLink =
    activeMobileIndex !== null ? navLinks[activeMobileIndex] : null;

  return (
    <header
      ref={navRef}
      onPointerDown={(event) => event.stopPropagation()}
      className="fixed inset-x-0 top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-none lg:bg-[#0a0a0a]/92 lg:backdrop-blur-xl lg:supports-[backdrop-filter]:bg-[#0a0a0a]/88 safe-area-top"
    >
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[120rem] px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-20">
        <div className="relative flex h-20 items-center justify-between">
          <Logo />

          <nav
            className="relative hidden items-center lg:flex lg:mr-8 xl:mr-16 2xl:mr-24"
            onMouseLeave={closeMenu}
          >
            <div className="flex items-center rounded-button border border-white/10 bg-white/5 px-2 py-1">
              {navLinks.map((link, index) => {
                const open = activeIndex === index && !!link.menu;
                if (!link.menu && hasNavigableHref(link.href)) {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-button px-3 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10 hover:text-gray-100"
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <div key={link.label} onMouseEnter={() => link.menu && openMenu(index)}>
                    <button
                      type="button"
                      onFocus={() => link.menu && openMenu(index)}
                      onClick={() => {
                        if (!link.menu && hasNavigableHref(link.href)) {
                          window.location.href = link.href;
                          return;
                        }
                        if (link.menu) {
                          if (open) {
                            closeMenu();
                          } else {
                            openMenu(index);
                          }
                        }
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-button px-3 py-2 text-sm font-semibold transition-colors",
                        open
                          ? "bg-brand-100 text-gray-900"
                          : "text-gray-200 hover:bg-white/10 hover:text-gray-100",
                      )}
                    >
                      {link.label}
                      {link.menu ? <ChevronIcon open={open} /> : null}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="absolute left-1/2 top-full z-50 w-[min(900px,calc(100vw-48px))] -translate-x-1/2 pt-1">
              <MegaMenu
                menu={activeMenu}
                direction="ltr"
                onMouseEnter={() => undefined}
                onMouseLeave={closeMenu}
                panelRef={panelRef}
                onEscape={closeMenu}
              />
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <HeaderActions />
            <LanguageSelector />
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() =>
              setMobileOpen((v) => {
                const next = !v;
                if (!next) setMobileStack([]);
                return next;
              })
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-button border border-white/10 text-gray-200 transition-colors hover:bg-white/10 lg:hidden max-lg:absolute max-lg:right-0"
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={1.9} />
            ) : (
              <Menu className="size-5" strokeWidth={1.9} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-shell"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: SHELL_EASE }}
            className="border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl 3xl:max-w-[100rem] 4xl:max-w-[120rem] px-4 pb-4 pt-3 sm:px-6 3xl:px-12 4xl:px-20">
              <AnimatePresence mode="wait" initial={false}>
                {activeMobileLink?.menu ? (
                  <motion.div
                    key={`mobile-submenu-${activeMobileLink.label}`}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-2"
                  >
                    <button
                      type="button"
                      onClick={() => setMobileStack((prev) => prev.slice(0, -1))}
                      className="inline-flex min-h-9 items-center gap-2 rounded-button px-2 py-1 text-sm font-semibold text-gray-200 hover:bg-white/10"
                    >
                      <ChevronLeft className="size-4" />
                      Voltar
                    </button>

                    <div className="space-y-2">
                      {activeMobileLink.menu.columns.map((column) => (
                        <div
                          key={column.heading}
                          className={cn(
                            "rounded-card border border-border-default p-3",
                            column.accent && "bg-white/5",
                          )}
                        >
                          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-100">
                            {column.heading}
                          </p>
                          <div className="space-y-0.5">
                            {column.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href || "#"}
                                className="block w-full rounded-button px-2 py-1.5 text-left hover:bg-brand-100/30"
                              >
                                <span className="block py-1 text-sm font-semibold text-gray-100">
                                  {item.label}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile-root"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-2"
                  >
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.label}
                        variants={itemVariants}
                        type="button"
                        onClick={() => {
                          if (link.menu) {
                            setMobileStack((prev) => [...prev, index]);
                            return;
                          }
                          if (hasNavigableHref(link.href)) {
                            window.location.href = link.href;
                            setMobileStack([]);
                            setMobileOpen(false);
                          }
                        }}
                        className="flex w-full min-h-10 items-center justify-between rounded-button border border-border-default px-4 py-2 text-left"
                      >
                        <span className="text-base md:text-sm font-semibold text-gray-100">
                          {link.label}
                        </span>
                        {link.menu ? (
                          <ChevronDown className="size-4 text-gray-200" />
                        ) : (
                          <ArrowRight className="size-4 text-gray-200" />
                        )}
                      </motion.button>
                    ))}

                    <div className="pt-3">
                      <HeaderActions mobile onAction={() => setMobileOpen(false)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
