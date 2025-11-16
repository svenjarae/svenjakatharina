<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainNav from '@/components/navigation/MainNav.vue'
import Footer from '@/components/navigation/Footer.vue'
</script>

<template>
  <header>
    <MainNav></MainNav>
  </header>

  <transition name="fade">
    <router-view />
  </transition>

  <Footer></Footer>
</template>

<style scoped>
/* Add fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
