import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton client
let _client: ReturnType<typeof createClient> | null = null
export function getSupabase() {
  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _client
}
export const supabase = getSupabase()

export type ContactSubmission = {
  id?: string
  subh_naam: string
  vishay: string
  phone_number: string
  sandesh: string
  created_at?: string
}

export type EventAnnouncement = {
  id?: string
  event_name: string
  pdf_link?: string | null
  pdf_path?: string | null
  created_at?: string
  updated_at?: string
}

export type Admission = {
  id?: string
  name: string
  mother_name: string
  father_name: string
  dob: string
  photo_path: string
  sthayi_pata: string
  wartaman_shiksha: string
  poorv_shiksha: string
  reason: string
  workshop: string
  created_at?: string
}

export function getPublicUrl(bucket: string, path: string | null | undefined) {
  if (!path) return null
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
