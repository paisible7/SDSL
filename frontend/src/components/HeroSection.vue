<script setup lang="ts">
import { onMounted, ref } from 'vue'
import heroImage from '../assets/hero-banner.jpg'
import { ShieldCheck, Clock, Award } from 'lucide-vue-next'

const heroVideo = "/__l5e/assets-v1/6946cba5-b1d2-46f5-942a-8c569b342c1f/hero-africa.mp4"

defineProps({
  whatsappUrl: { type: String, required: true },
})

const fullText = 'Votre partenaire fiable pour vos démarches douanières et logistiques.'
const displayText = ref('')
const typingSpeed = 70 // Milliseconds per character

onMounted(() => {
  let i = 0
  const typingInterval = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typingInterval)
    }
  }, typingSpeed)
})
</script>

<template>
  <section id="accueil" class="relative overflow-hidden bg-slate-950">
    <!-- Background video (with image fallback as poster) -->
    <div class="absolute inset-0">
      <video
        :src="heroVideo"
        :poster="heroImage"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        class="h-full w-full object-cover opacity-50"
      ></video>
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-blue-950/70"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div class="mx-auto max-w-4xl text-center">
        <p
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
          Lubumbashi · Kipushi
        </p>
        <h1 class="min-h-[120px] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {{ displayText }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Nous accompagnons particuliers, transitaires et entreprises pour les démarches FERI, FERE et AD avec rapidité,
          rigueur et sécurité.
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-12 w-full items-center justify-center rounded-md bg-amber-500 px-8 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 sm:w-auto"
          >
            Lancer une démarche
          </a>
          <a
            href="#services"
            class="inline-flex h-12 w-full items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
          >
            Découvrir nos services
          </a>
        </div>

        <!-- Trust indicators -->
        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div class="flex items-center justify-center gap-3 text-slate-300">
            <ShieldCheck class="h-5 w-5 text-amber-400" />
            <span class="text-sm font-medium">Sécurisé &amp; conforme</span>
          </div>
          <div class="flex items-center justify-center gap-3 text-slate-300">
            <ShieldCheck class="h-5 w-5 text-amber-400" />
            <span class="text-sm font-medium">Traitement rapide</span>
          </div>
          <div class="flex items-center justify-center gap-3 text-slate-300">
            <ShieldCheck class="h-5 w-5 text-amber-400" />
            <span class="text-sm font-medium">Expertise reconnue</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

