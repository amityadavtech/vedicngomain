"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Flower2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageToggle from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const menuItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.announcement"), href: "#announcement" },
    { name: t("nav.workshop"), href: "#karyashala" },
    { name: t("nav.academy"), href: "/academy" }, // NEW academy link
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.contact"), href: "#contact" },
    { name: t("nav.admission"), href: "/admission" },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-3">
          {/* Logo and NGO Name */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full">
              <img src="https://www.vedicngo.org/logo.jpg" alt="" className="h-10 w-10 object-contain text-white" />
            </div>
            <div className="text-xl font-bold text-saffron-700">रामायण वैदिक एजुकेशन फाउंडेशन</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <div className="ml-4 flex items-baseline gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name + item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-saffron-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link href="/payment">
              <Button className="bg-saffron-600 hover:bg-saffron-700 text-white">{t("nav.donate")}</Button>
            </Link>
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.name + item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-saffron-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/payment" onClick={() => setIsOpen(false)}>
                <Button className="bg-saffron-600 hover:bg-saffron-700 text-white w-full mt-2">
                  {t("nav.donate")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
