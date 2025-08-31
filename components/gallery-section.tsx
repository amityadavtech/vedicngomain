"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function GallerySection() {
  const [currentImage, setCurrentImage] = useState(0)
  const { t } = useLanguage()

  const images = [
    { src: "/g1.jpg", title: t("gallery.img1") },
    { src: "/g2.jpg", title: t("gallery.img2") },
    { src: "/g3.jpg", title: t("gallery.img3") },
    { src: "/g4.jpg", title: t("gallery.img4") },
    { src: "/g5.jpg", title: t("gallery.img5") },
    { src: "/g6.jpg", title: t("gallery.img6") },
    { src: "/g7.jpg", title: t("gallery.img7") },
    { src: "/g8.jpg", title: t("gallery.img8") },
    { src: "/g9.jpg", title: t("gallery.img9") },
    { src: "/g10.jpg", title: t("gallery.img10") },
    { src: "/g11.jpg", title: t("gallery.img11") },
    { src: "/g12.jpg", title: t("gallery.img12") },
    { src: "/g13.jpg", title: t("gallery.img13") },
    { src: "/g14.jpg", title: t("gallery.img14") },
    { src: "/g15.jpg", title: t("gallery.img15") },
    { src: "/g16.jpg", title: t("gallery.img16") },
    { src: "/g17.jpg", title: t("gallery.img17") },
    { src: "/g18.jpg", title: t("gallery.img18") },
    { src: "https://i.ibb.co/gFcSqBC4/g19.jpg", title: t("gallery.img19") },
  ]

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Camera className="h-8 w-8 text-saffron-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">{t("gallery.title")}</h2>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={images[currentImage].src || "/placeholder.svg"}
                alt={images[currentImage].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-bold">{images[currentImage].title}</h3>
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  currentImage === index ? "ring-4 ring-saffron-500 scale-110" : "hover:scale-105"
                }`}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
