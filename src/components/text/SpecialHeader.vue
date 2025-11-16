<template>
  <header class="special-header">
    <!-- Left Image -->
    <div class="header-image left" v-if="images[0]">
      <img :src="images[0].src" alt="" />
    </div>

    <!-- Center Title -->
    <div class="header-center">
      <h1 class="header-title">{{ title }}</h1>
      <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>

      <button v-if="cta" class="header-cta" type="button" @click="scrollToProject">
        {{ cta.text }} <span class="arrow">↓</span>
      </button>
    </div>

    <!-- Right Image -->
    <div class="header-image right" v-if="images[1]">
      <img :src="images[1].src" alt="" />
    </div>

    <!-- EXTRA FLOATING IMAGE -->
    <div class="header-image extra" v-if="images[2]" ref="imgExtra">
      <img :src="images[2].src" alt="" />
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  project: { type: Object, required: true },
})

/**
 * BILDER-LOGIK:
 * 1. Wenn project.sections vorhanden → nimm imageGallery (wie bei Projekten)
 * 2. Sonst: wenn project.images existiert → nimm die (für Skills-Seite)
 */
const images = computed(() => {
  // Fall 1: normales Projekt mit sections & imageGallery
  if (props.project?.sections) {
    const gallery = props.project.sections.find((s) => s.type === 'imageGallery')
    if (gallery && Array.isArray(gallery.images)) {
      return gallery.images.slice(0, 3)
    }
  }

  // Fall 2: Skills-Seite – hat ein `images`-Array direkt am project
  if (Array.isArray(props.project?.images)) {
    return props.project.images.slice(0, 3)
  }

  return []
})

const title = computed(() => props.project.header?.title || props.project.title || '')
const subtitle = computed(() => props.project.header?.subtitle || props.project.subtitle || '')
const cta = computed(() => props.project.header?.cta || props.project.cta || null)

const scrollToProject = () => {
  const el = document.getElementById('project')
  if (!el) return
  const offset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

const imgExtra = ref(null)

onMounted(() => {
  if (!imgExtra.value) return

  gsap.fromTo(
    imgExtra.value,
    { y: -20 },
    {
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: imgExtra.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.4,
      },
    },
  )
})
</script>

<style scoped>
/* ============================
   DESKTOP LAYOUT
============================ */
.special-header {
  width: 100%;
  padding: 8rem 2rem 2rem 2rem;
  gap: 2rem;
  position: relative;
  text-align: center;
}

.header-image img {
  width: 200px;
  height: 200px;
  border-radius: 2px;
  object-fit: cover;
  position: absolute;
}

/* Existing floating positions (unchanged) */
.left img {
  top: 100px;
  left: -100px;
  z-index: -1;
}

.right img {
  bottom: 0;
  left: 0px;
  z-index: -1;
}

/* EXTRA FLOATING IMAGE right side */
.extra img {
  width: 130px;
  height: 130px;
  bottom: 0;
  right: 0px;
  border-radius: 2px;
  opacity: 0.9;
  z-index: -2;
}

/* Title */
.header-title {
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 1;
  font-weight: 500;
}

/* Subtitle */
.header-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  opacity: 0.75;
}
/* CTA Button */
.header-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  border: none;
  background: transparent;
  cursor: pointer;

  color: var(--accent-color);
  font: inherit;

  transition: color 0.25s ease;
}

/* 🔥 Animated underline (wie bei deinen Links) */
.header-cta::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: rgb(255, 111, 97);
  transition: width 0.3s ease-in-out;
}

/* Hover: animiert Unterstrich */
.header-cta:hover::after {
  width: 100%;
}

.arrow {
  font-size: 1.4rem;
}

@media (max-width: 600px) {
  .left img {
    display: none;
  }
  .header-image img {
    padding-top: 40px;
    opacity: 1;
    position: relative;
  }

  .extra {
    display: none;
  }

  .special-header {
    padding: 8rem 0 0 0;
  }

  .header-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
