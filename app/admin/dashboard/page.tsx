"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Users, Megaphone, Edit, Save, X, FileText } from "lucide-react"
import { supabase, type ContactSubmission, type EventAnnouncement, type Admission, getPublicUrl } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [announcement, setAnnouncement] = useState<EventAnnouncement | null>(null)
  const [editingAnnouncement, setEditingAnnouncement] = useState(false)
  const [eventName, setEventName] = useState("")
  const [driveLink, setDriveLink] = useState("")
  const [admissions, setAdmissions] = useState<Admission[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    const session = localStorage.getItem("admin_session")
    if (!session) {
      router.push("/admin")
      return
    }
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const { data: contactsData, error: contactsError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
      if (contactsError) throw contactsError
      setContacts(contactsData || [])

      const { data: announcementData, error: announcementError } = await supabase
        .from("event_announcements")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()
      if (announcementError) throw announcementError

      if (announcementData) {
        setAnnouncement(announcementData)
        setEventName(announcementData.event_name || "")
        setDriveLink((announcementData as any).pdf_link || "")
      } else {
        setAnnouncement(null)
        setEventName("")
        setDriveLink("")
      }

      const { data: admData, error: admErr } = await supabase
        .from("admissions")
        .select("*")
        .order("created_at", { ascending: false })
      if (admErr) throw admErr
      setAdmissions(admData || [])
    } catch (error) {
      console.error(error)
      toast({ title: "त्रुटि!", description: "डेटा लोड करने में समस्या हुई।", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    router.push("/admin")
  }

  const saveAnnouncement = async () => {
    if (!eventName.trim() || !driveLink.trim()) {
      toast({
        title: "त्रुटि!",
        description: "कृपया कार्यक्रम का नाम और Google Drive लिंक दोनों भरें।",
        variant: "destructive",
      })
      return
    }
    setSaving(true)
    try {
      if (announcement?.id) {
        const { error } = await supabase
          .from("event_announcements")
          .update({
            event_name: eventName.trim(),
            pdf_link: driveLink.trim(),
            pdf_path: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", announcement.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("event_announcements").insert([
          {
            event_name: eventName.trim(),
            pdf_link: driveLink.trim(),
            pdf_path: null,
          },
        ])
        if (error) throw error
      }

      toast({ title: "सफल!", description: t("admin.announce.updated") })
      setEditingAnnouncement(false)
      await fetchData()
    } catch (e: any) {
      toast({
        title: "त्रुटि!",
        description: e?.message || "घोषणा सहेजने में समस्या हुई।",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    )
  }

  const currentPdfUrl = getPublicUrl("announcements", announcement?.pdf_path)
  const currentDriveUrl = (announcement as any)?.pdf_link?.trim()
  const currentLink = currentDriveUrl || currentPdfUrl || undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{t("admin.dash.title")}</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              लॉगआउट
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Contact Submissions */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <Users className="h-6 w-6 mr-2 text-saffron-600" />
              {t("admin.contacts")} ({contacts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {contacts.map((c) => (
                <div key={c.id} className="rounded-lg border bg-white p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">{c.subh_naam}</p>
                  <p className="text-gray-600 text-sm">{c.vishay}</p>
                  <p className="text-gray-700 mt-2">{c.sandesh}</p>
                  <div className="text-xs text-gray-500 mt-3 flex justify-between">
                    <span>{c.phone_number}</span>
                    <span>{new Date(c.created_at!).toLocaleString("hi-IN")}</span>
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <div className="text-center text-gray-500 py-6">कोई संपर्क विवरण उपलब्ध नहीं</div>}
            </div>
          </CardContent>
        </Card>

        {/* Announcement Management (Drive link only) */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-gray-800">
              <div className="flex items-center">
                <Megaphone className="h-6 w-6 mr-2 text-saffron-600" />
                {t("admin.announce.mgmt")}
              </div>
              {!editingAnnouncement && (
                <Button
                  size="sm"
                  onClick={() => setEditingAnnouncement(true)}
                  className="bg-saffron-600 hover:bg-saffron-700"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  संपादित करें
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingAnnouncement ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("admin.announce.name")}</label>
                  <Input
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="कार्यक्रम का नाम"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("admin.announce.link")}</label>
                  <Input
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">कृपया सार्वजनिक रूप से एक्सेसिबल Google Drive लिंक दें।</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={saveAnnouncement}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-60"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {saving ? "सहेजा जा रहा है..." : t("admin.announce.save")}
                  </Button>
                  <Button onClick={() => setEditingAnnouncement(false)} variant="outline">
                    <X className="h-4 w-4 mr-1" />
                    {t("admin.announce.cancel")}
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="bg-saffron-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">वर्तमान घोषणा:</h3>
                  <p className="text-lg">{announcement?.event_name || "कोई घोषणा नहीं"}</p>
                </div>
                {currentLink && (
                  <a
                    href={currentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 hover:underline"
                  >
                    <FileText className="h-4 w-4" /> लिंक देखें/डाउनलोड करें
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admissions as Cards */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              {t("admin.admissions")} ({admissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {admissions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">कोई प्रवेश आवेदन उपलब्ध नहीं</div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {admissions.map((a) => {
                  const url = getPublicUrl("admissions", a.photo_path)
                  return (
                    <div key={a.id} className="rounded-xl overflow-hidden border bg-white shadow-md">
                      <div className="relative w-full h-64 bg-gray-100">
                        {url ? (
                          <Image src={url || "/placeholder.svg"} alt={a.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="p-4 space-y-2 text-sm">
                        <p className="text-lg font-bold text-gray-900">{a.name}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Info label="माता" value={a.mother_name} />
                          <Info label="पिता" value={a.father_name} />
                          <Info label="जन्म तिथि" value={new Date(a.dob).toLocaleDateString("hi-IN")} />
                          <Info label="वर्तमान शिक्षा" value={a.wartaman_shiksha} />
                          <Info label="पूर्व शिक्षा" value={a.poorv_shiksha} />
                          <Info label="कार्यशाला" value={a.workshop} />
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-700">
                            <span className="font-semibold">पता: </span>
                            {a.sthayi_pata}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="text-gray-700">
                            <span className="font-semibold">कारण: </span>
                            {a.reason}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          जमा दिनांक: {new Date(a.created_at!).toLocaleString("hi-IN")}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-gray-700">
      <span className="font-semibold">{label}: </span>
      <span className="break-words">{value}</span>
    </p>
  )
}
