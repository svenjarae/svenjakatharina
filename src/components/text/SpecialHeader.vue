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

/* ----------------------------------------------
   IMAGE LOGIC
---------------------------------------------- */
const images = computed(() => {
  // Case 1: Project with sections → use imageGallery
  if (props.project?.sections) {
    const gallery = props.project.sections.find((s) => s.type === 'imageGallery')
    if (gallery && gallery.images) return gallery.images.slice(0, 3)
  }

  // Case 2: Skills page → project.images is directly provided
  if (Array.isArray(props.project?.images)) {
    return props.project.images.slice(0, 3)
  }

  return []
})

const title = computed(() => props.project.title || props.project.header?.title || '')
const subtitle = computed(() => props.project.subtitle || props.project.header?.subtitle || '')
const cta = computed(() => props.project.cta || props.project.header?.cta || null)

/* ----------------------------------------------
   SCROLL TO #project
---------------------------------------------- */
const scrollToProject = () => {
  const el = document.getElementById('project')
  if (!el) return
  const offset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

/* ----------------------------------------------
   GSAP FLOATING IMAGE
---------------------------------------------- */
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
.special-header {
  width: 100%;
  padding: 10rem 2rem 2rem;
  position: relative;
  text-align: center;
  max-width: 960px;
  margin: auto;
}

.header-image img {
  width: 200px;
  height: 200px;
  border-radius: 2px;
  object-fit: cover;
  position: absolute;
}

.left img {
  top: 150px;
  left: -100px;
  z-index: -1;
}

.right img {
  bottom: 0;
  left: 0px;
  z-index: -1;
}

.extra img {
  width: 130px;
  height: 130px;
  bottom: 0;
  right: 0px;
  border-radius: 2px;
  opacity: 0.9;
  z-index: -2;
}

.header-title {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 500;
  line-height: 1;
}

.header-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  opacity: 0.75;
}

/* CTA BUTTON */
.header-cta {
  position: relative;
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  cursor: pointer;

  border: none;
  background: transparent;
  color: var(--accent-color);
  font: inherit;
  transition: color 0.25s ease;
}

.header-cta::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: rgb(255, 111, 97);
  transition: width 0.3s ease-in-out;
}

.header-cta:hover::after {
  width: 100%;
}

.arrow {
  font-size: 1.4rem;
}

@media (max-width: 600px) {
  .left img,
  .extra {
    display: none;
  }

  .header-image img {
    position: relative;
    padding-top: 40px;
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
