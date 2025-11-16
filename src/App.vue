<script setup>
import MainNav from '@/components/navigation/MainNav.vue'
import Footer from '@/components/navigation/Footer.vue'
</script>

<template>
  <header>
    <MainNav />
  </header>

  <transition appear name="cine" mode="out-in">
    <router-view />
  </transition>

  <Footer />
</template>

<style>
/* CINEMATIC PAGE TRANSITION */
/* entering */
.cine-enter-active {
  animation: cineFadeIn 0.6s ease forwards;
}

/* leaving */
.cine-leave-active {
  animation: cineFadeOut 0.5s ease forwards;
}

/* keyframes */
@keyframes cineFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(8px);
  }
  60% {
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cineFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
    filter: blur(4px);
  }
}
</style>
