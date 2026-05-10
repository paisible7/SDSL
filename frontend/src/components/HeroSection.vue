<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  whatsappUrl: { type: String, required: true },
})

const router = useRouter()
const fullText =
  'Votre partenaire fiable pour toutes vos démarches administratives et services logistiques à Lubumbashi et Kipushi.'
const displayText = ref('')
const typingSpeed = 100 // Milliseconds per character

onMounted(() => {
  let i = 0
  const typingInterval = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typingInterval)
      const cursor = document.querySelector('.typing-cursor')
      if (cursor) {
        cursor.style.display = 'none'
      }
    }
  }, typingSpeed)
})

function scrollToServices() {
  const el = document.getElementById('services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section id="accueil" class="border-b border-slate-200 bg-slate-50">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div class="mx-auto max-w-4xl text-center">
        <p
          class="mb-5 inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
        >
          Lubumbashi · Kipushi
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {{ displayText }}<span class="typing-cursor"></span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Nous accompagnons particuliers, transitaires et entreprises pour les démarches FERI, FERE
          et AD avec rapidité et sécurité.
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-700 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-800 sm:w-auto"
          >
            Lancer une démarche
          </a>
          <button
            @click="scrollToServices"
            class="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 sm:w-auto"
          >
            Découvrir nos services
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
