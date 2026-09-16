"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import translations from "@/lib/translations";

export type Language = "pt-BR" | "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "ratoeira-hub-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && ["pt-BR", "en", "es"].includes(saved)) {
      const timer = window.setTimeout(() => setLanguageState(saved), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || translations["pt-BR"][key] || key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/**
 * Retorna a string de tradução já processada para uso com dangerouslySetInnerHTML.
 * Se a string contiver tags HTML, elas serão preservadas como HTML real.
 * Se for texto puro, retorna texto puro.
 *
 * @example
 * <div dangerouslySetInnerHTML={{ __html: th("about.timeline.header") }} />
 */
export function useTranslationHtml() {
  const { t } = useLanguage();
  return useCallback(
    (key: string): string => {
      const value = t(key);
      return value;
    },
    [t],
  );
}
