// Simple authentication for admin panel
export const ADMIN_CREDENTIALS = {
  email: "admin@vedic-ngo.org",
  password: "VedicAdmin@2024",
}

export function validateAdmin(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}
