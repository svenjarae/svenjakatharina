<template>
  <section class="about-showcase" ref="sectionEl">
    <!-- LEFT SIDE -->
    <div class="left">
      <p class="subtitle"></p>

      <svg
        ref="logoBig"
        class="logo-big"
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 133.87 76.94"
      >
        <g id="Layer_1-2" data-name="Layer 1">
          <g>
            <path
              d="M133.48,1.04v30.71c0,.05-.7.75-.75.75h-9.49c-5.24,0-13.2-5.44-14.88-10.58-2.51-7.67-.36-12.19,5.51-16.74.41-.32.91,0,.63-1.14-8.61-.41-17.76,3.14-16.97,13.22,1.23,15.65,30.96,16.61,35.72,34.19,3.21,11.86-6.36,25.49-19,25.49h-44.94c-.05,0-.75-.7-.75-.75v-32.71c15.66-3.11,33.12,6.78,25.16,24.41l-4.69,5.05c11.18.88,19.13-6.93,14.34-18.09-6.84-15.94-36.6-14.04-36.63-35.67-.02-16.11,13.47-18.05,26.5-18.67,10.91-.52,26.77-.85,37.5,0,.96.08,1.81.29,2.72.52Z"
            />
            <path
              d="M54.33,34.5c-5.28-.53-11.25-3.21-14.44-7.53-3.78-5.13-4.03-13.05-.41-18.3.46-.67,3.62-3.65,3.11-4.13-17.28,3.57-15.84,26.91.28,31.43,3.21.9,5.95-.6,5.22,4.03-21.74-.81-24.48,26.33-5.5,32.96.5-.49-2.6-3.4-3.09-4.15-.97-1.5-2.2-4.31-2.4-6.09-1.94-17.03,12.78-20.14,26.47-19.73v33.21c0,.05-.7.75-.75.75H19.87c-14.39,0-23.72-13.36-18.32-26.81,2.45-6.1,6.52-8.85,12.07-11.9C-1.85,32.91-3.4,9.18,12,2.66c1.92-.81,6.43-2.12,8.37-2.12h42.45c.05,0,.75.7.75.75v32.46c0,.05-.7.75-.75.75-2.67,0-5.92.26-8.49,0Z"
            />
          </g>
        </g>
      </svg>
    </div>

    <!-- RIGHT SIDE TEXT GRID -->
    <div class="right">
      <p class="col"></p>

      <p class="col">
        <b>Svenja Katharina</b> – underwater camerawoman, diver & webdeveloper based in Canary
        Islands. Find selected projetcs that reflect how I work.
      </p>
    </div>

    <svg
      ref="logoFloating"
      class="floating-logo"
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 133.87 76.94"
    >
      <g id="Layer_1-2" data-name="Layer 1">
        <g>
          <path
            d="M133.48,1.04v30.71c0,.05-.7.75-.75.75h-9.49c-5.24,0-13.2-5.44-14.88-10.58-2.51-7.67-.36-12.19,5.51-16.74.41-.32.91,0,.63-1.14-8.61-.41-17.76,3.14-16.97,13.22,1.23,15.65,30.96,16.61,35.72,34.19,3.21,11.86-6.36,25.49-19,25.49h-44.94c-.05,0-.75-.7-.75-.75v-32.71c15.66-3.11,33.12,6.78,25.16,24.41l-4.69,5.05c11.18.88,19.13-6.93,14.34-18.09-6.84-15.94-36.6-14.04-36.63-35.67-.02-16.11,13.47-18.05,26.5-18.67,10.91-.52,26.77-.85,37.5,0,.96.08,1.81.29,2.72.52Z"
          />
          <path
            d="M54.33,34.5c-5.28-.53-11.25-3.21-14.44-7.53-3.78-5.13-4.03-13.05-.41-18.3.46-.67,3.62-3.65,3.11-4.13-17.28,3.57-15.84,26.91.28,31.43,3.21.9,5.95-.6,5.22,4.03-21.74-.81-24.48,26.33-5.5,32.96.5-.49-2.6-3.4-3.09-4.15-.97-1.5-2.2-4.31-2.4-6.09-1.94-17.03,12.78-20.14,26.47-19.73v33.21c0,.05-.7.75-.75.75H19.87c-14.39,0-23.72-13.36-18.32-26.81,2.45-6.1,6.52-8.85,12.07-11.9C-1.85,32.91-3.4,9.18,12,2.66c1.92-.81,6.43-2.12,8.37-2.12h42.45c.05,0,.75.7.75.75v32.46c0,.05-.7.75-.75.75-2.67,0-5.92.26-8.49,0Z"
          />
        </g>
      </g>
    </svg>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'AboutShowcase',
  setup() {
    const sectionEl = ref(null)
    const logoBig = ref(null)
    const logoFloating = ref(null)
    let tl = null

    onMounted(() => {
      if (!sectionEl.value || !logoBig.value || !logoFloating.value) return

      // Startzustand: kleines Logo ist unsichtbar
      gsap.set(logoFloating.value, {
        opacity: 0,
        scale: 0.6,
        transformOrigin: 'center center',
      })

      gsap.set(logoBig.value, {
        opacity: 1,
        scale: 1,
        transformOrigin: 'left bottom',
      })

      // Timeline, die über 100px Scroll läuft
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl.value,
          start: 'top top', // sobald gescrollt wird (Sektion am Viewportanfang)
          end: '+=1000', // nach 100px Scroll ist Animation vollständig
          scrub: true, // vorwärts & rückwärts synchron mit Scroll
        },
      })

      // Großes Logo wird kleiner & blendet aus
      tl.to(
        logoBig.value,
        {
          scale: 1,
          opacity: 0,
          ease: 'none',
        },
        0,
      )

      // Kleines, fixes Logo unten rechts blendet ein
      tl.to(
        logoFloating.value,
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
        },
        0,
      )
    })

    onBeforeUnmount(() => {
      if (tl) {
        if (tl.scrollTrigger) tl.scrollTrigger.kill()
        tl.kill()
      }
    })

    return {
      sectionEl,
      logoBig,
      logoFloating,
    }
  },
}
</script>

<style scoped>
.about-showcase {
  max-width: 1800px;
  margin: 0 auto;
  padding: 60px;
  display: grid;
  justify-content: center;
  grid-template-columns: 400px 1fr;
  column-gap: 60px;
  font-family: var(--primaryFont);
  align-items: end;
}

/* Großes Logo links */
.left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logo-big {
  position: fixed;
  bottom: 30px;
  left: 60px;
  width: 100px;
  height: 100px;
  pointer-events: none;
  z-index: 5;
  fill: var(--text-color);
}

/* Subtitle (falls du noch Text einfügst) */
.subtitle {
  font-size: 1.1rem;
  white-space: nowrap;
  text-overflow: clip;
  line-height: 1.05;
}

/* RIGHT SIDE – 2 COL GRID */
.right {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
}

.col {
  font-size: 1.1rem;
  line-height: 1.55;
  font-weight: 500;
}

/* Kleines fixes Logo unten rechts */
.floating-logo {
  position: fixed;
  bottom: 60px;
  left: 60px;
  width: 0px;
  height: 0px;
  pointer-events: none;
  z-index: -1;
  fill: var(--text-color);
}

/* MOBILE */
@media (max-width: 1100px) {
  .logo-big {
    bottom: 160px;
  }

  .floating-logo {
    display: none;
  }
  .about-showcase {
    grid-template-columns: 1fr;
    row-gap: 60px;
  }

  .right {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
@media (max-width: 600px) {
  .logo-big {
    left: 50%;
    transform: translate(-50%) !important;
    bottom: 40%;
  }
}
</style>
