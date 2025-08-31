"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UploadCloud } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"

const workshops = [
  "श्रीमद्भगवद्गीता की कार्यशाला",
  "श्रीपुराण की कार्यशाला",
  "श्रीवेद की कार्यशाला",
  "श्रीवेदांग दर्शन की कार्यशाला",
  "श्रीसूर्य सिद्धान्त की कार्यशाला",
  "श्रीउपनिषद् की कार्यशाला",
  "श्रीयोग की कार्यशाला",
  "श्रीरामचरितमानस की कार्यशाला",
  "श्रीभागवत महापुराण की कार्यशाला",
  "प्रारम्भिक कम्प्यूटर की कार्यशाला",
  "प्रारम्भिक कढ़ाई/सिलाई की कार्यशाला",
  "प्रारम्भिक चित्रकला की कार्यशाला",
  "प्रारम्भिक ज्योतिष की कार्यशाला",
  "प्रारम्भिक वैदिक गणित की कार्यशाला",
  "सनातन पूजा पद्धति की कार्यशाला",
]

export default function AdmissionPage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [accept, setAccept] = useState(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    mother_name: "",
    father_name: "",
    dob: "",
    sthayi_pata: "",
    wartaman_shiksha: "",
    poorv_shiksha: "",
    reason: "",
    workshop: workshops[0],
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) {
      toast({ title: t("adm.error.title"), description: "कृपया फोटो अपलोड करें।", variant: "destructive" })
      return
    }
    if (!accept) {
      toast({ title: t("adm.error.title"), description: "कृपया स्वीकार करें और आगे बढ़ें।", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      // upload photo
      const filePath = `photos/${Date.now()}_${photo.name}`
      const { error: upErr } = await supabase.storage.from("admissions").upload(filePath, photo, {
        upsert: false,
        cacheControl: "3600",
        contentType: photo.type,
      })
      if (upErr) throw upErr

      const { error: insErr } = await supabase.from("admissions").insert([
        {
          ...form,
          photo_path: filePath,
        },
      ])
      if (insErr) throw insErr

      toast({ title: t("adm.success.title"), description: t("adm.success.desc") })
      // reset
      setForm({
        name: "",
        mother_name: "",
        father_name: "",
        dob: "",
        sthayi_pata: "",
        wartaman_shiksha: "",
        poorv_shiksha: "",
        reason: "",
        workshop: workshops[0],
      })
      setPhoto(null)
      setAccept(false)
    } catch (err) {
      toast({ title: t("adm.error.title"), description: t("adm.error.desc"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50 py-10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">{t("adm.title")}</CardTitle>
            <p className="text-gray-600 mt-2">{t("adm.desc")}</p>
            <div className="mt-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-saffron-600 text-saffron-700 hover:bg-saffron-50 bg-transparent"
                >
                  मुख्य पृष्ठ पर वापस जाएँ
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.name")} *</label>
                  <Input name="name" value={form.name} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.mother")} *</label>
                  <Input name="mother_name" value={form.mother_name} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.father")} *</label>
                  <Input name="father_name" value={form.father_name} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.dob")} *</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input type="date" name="dob" value={form.dob} onChange={onChange} required className="pl-10" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.photo")} *</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                      required
                    />
                    <UploadCloud className="h-5 w-5 text-saffron-600" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.address")} *</label>
                  <Textarea name="sthayi_pata" value={form.sthayi_pata} onChange={onChange} required rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.curEdu")} *</label>
                  <Input name="wartaman_shiksha" value={form.wartaman_shiksha} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.prevEdu")} *</label>
                  <Input name="poorv_shiksha" value={form.poorv_shiksha} onChange={onChange} required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.reason")} *</label>
                  <Textarea name="reason" value={form.reason} onChange={onChange} required rows={4} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("adm.workshop")} *</label>
                  <select
                    name="workshop"
                    value={form.workshop}
                    onChange={onChange}
                    required
                    className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                  >
                    {workshops.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                  <span className="text-gray-700">
                    <span className="font-semibold">{t("adm.accept")}</span>
                    <br />
                    <span className="text-sm text-gray-600">{t("adm.accept.desc")}</span>
                  </span>
                </label>

                <div className="flex justify-between">
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="border-saffron-600 text-saffron-700 hover:bg-saffron-50 bg-transparent"
                    >
                      मुख्य पृष्ठ पर वापस जाएँ
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-saffron-600 hover:bg-saffron-700 text-white px-8"
                  >
                    {loading ? "..." : t("adm.submit")}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
