<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const values = [
  'Expertise locale à Lubumbashi et Kipushi',
  'Rigueur et conformité dans chaque démarche',
  'Transparence totale sur les délais et les coûts',
  'Satisfaction client au cœur de notre métier',
]
</script>

<template>
  <section id="about" class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            À propos d'SDSL
          </h2>
          <p class="mt-6 text-base leading-relaxed text-slate-600">
            Société Delta Service Logistique (SDSL) est une structure dédiée à la facilitation
            douanière et administrative au Katanga. Forts d'une connaissance approfondie du
            terrain, nous accompagnons nos clients particuliers, transitaires et entreprises
            avec une approche rigoureuse et transparente.
          </p>
          <p class="mt-4 text-base leading-relaxed text-slate-600">
            Notre engagement : vous offrir un service fiable, rapide et sécurisé pour
            chacune de vos démarches.
          </p>
        </div>

        <ul class="space-y-4">
          <li
            v-for="value in values"
            :key="value"
            class="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-4"
          >
            <Check class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-700" :stroke-width="2.5" />
            <span class="text-sm font-medium text-slate-900">{{ value }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

