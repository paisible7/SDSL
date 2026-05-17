<script setup lang="ts">
import { FileCheck, FileText, Ship, Printer, PenTool, Paintbrush } from 'lucide-vue-next'
import { markRaw } from 'vue'
import ServiceCard from './ServiceCard.vue'

import customsImg from '../assets/customs-docs.png'
import containersImg from '../assets/containers.jpg'
import planeImg from '../assets/cargo-plane.jpg'
import cyberImg from '../assets/cyber.jpg'
import designImg from '../assets/design.jpg'
import paintingImg from '../assets/painting.png'

const customsServices = [
  {
    icon: markRaw(FileCheck),
    title: 'Facilitation FERI',
    description: "Obtention rapide et sécurisée de votre Fiche Électronique de Renseignement à l'Importation.",
    image: customsImg,
  },
  {
    icon: markRaw(FileText),
    title: 'Fere & AD',
    description: 'Accompagnement complet pour vos documents FERE et Attestations de Destination.',
    image: containersImg,
  },
  {
    icon: markRaw(Ship),
    title: 'Services douaniers',
    description: "Assistance professionnelle pour vos opérations d'import et d'export.",
    image: planeImg,
  },
]

const proximityServices = [
  {
    icon: markRaw(Printer),
    title: 'Cyber et bureautique',
    description: 'Impression, photocopie, saisie et création de documents administratifs.',
    image: cyberImg,
  },
  {
    icon: markRaw(PenTool),
    title: 'Design graphique',
    description: "Conception d'affiches, logos et supports visuels pour votre activité.",
    image: designImg,
  },
  {
    icon: markRaw(Paintbrush),
    title: 'Peinture & logistique',
    description: 'Service de peinture et petits travaux logistiques sur demande.',
    image: paintingImg,
  },
]
</script>

<template>
  <section id="services" class="border-b border-slate-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Nos services
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Une expertise complète pour vos besoins
          <span class="text-blue-900">administratifs &amp; logistiques</span>
        </h2>
        <p class="mt-4 text-base text-slate-600">
          De la facilitation douanière aux services de proximité un seul partenaire de confiance.
        </p>
      </div>

      <div class="mt-16">
        <div class="mb-8 flex items-center gap-4">
          <span class="h-px flex-1 bg-slate-200"></span>
          <h3 class="text-sm font-bold uppercase tracking-wider text-blue-900">
            Douane &amp; Administration
          </h3>
          <span class="h-px flex-1 bg-slate-200"></span>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ServiceCard
            v-for="s in customsServices"
            :key="s.title"
            :icon="s.icon"
            :title="s.title"
            :description="s.description"
            :image="s.image"
          />
        </div>
      </div>

      <div class="mt-20">
        <div class="mb-8 flex items-center gap-4">
          <span class="h-px flex-1 bg-slate-200"></span>
          <h3 class="text-sm font-bold uppercase tracking-wider text-blue-900">
            Services de Proximité
          </h3>
          <span class="h-px flex-1 bg-slate-200"></span>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ServiceCard
            v-for="s in proximityServices"
            :key="s.title"
            :icon="s.icon"
            :title="s.title"
            :description="s.description"
            :image="s.image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

