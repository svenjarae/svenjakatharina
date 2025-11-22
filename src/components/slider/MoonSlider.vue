<template>
  <div class="hero-wrapper" ref="wrapper">
    <!-- Floating decorative images (your images, GSAP-style) -->
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="floating-shape"
      :ref="(el) => (shapeRefs[index] = el)"
    >
      <img :src="item.image" alt="shape" draggable="false" />
    </div>

    <!-- Center slider text / content -->
    <div class="center-content">
      <p class="sub">
        Svenja Raetzsch – currently based in the Canary Islands. Passionate diver and underwater
        camerawoman who's happiest in the water.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

import image1 from '@/assets/images/yo/spain25.jpeg'
import image2 from '@/assets/images/yo/bretagne24.jpeg'
import image3 from '@/assets/images/yo/nemo.jpeg'
import image4 from '@/assets/images/yo/spain24.jpeg'
import image5 from '@/assets/images/project1.jpg'
import image6 from '@/assets/images/project2.jpg'

export default {
  name: 'GsapHeroSlider',

  setup() {
    const items = ref([
      { id: 1, image: image1 },
      { id: 2, image: image2 },
      { id: 3, image: image3 },
      { id: 4, image: image4 },
      { id: 5, image: image5 },
      { id: 6, image: image6 },
    ])

    const shapeRefs = ref([])
    const tag1 = ref(null)
    const tag2 = ref(null)

    const currentIndex = ref(0)

    /* ---------- Floating animation loop (GSAP homepage style) ---------- */
    const floatShapes = () => {
      shapeRefs.value.forEach((shape, i) => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true })
        tl.to(shape, {
          x: gsap.utils.random(-40, 40),
          y: gsap.utils.random(-60, 60),
          rotate: gsap.utils.random(-20, 20),
          scale: gsap.utils.random(0.9, 1.15),
          duration: gsap.utils.random(3, 6),
          ease: 'sine.inOut',
        })
      })
    }

    /* ---------- Slide effect (center focus like GSAP) ---------- */
    const goTo = (index) => {
      const total = shapeRefs.value.length
      currentIndex.value = (index + total) % total

      shapeRefs.value.forEach((shape, i) => {
        const diff = i - currentIndex.value

        gsap.to(shape, {
          x: diff * 220,
          scale: diff === 0 ? 1.1 : 0.7,
          opacity: diff === 0 ? 1 : 0.35,
          duration: 1.1,
          rotateY: diff * -15,
          ease: 'power3.out',
        })
      })
    }

    const prev = () => goTo(currentIndex.value - 1)
    const next = () => goTo(currentIndex.value + 1)

    /* ---------- Intro animation (GSAP hero tags) ---------- */
    const intro = () => {
      gsap.from(tag1.value, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
      gsap.from(tag2.value, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'back.out(1.4)',
      })
    }

    onMounted(() => {
      intro()
      floatShapes()
      goTo(0)
    })

    return { items, shapeRefs, tag1, tag2, prev, next }
  },
}
</script>

<style scoped>
.hero-wrapper {
  width: 100%;
  height: 85vh;
  position: relative;
  overflow: hidden;
  background: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* floating images as gsap shapes */
.floating-shape {
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  mix-blend-mode: screen;
  opacity: 0.9;
  filter: saturate(1.3) brightness(1.1);
}
.floating-shape img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Center text */
.center-content {
  position: relative;
  z-index: 50;
  text-align: left;
  max-width: 600px;
}

.headline {
  font-size: 3rem;
  line-height: 1.2;
}

.tag {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 12px;
  font-weight: 600;
  color: #000;
  margin-right: 6px;
}
.tag1 {
  background: #f8d7ff;
}
.tag2 {
  background: #ffa41b;
}

.sub {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #ddd;
  max-width: 420px;
}

/* Nav */
.nav {
  position: absolute;
  bottom: 30px;
  background: white;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  border: none;
  font-size: 28px;
  cursor: pointer;
  z-index: 40;
}
.prev {
  left: 20px;
}
.next {
  right: 20px;
}
</style>
