"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpenCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function AcademySection() {
  const { t } = useLanguage()
  return (
    <section id="academy" className="py-20 bg-gradient-to-br from-saffron-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpenCheck className="h-8 w-8 text-saffron-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t("academy.title")}</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("academy.sub")}</p>
        </div>

        <Card className="max-w-5xl mx-auto border-0 shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image src="/vedic-academy-students-saffron-tones.png" alt="अकादमी" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t("academy.title")}</h3>
              <p className="text-gray-700 mb-6">{t("academy.page.desc")}</p>
              <div>
                <Link href="/academy">
                  <Button className="bg-saffron-600 hover:bg-saffron-700 text-white px-8">{t("academy.cta")}</Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
