<template>
  <section ref="section" class="slider-section" v-if="images.length">
    <div class="slider-container" :style="{ height: sliderHeight }">

      <!-- 🔹 Soft Fade oben & unten -->
      <div class="fade-top"></div>
      <div class="fade-bottom"></div>

      <!-- 🔹 Optionaler zentrierter Titel -->
      <div v-if="title" class="slider-title" :style="{ opacity: titleOpacity }">
        {{ title }}
      </div>

      <!-- 🔹 Track der horizontal scrollt -->
      <div
        ref="track"
        class="slider-track"
        :style="{ opacity: imageOpacity, filter: grayscale ? 'grayscale(100%)' : 'none' }"
      >
        <div v-for="(img, i) in images" :key="i" class="slide">
          <img :src="img.src" :alt="img.alt || `slide-${i}`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { projects } from "@/data/projectsData.js"

gsap.registerPlugin(ScrollTrigger)

// ------------------ Props ------------------
const props = defineProps({
  projectId: { type: Number, required: true },
  maxImages: { type: Number, default: 999 },

  title: { type: String, default: "" },
  titleOpacity: { type: Number, default: 1 },
  imageOpacity: { type: Number, default: 1 },

  grayscale: { type: Boolean, default: false },

  sliderHeight: { type: String, default: "100vh" }, // z.B. "50vh"
})

const section = ref(null)
const track = ref(null)
const images = ref([])

let scrollTriggerInstance = null

// ------------------ Bilder laden ------------------
function loadImages() {
  const project = projects.find((p) => p.id === props.projectId)
  if (!project) return (images.value = [])

  const gallery = project.sections.find((s) => s.type === "imageGallery")
  if (!gallery) return (images.value = [])

  images.value = gallery.images.slice(0, props.maxImages)
}

// ------------------ GSAP Scroll ------------------
function initScroll() {
  if (!section.value || !track.value) return

  if (scrollTriggerInstance) scrollTriggerInstance.kill()

  const slides = track.value.querySelectorAll(".slide")
  const slideWidth = window.innerWidth * 0.5 // 50vw
  const totalScroll = slides.length * slideWidth - window.innerWidth

  gsap.set(track.value, { x: 0 })

  scrollTriggerInstance = gsap.to(track.value, {
    x: -totalScroll,
    ease: "none",
    scrollTrigger: {
      trigger: section.value,
      start: "top top",
      end: () => `+=${totalScroll}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers: false,
    },
  })
}

onMounted(() => {
  loadImages()
  setTimeout(initScroll, 150)
  window.addEventListener("resize", ScrollTrigger.refresh)
})

onUnmounted(() => {
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
  ScrollTrigger.refresh()
})

watch(() => props.projectId, () => {
  loadImages()
  setTimeout(initScroll, 150)
})
</script>

<style scoped>
/* ============================
   Layout & Container
============================ */
.slider-section {
  width: 100vw;
  position: relative;
  margin-left: calc(50% - 50vw); /* echtes Full-Bleed */
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100vw;
  overflow: hidden;
}

/* ============================
   Fade Top & Bottom
============================ */
.fade-top,
.fade-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 25%; /* oberes & unteres Viertel */
  z-index: 20;
  pointer-events: none;
}

.fade-top {
  top: 0;
  background: linear-gradient(to bottom, var(--bg-color) 0%, transparent 80%);
}

.fade-bottom {
  bottom: 0;
  background: linear-gradient(to top, var(--bg-color) 0%, transparent 0%);
}

/* ============================
   Optionaler Titel
============================ */
.slider-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--primaryFont);
  font-size: 1.3rem;
  font-weight: 600;
  z-index: 30;
  pointer-events: none;
  background-color: var(--bg-color);
  padding: 5px 8px;
}

/* ============================
   Slides
============================ */
.slider-track {
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
  transition: opacity 0.3s ease;
}

.slide {
  flex: 0 0 50vw;
  height: 100%;
  overflow: hidden;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.slide:hover img {
  transform: scale(1.05);
}
</style>
