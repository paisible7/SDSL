export type ContactPayload = {
  name: string
  phone: string
  email?: string
  subject: string
  message: string
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const ENDPOINT = API_BASE
  ? `${API_BASE}/api/contact/email`
  : '/api/contact/email'

export async function sendEmail(payload: ContactPayload) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(
      err.message || err.error || `Échec de l'envoi d'e-mail (${res.status})`,
    )
  }

  return res.json()
}
