"use client"

import { BookOpen, Heart, Users, Star, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function AboutSection() {
  const { t } = useLanguage()

  const aboutItems = [
    {
      title: t("about.suchita.title"),
      description: t("about.suchita.desc"),
      icon: Heart,
    },
    {
      title: t("about.ramayan.title"),
      description: t("about.ramayan.desc"),
      icon: BookOpen,
    },
    {
      title: t("about.granth.title"),
      description: t("about.granth.desc"),
      icon: Star,
    },
    {
      title: t("about.prarigyapti.title"),
      description: t("about.prarigyapti.desc"),
      icon: Users,
    },
    {
      title: t("about.abhuday.title"),
      description: t("about.abhuday.desc"),
      icon: Trophy,
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-saffron-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-saffron-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t("about.title")}</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("about.sub")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-saffron-100 p-3 rounded-full group-hover:bg-saffron-200 transition-colors">
                    <item.icon className="h-6 w-6 text-saffron-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 ml-4">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
