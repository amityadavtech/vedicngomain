"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import VedicClock from "@/components/vedic-clock"
import { useLanguage } from "@/components/language-provider"

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 saffron-gradient opacity-10"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                {t("hero.title.1")}
                <span className="text-saffron-600 block">{t("hero.title.2")}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">{t("hero.tagline")}</p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700">{t("hero.desc")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#about">
                <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-3">
                  {t("hero.cta.about")}
                </Button>
              </Link>
              <Link href="#karyashala">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-saffron-600 text-saffron-600 hover:bg-saffron-50 px-8 py-3 bg-transparent"
                >
                  {t("hero.cta.workshop")}
                </Button>
              </Link>
            </div>

            {/* Vedic Clock */}
            <div className="pt-4">
              <VedicClock />
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/hero.png" alt="" fill className="object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {/* Om Image */}
              <div className="absolute top-4 left-4 bg-white/90 rounded-full p-3 shadow-lg">
                <Image src="/saffron-om-symbol-icon.png" alt="ॐ चिन्ह" width={48} height={48} />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <p className="text-saffron-600 font-semibold text-lg">"विद्या ददाति विनयं"</p>
              <p className="text-gray-600 text-sm">विद्या विनम्रता प्रदान करती है</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
