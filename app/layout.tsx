import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Devanagari } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/components/language-provider"

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "वैदिक शिक्षा संस्थान",
  description: "सनातन शिक्षा व संस्कार",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body className={notoSansDevanagari.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
