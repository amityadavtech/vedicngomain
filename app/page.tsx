"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import AnnouncementSection from "@/components/announcement-section"
import KaryashalaSection from "@/components/karyashala-section"
import GallerySection from "@/components/gallery-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import CommitteeSection from "@/components/committee-section"
import AcademySection from "@/components/academy-section"

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen">
      {/* Shlok above navbar with Om image */}
      <div className="bg-gradient-to-r from-saffron-100 to-orange-100 py-3">
        <div className="container mx-auto px-4 text-center flex items-center justify-center gap-3">
          <Image src="/om-symbol-saffron-flat-icon.png" alt="ॐ" width={28} height={28} className="inline-block" />
          <p className="shlok-text">{t("shlok.text")}</p>
        </div>
      </div>

      <Navbar />
      <HeroSection />
      <CommitteeSection />
      <AboutSection />
      <KaryashalaSection />
      {/* NEW: Academy section above announcements */}
      <AcademySection />
      <AnnouncementSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  )
}
