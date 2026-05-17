<script setup lang="ts">
defineProps({
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: null },
})
</script>

<template>
  <div
    class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
  >
    <div v-if="image" class="relative h-48 w-full overflow-hidden">
      <img
        :src="image"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
      <div
        class="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-blue-900 shadow-md backdrop-blur"
      >
        <component :is="icon" class="h-5 w-5" :stroke-width="2" />
      </div>
    </div>
    <div v-else class="mb-4 flex p-6 pb-0 items-center justify-center">
       <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
        <component :is="icon" class="h-5 w-5" :stroke-width="2" />
      </div>
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h4 class="text-lg font-bold text-slate-900">{{ title }}</h4>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ description }}</p>
    </div>
  </div>
</template>

