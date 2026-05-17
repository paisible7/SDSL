<script setup lang="ts">
import Navbar from './Navbar.vue'
import HeroSection from './HeroSection.vue'
import Banner from './Banner.vue'
import VideoShowcase from './VideoShowcase.vue'
import ServicesSection from './ServicesSection.vue'
import HowItWorks from './HowItWorks.vue'
import AboutSection from './AboutSection.vue'
import ContactSection from './ContactSection.vue'
import Footer from './Footer.vue'

const whatsappUrl = 'https://wa.me/243900080902'
</script>

<template>
  <div class="min-h-screen bg-white text-slate-900 font-sans antialiased">
    <Navbar :whatsapp-url="whatsappUrl" />
    <main>
      <HeroSection :whatsapp-url="whatsappUrl" />
      <Banner />
      <VideoShowcase />
      <ServicesSection />
      <HowItWorks />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

