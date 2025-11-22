<template>
  <header class="special-header">
    <!-- Left Image -->
    <div class="header-image left" v-if="images[0]" ref="imgLeft">
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
    <div class="header-image right" v-if="images[1]" ref="imgRight">
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
  if (props.project?.sections) {
    const gallery = props.project.sections.find((s) => s.type === 'imageGallery')
    if (gallery && gallery.images) return gallery.images.slice(0, 3)
  }

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
   GSAP FLOATING IMAGES (HORIZONTAL)
---------------------------------------------- */
const imgExtra = ref(null)
const imgLeft = ref(null)
const imgRight = ref(null)

onMounted(() => {
  /* EXTRA FLOATING IMAGE (horizontal drift) */
  if (imgExtra.value) {
    gsap.fromTo(
      imgExtra.value,
      { x: -10 },
      {
        x: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: imgExtra.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      },
    )
  }

  /* LEFT IMAGE HORIZONTAL */
  if (imgLeft.value) {
    gsap.fromTo(
      imgLeft.value,
      { x: -20 },
      {
        x: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: imgLeft.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      },
    )
  }

  /* RIGHT IMAGE HORIZONTAL (opposite) */
  if (imgRight.value) {
    gsap.fromTo(
      imgRight.value,
      { x: 20 },
      {
        x: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRight.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      },
    )
  }
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

/* ----------------------------------------------
   DESKTOP DEFAULT
---------------------------------------------- */
.left img {
  top: 0;
  left: -200px;
  z-index: -1;
}

.right img {
  bottom: -50px;
  left: -100px;
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

/* ----------------------------------------------
   TABLET (600px - 1024px)
---------------------------------------------- */
@media (max-width: 1024px) and (min-width: 600px) {
  .left img {
    display: none;
  }

  .right img {
    width: 160px;
    height: 160px;
    left: -60px;
    bottom: -20px;
  }

  .extra img {
    width: 110px;
    height: 110px;
    right: 10px;
  }
}

/* ----------------------------------------------
   MOBILE (< 600px)
---------------------------------------------- */
@media (max-width: 600px) {
  /* linkes & extra Bild ausblenden */
  .left img,
  .extra {
    display: none !important;
  }

  /* rechtes Bild bleibt und wird schön zentriert */
  .right img {
    position: absolute;
    width: 140px;
    height: 140px;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
    opacity: 1;
  }

  .header-image img {
    position: relative;
    padding-top: 40px;
  }

  .special-header {
    padding: 7rem 0 0 0;
  }

  .header-cta {
    width: 100%;
    justify-content: center;
  }
}

/* ---------------------------------------------- */
.header-title {
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 500;
  line-height: 1;
  position: relative;
  z-index: 5;
}

.header-subtitle {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  opacity: 0.75;
}

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
</style>
