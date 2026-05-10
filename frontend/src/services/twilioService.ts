export type ContactPayload = {
  name: string
  phone: string
  email?: string
  subject: string
  message: string
}

const ENDPOINT = import.meta.env.VITE_CONTACT_WHATSAPP_ENDPOINT || '/api/contact/whatsapp'

export async function sendWhatsAppMessage(payload: ContactPayload) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Échec de l'envoi WhatsApp (${res.status})`)
  }

  return res.json()
}
