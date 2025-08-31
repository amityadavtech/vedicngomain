"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User } from "lucide-react"
import { validateAdmin } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (validateAdmin(credentials.email, credentials.password)) {
        // Set session in localStorage (simple implementation)
        localStorage.setItem("admin_session", "authenticated")
        toast({
          title: "लॉगिन सफल!",
          description: "आपको एडमिन डैशबोर्ड पर भेजा जा रहा है।",
        })
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "लॉगिन असफल!",
          description: "गलत ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "त्रुटि!",
        description: "लॉगिन में समस्या हुई। कृपया पुनः प्रयास करें।",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="bg-saffron-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Lock className="h-10 w-10 text-saffron-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">एडमिन लॉगिन</CardTitle>
          <p className="text-gray-600">एडमिन पैनल में प्रवेश के लिए लॉगिन करें</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ईमेल</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                  placeholder="admin@vedic-ngo.org"
                  className="pl-10 border-gray-300 focus:border-saffron-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">पासवर्ड</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  placeholder="पासवर्ड दर्ज करें"
                  className="pl-10 border-gray-300 focus:border-saffron-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-saffron-600 hover:bg-saffron-700 text-white py-3"
            >
              {loading ? "लॉगिन हो रहा है..." : "लॉगिन करें"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              डेमो क्रेडेंशियल्स:
              <br />
              Email: admin@vedic-ngo.org
              <br />
              Password: VedicAdmin@2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
