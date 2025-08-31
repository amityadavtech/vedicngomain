"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useMemo, useState, useEffect } from "react"
import { translations, type Lang } from "@/i18n/translations"

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<Ctx>({
  lang: "hi",
  setLang: () => {},
  t: (k: string) => k,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "hi" || stored === "sa") setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  const t = (key: string) => {
    const dict = translations[lang]
    return dict[key] ?? key
  }

  const value = useMemo(() => ({ lang, setLang, t }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
