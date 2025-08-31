"use client"

import Image from "next/image"
import { Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function CommitteeSection() {
  const { t } = useLanguage()
  return (
    <section id="committee" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-saffron-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">हमारे कमेटी के बारे में</h2>
          </div>
          <p className="text-xl text-gray-600">वैदिक शिक्षा और सनातन संस्कारों के प्रचार-प्रसार में समर्पित हमारा संगठन</p>
        </div>

        <div className="grid gap-10">
          {/* Person 1 */}
          <article className="grid md:grid-cols-[240px,1fr] gap-6 items-start bg-gradient-to-r from-saffron-50 to-orange-50 rounded-xl p-6 shadow-md">
            <div className="relative w-full md:w-[240px] h-[240px] rounded-xl overflow-hidden ring-4 ring-saffron-200">
              <Image
                src="/fo1.jpg"
                alt="संस्थापक डॉ. रामकुमार शर्मा"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{t("committee.p1.name")}</h3>
              <p className="mt-3 text-gray-700 leading-7">{t("committee.p1.bio")}</p>
            </div>
          </article>

          {/* Person 2 */}
          <article className="grid md:grid-cols-[240px,1fr] gap-6 items-start bg-gradient-to-r from-saffron-50 to-orange-50 rounded-xl p-6 shadow-md">
            <div className="relative w-full md:w-[240px] h-[240px] rounded-xl overflow-hidden ring-4 ring-saffron-200">
              <Image
                src="/fo2.jpg"
                alt={`${t("committee.p2.name")} का चित्र`}
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{t("committee.p2.name")}</h3>
              <p className="mt-3 text-gray-700 leading-7">{t("committee.p2.bio")}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
