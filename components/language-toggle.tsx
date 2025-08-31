"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()
  const next = lang === "hi" ? "sa" : "hi"
  return (
    <Button
      variant="outline"
      onClick={() => setLang(next)}
      className="border-saffron-600 text-saffron-700 hover:bg-saffron-50"
      aria-label={t("nav.lang")}
      title={t("nav.lang")}
    >
      <Languages className="h-4 w-4 mr-2" />
      {t("nav.lang")}
    </Button>
  )
}
