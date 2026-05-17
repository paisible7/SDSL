<script setup lang="ts">
import truckPoster from '../assets/truck.jpg'
import customsPoster from '../assets/customs-docs.png'

const heroVideo = "/__l5e/assets-v1/6946cba5-b1d2-46f5-942a-8c569b342c1f/hero-africa.mp4"
const customsVideo = "/__l5e/assets-v1/62289fcb-d2b3-417a-a30b-64498f14b97e/customs-africa.mp4"

const videos = [
  {
    src: heroVideo,
    poster: truckPoster,
    title: 'Sur les routes du Katanga',
    sub: 'Convois & transport routier',
  },
  {
    src: customsVideo,
    poster: customsPoster,
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
          La logistique africaine, vue de l'intérieur
        </h2>
        <p class="mt-4 text-base text-slate-400">
          De Lubumbashi aux postes frontaliers <br>un aperçu de notre quotidien.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="v in videos"
          :key="v.title"
          class="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl"
        >
          <video
            :src="v.src"
            :poster="v.poster"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            class="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          ></video>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6">
            <p class="text-xs font-medium uppercase tracking-wider text-amber-300">{{ v.sub }}</p>
            <h3 class="mt-1 text-xl font-bold text-white">{{ v.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
