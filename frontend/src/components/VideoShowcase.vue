<script setup lang="ts">
import truckPoster from '../assets/truck.jpg'
import customsPoster from '../assets/customs-docs.png'

const showcases = [
  {
    image: truckPoster,
    title: 'Sur les routes du Katanga',
    sub: 'Convois & transport routier',
  },
  {
    image: customsPoster,
    title: 'Aux postes frontaliers',
    sub: 'Dédouanement & inspection',
  },
]
</script>

<template>
  <section class="bg-slate-950 py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-400">
          En images
        </p>
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          La logistique africaine, vue de l'intérieur et partout en RDC
        </h2>
        <p class="mt-4 text-base text-slate-400">
          De Lubumbashi aux postes frontaliers <br>un aperçu de notre quotidien.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="item in showcases"
          :key="item.title"
          class="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6">
            <p class="text-xs font-medium uppercase tracking-wider text-amber-300">{{ item.sub }}</p>
            <h3 class="mt-1 text-xl font-bold text-white">{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
