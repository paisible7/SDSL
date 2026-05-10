<script setup lang="ts">
import ContactForm from './ContactForm.vue'
import { MapPin, Phone, Mail, Clock } from 'lucide-vue-next'

interface ContactInfo {
  icon: any
  label: string
  value: string
}

const contactInfo: ContactInfo[] = [
  { icon: Phone, label: 'Téléphone / WhatsApp', value: '+243 900 080 902' },
  { icon: Mail, label: 'Email', value: 'contact@adsl-rdc.com' },
  { icon: MapPin, label: 'Lubumbashi', value: 'Avenue Mama Yemo, Commune de Lubumbashi' },
  { icon: MapPin, label: 'Kipushi', value: 'Avenue de la Frontière, Kipushi' },
  { icon: Clock, label: 'Horaires', value: 'Lun – Sam : 08h00 – 18h00' },
]
</script>

<template>
  <section id="contact" class="border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <header class="max-w-2xl mb-12">
        <p class="text-sm font-semibold text-blue-700 uppercase tracking-wide">Contact</p>
        <h2 class="mt-2 text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          Parlons de votre dossier
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          Envoyez-nous un message et notre équipe vous répond rapidement par WhatsApp ou par email.
        </p>
      </header>

      <div class="grid gap-12 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <ContactForm />
        </div>

        <aside class="lg:col-span-2 space-y-6">
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            class="flex items-start gap-4 rounded-lg border border-slate-200 p-5"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700"
            >
              <component :is="info.icon" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ info.label }}</p>
              <p class="text-sm text-slate-600">{{ info.value }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
