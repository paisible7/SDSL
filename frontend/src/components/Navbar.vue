<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps({
  whatsappUrl: { type: String, required: true },
})

const router = useRouter()

interface NavLink {
  label: string
  id: string
}

const links: NavLink[] = [
  { label: 'Accueil', id: 'accueil' },
  { label: 'Services', id: 'services' },
  { label: 'Comment ça marche', id: 'process' },
  { label: 'À propos', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <router-link to="/" class="text-xl font-bold tracking-tight text-slate-900">SDSL</router-link>

      <nav class="hidden items-center gap-8 md:flex">
        <button
          v-for="link in links"
          :key="link.id"
          @click="scrollToSection(link.id)"
          class="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
        >
          {{ link.label }}
        </button>
      </nav>

      <button
        @click="scrollToSection('contact')"
        class="inline-flex h-9 items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-800"
      >
        Contactez-nous
      </button>
    </div>
  </header>
</template>
