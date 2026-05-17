<script setup lang="ts">
import containers from '../assets/containers.jpg'
import truck from '../assets/truck.jpg'
import plane from '../assets/cargo-plane.jpg'

const items = [
  { img: truck, label: 'Transport routier', sub: 'Camions & convois' },
  { img: containers, label: 'Fret maritime', sub: 'Conteneurs & ports' },
  { img: plane, label: 'Fret aérien', sub: 'Cargo & logistique' },
]
</script>

<template>
  <section class="relative bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Notre champ d'action
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Route, mer, air <br>
          nous couvrons toute la chaîne
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="item in items"
          :key="item.label"
          class="group relative overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200"
        >
          <img
            :src="item.img"
            :alt="item.label"
            class="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6">
            <p class="text-xs font-medium uppercase tracking-wider text-amber-300">{{ item.sub }}</p>
            <h3 class="mt-1 text-xl font-bold text-white">{{ item.label }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
