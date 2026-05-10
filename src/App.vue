<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import HowItWorks from './components/HowItWorks.vue'
import AboutSection from './components/AboutSection.vue'
import Footer from './components/Footer.vue'

const whatsappUrl = 'https://wa.me/243900080902'
</script>

<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans antialiased">
    <Navbar :whatsapp-url="whatsappUrl" />
    <main>
      <HeroSection :whatsapp-url="whatsappUrl" />
      <ServicesSection />
      <HowItWorks />
      <AboutSection />
    </main>
    <Footer />
  </div>
</template>
