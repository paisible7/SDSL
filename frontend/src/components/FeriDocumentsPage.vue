<script setup lang="ts">
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { FileText, Truck, Ship, RefreshCw, BookOpen, ChevronRight, FileCheck } from 'lucide-vue-next'

const whatsappUrl = 'https://wa.me/243900080902'

const roadDocuments = [
  "La facture commerciale",
  "La liste de colisage (PACKING LIST)",
  "Le document de transport ou le Road manifest",
  "La déclaration en douane du pays d'où la marchandise vient ou la déclaration de transit pour ce qui est routier pour la sous-région."
]

const seaAirDocuments = [
  "La facture commerciale",
  "La liste de colisage",
  "Le BL ou la LTA : bill of lading qui est le document de connaissance maritime dont un ticket de transport et qui fait déjà office de la déclaration de marchandises",
  "Le document de transport"
]

const continuityDocuments = [
  "Le certificat final de la FERI",
  "Le document de transport routier",
  "La facture",
  "Le manifeste",
  "Le packing list"
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900">
    <Navbar :whatsapp-url="whatsappUrl" />
    
    <main class="flex-grow pt-24 pb-16">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-12 text-center">
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-4">
            Documents requis pour la <span class="text-blue-700">FERI</span>
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Pour faciliter et accélérer le traitement de votre dossier, voici la liste des documents que vous devez nous fournir selon votre type de transport.
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2 mb-12">
          <!-- Voie Routière -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-all hover:shadow-md">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Truck class="h-6 w-6" />
              </div>
              <h2 class="text-xl font-bold text-slate-800">Voie Routière</h2>
            </div>
            <ul class="space-y-4">
              <li v-for="(doc, index) in roadDocuments" :key="index" class="flex gap-3">
                <div class="mt-1 flex-shrink-0 text-blue-600">
                  <FileCheck class="h-5 w-5" />
                </div>
                <span class="text-slate-700 leading-relaxed">{{ doc }}</span>
              </li>
            </ul>
          </div>

          <!-- Voie Maritime ou Aérienne -->
          <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-all hover:shadow-md">
            <div class="flex items-center gap-4 mb-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Ship class="h-6 w-6" />
              </div>
              <h2 class="text-xl font-bold text-slate-800">Voie Maritime ou Aérienne</h2>
            </div>
            <ul class="space-y-4">
              <li v-for="(doc, index) in seaAirDocuments" :key="index" class="flex gap-3">
                <div class="mt-1 flex-shrink-0 text-blue-600">
                  <FileCheck class="h-5 w-5" />
                </div>
                <span class="text-slate-700 leading-relaxed">{{ doc }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- FERI de Continuité -->
        <div class="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 shadow-lg text-white mb-12 relative overflow-hidden">
          <div class="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <RefreshCw class="h-64 w-64" />
          </div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <RefreshCw class="h-6 w-6 text-white" />
              </div>
              <h2 class="text-2xl font-bold">FERI de Continuité</h2>
            </div>
            <div class="bg-white/10 rounded-xl p-5 mb-8 backdrop-blur-sm border border-white/20">
              <p class="text-blue-100 leading-relaxed">
                C'est lorsque nous souscrivons à une FERI maritime ou aérienne et que la marchandise accoste dans un pays de la sous-région et on veut continuer sur la voie routière. Elle est obtenue qu'après avoir fait la FERI principale.
              </p>
            </div>
            
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen class="h-5 w-5 text-amber-400" />
              Documents nécessaires :
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
              <div v-for="(doc, index) in continuityDocuments" :key="index" class="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                <ChevronRight class="h-4 w-4 text-amber-400" />
                <span class="text-slate-200">{{ doc }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Home -->
        <div class="flex justify-center mt-12 mb-8">
          <router-link to="/" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300 transition-colors">
            <ChevronRight class="h-4 w-4 rotate-180" />
            Retour à l'accueil
          </router-link>
        </div>

      </div>
    </main>
    
    <Footer />
  </div>
</template>
