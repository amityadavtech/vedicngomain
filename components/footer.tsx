"use client"

import { Flower2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-saffron-500 p-2 rounded-full">
                <Flower2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-xl font-bold">{t("app.name")}</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              सनातन धर्म की शिक्षा और संस्कारों को आगे बढ़ाने का हमारा संकल्प। वैदिक ज्ञान के प्रकाश से समाज को आलोकित करना हमारा उद्देश्य
              है।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-saffron-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron-400 transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-saffron-400">{t("footer.quick")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="#karyashala" className="text-gray-300 hover:text-white transition-colors">
                  {t("nav.workshop")}
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-gray-300 hover:text-white transition-colors">
                  {t("nav.academy")}
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-300 hover:text-white transition-colors">
                  {t("nav.donate")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-saffron-400">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">वैदिक शिक्षा</li>
              <li className="text-gray-300">रामायण अध्ययन</li>
              <li className="text-gray-300">संस्कृत भाषा</li>
              <li className="text-gray-300">योग और ध्यान</li>
              <li className="text-gray-300">धार्मिक संस्कार</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-saffron-400">{t("footer.contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-saffron-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-saffron-400" />
                <span className="text-gray-300">info@vedic-ngo.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-saffron-400 mt-1" />
                <span className="text-gray-300">
                  123, धर्म मार्ग
                  <br />
                  नई दिल्ली - 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {t("app.name")}। {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t("footer.terms")}
              </Link>
              <a
                href="https://www.pixelsbeing.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-sm"
                aria-label="Designed and Developed by PixelsBeing"
              >
                Designed and Developed by PixelsBeing
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
