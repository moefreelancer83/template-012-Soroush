"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  showCookieBannerTrigger: boolean;
  triggerCookieBanner: () => void;
  setT: (setter: (prev: unknown) => unknown) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: React.ReactNode;
  templateData: any; // Now required, not optional
}

export function LanguageProvider({
  children,
  templateData,
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("de");
  const [showCookieBannerTrigger, setShowCookieBannerTrigger] = useState(false);
  const [templateDataState, setTemplateDataState] =
    useState<Record<string, unknown>>(templateData);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "de" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    setTemplateDataState(templateData);
  }, [templateData]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const triggerCookieBanner = () => {
    setShowCookieBannerTrigger(true);
    // Reset trigger after a brief moment
    setTimeout(() => setShowCookieBannerTrigger(false), 100);
  };

  const t = templateDataState[language] || {};

  const setT = useCallback(
    (setter: (prev: unknown) => unknown) => {
      setTemplateDataState((prev) => {
        const newData = structuredClone(prev);
        console.log({ "language in setter": language });

        newData[language] = setter(newData[language] ?? {});

        return newData;
      });
    },
    [language]
  );


  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        showCookieBannerTrigger,
        triggerCookieBanner,
        setT,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
