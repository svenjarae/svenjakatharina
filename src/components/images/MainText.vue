<template>
  <div class="smooth-scroll-images" ref="wrapper">
    <div class="content" ref="content">
      <!-- 3 Text-Layer wie im Pen -->
      <h1 class="text base">{{ title }}</h1>
      <h1 aria-hidden="true" class="text outline-text">{{ title }}</h1>
      <h1 aria-hidden="true" class="text filter-text">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default {
  name: 'MainText',
  props: { items: Array, title: { type: String, default: 'Smile' } },
  setup() {
    const wrapper = ref(null)
    const content = ref(null)
    let smoother

    onMounted(() => {
      if (!wrapper.value || !content.value) return

      const skewSetter = gsap.quickTo('.images img', 'skewY', { ease: 'power3.out' })
      const clamp = gsap.utils.clamp(-20, 20)

      smoother = ScrollSmoother.create({
        wrapper: wrapper.value,
        content: content.value,
        smooth: 2,
        speed: 3,
        effects: true,
        onUpdate(self) {
          skewSetter(clamp(self.getVelocity() / -50))
        },
        onStop() {
          skewSetter(0)
        },
      })
    })

    onUnmounted(() => {
      smoother?.kill()
      ScrollTrigger.killAll()
    })
    return { wrapper, content }
  },
}
</script>

<style scoped lang="scss">
/* Grundlayout wie im Pen */
:host,
:host * {
  box-sizing: border-box;
}

.content {
  width: 100%;
}
body {
  margin: 0;
  background: #14131a;
  color: #fff;
  overscroll-behavior: none;
  overflow-x: hidden;
}

/* === TITEL-LAYER === */
.text {
  position: fixed;
  top: 50vh;
  width: 100%;
  transform: translateY(-100%);
  text-align: center;
  font-family: cursive;
  font-weight: 900;
  line-height: 0.85;
  font-size: clamp(56px, 13vw, 240px);
  pointer-events: none;
}

/* 1) Basis-Schrift = komplett durchsichtig (durchschauen!) */
.text.base {
  color: transparent; /* <<< wichtig */
  z-index: 8;
}

/* 2) Outline-Ebene (sichtbare Kontur) */
.text.outline-text {
  color: transparent;
  -webkit-text-stroke: 10px orangered; /* kräftige Kontur wie im Pen */
  text-stroke: 10px orangered; /* (nicht überall unterstützt) */
  z-index: 10;
  opacity: 0.95;
}

/* 3) Filter-Ebene – farbiger Blend für Highlights */
.text.filter-text {
  color: transparent;
  mix-blend-mode: screen; /* sorgt für die „glow“ Überlagerung */
  opacity: 0.9;
  z-index: 9;
}
</style>
