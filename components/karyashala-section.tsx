"use client"

import { BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function KaryashalaSection() {
  const { t } = useLanguage()

  const subjects = [
    const subjects = [
  { title: t("work.gita.title"), description: t("work.gita.desc"), image: "/k1.png" },
  { title: t("work.ramayan.title"), description: t("work.ramayan.desc"), image: "/k2.png" },
  { title: t("work.ved.title"), description: t("work.ved.desc"), image: "/k3.png" },
  { title: t("work.sanskrit.title"), description: t("work.sanskrit.desc"), image: "/k4.png" },
  { title: t("work.yoga.title"), description: t("work.yoga.desc"), image: "/k5.png" },
  { title: t("work.ayurveda.title"), description: t("work.ayurveda.desc"), image: "/k6.png" },
  { title: t("work.sanskar.title"), description: t("work.sanskar.desc"), image: "/k7.png" },
  { title: t("work.astrology.title"), description: t("work.astrology.desc"), image: "/k8.png" },
  { title: t("work.vastu.title"), description: t("work.vastu.desc"), image: "/k9.png" },
  { title: t("work.music.title"), description: t("work.music.desc"), image: "/k10.png" },
  { title: t("work.art.title"), description: t("work.art.desc"), image: "/k11.png" },
  { title: t("work.history.title"), description: t("work.history.desc"), image: "/k12.png" },
  { title: t("work.science.title"), description: t("work.science.desc"), image: "/k13.png" },
];

  ]

  return (
    <section id="karyashala" className="py-20 bg-gradient-to-br from-orange-50 to-saffron-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-saffron-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t("work.title")}</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("work.sub")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
               
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-saffron-600 transition-colors">
                  {subject.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{subject.description}</p>
                <Link href="/admission">
                  <Button className="w-full bg-saffron-600 hover:bg-saffron-700 text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {t("work.card.cta")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
