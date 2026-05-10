<script setup lang="ts">
import { FileCheck, FileText, Ship, Printer, PenTool, Paintbrush } from 'lucide-vue-next'
import { markRaw } from 'vue'
import ServiceCard from './ServiceCard.vue'

const customsServices = [
  {
    icon: markRaw(FileCheck),
    title: 'Facilitation FERI',
    description: "Obtention rapide et sécurisée de votre Fiche Électronique de Renseignement à l'Importation.",
  },
  {
    icon: markRaw(FileText),
    title: 'Fere & AD',
    description: 'Accompagnement complet pour vos documents FERE et Attestations de Destination.',
  },
  {
    icon: markRaw(Ship),
    title: 'Services douaniers',
    description: "Assistance professionnelle pour vos opérations d'import et d'export.",
  },
]

const proximityServices = [
  {
    icon: markRaw(Printer),
    title: 'Cyber et bureautique',
    description: 'Impression, photocopie, saisie et création de documents administratifs.',
  },
  {
    icon: markRaw(PenTool),
    title: 'Design graphique',
    description: "Conception d'affiches, logos et supports visuels pour votre activité.",
  },
  {
    icon: markRaw(Paintbrush),
    title: 'Peinture & logistique',
    description: 'Service de peinture et petits travaux logistiques sur demande.',
  },
]
</script>

<template>
  <section id="services" class="border-b border-slate-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Nos services
        </h2>
        <p class="mt-4 text-base text-slate-600">
          Une expertise complète pour répondre à vos besoins administratifs et de proximité.
        </p>
      </div>

      <div class="mt-16">
        <h3 class="mb-6 text-sm font-semibold uppercase tracking-wider text-blue-700">
          Douane &amp; Administration
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ServiceCard
            v-for="s in customsServices"
            :key="s.title"
            :icon="s.icon"
            :title="s.title"
            :description="s.description"
          />
        </div>
      </div>

      <div class="mt-16">
        <h3 class="mb-6 text-sm font-semibold uppercase tracking-wider text-blue-700">
          Services de Proximité
        </h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ServiceCard
            v-for="s in proximityServices"
            :key="s.title"
            :icon="s.icon"
            :title="s.title"
            :description="s.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>
