export type ContactPayload = {
  name: string
  phone: string
  email?: string
  subject: string
  message: string
}

const WHATSAPP_NUMBER = (
  import.meta.env.VITE_WHATSAPP_NUMBER || '243900080902'
).replace(/\D/g, '')

function buildWhatsAppMessage(payload: ContactPayload) {
  const lines = [
    'Bonjour SDSL,',
    '',
    `Je suis ${payload.name} (${payload.phone}).`,
    `Sujet : ${payload.subject}`,
    '',
    payload.message,
  ]

  if (payload.email?.trim()) {
    lines.splice(3, 0, `Email : ${payload.email.trim()}`)
  }

  return lines.join('\n')
}

export function buildWhatsAppUrl(payload: ContactPayload) {
  const text = encodeURIComponent(buildWhatsAppMessage(payload))
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function openWhatsAppChat(payload: ContactPayload) {
  window.open(buildWhatsAppUrl(payload), '_blank', 'noopener,noreferrer')
}
