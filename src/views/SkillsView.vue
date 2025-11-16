<template>
  <main class="expertise">
    <!-- ✅ Sidebar -->
    <SideBar
      :items="sections"
      :offset="80"
      :switchEarlyPx="200"
      :deactivate-after-last="true"
      deactivate-after-id="cta"
    />

    <!-- ✅ Special Header mit Titel, Subtitle & 3 Bildern -->
    <SpecialHeader :project="project" />

    <!-- ✅ Section 1: UW Filming -->
    <section id="uw-filming" class="section">
      <SectionText :section="skillsData.uwFilming.text" />
      <div class="container">
        <SectionFeatures :section="skillsData.uwFilming.features" />
      </div>

      <!-- ✅ Credits + Bild -->
      <div class="imageContainer">
        <CreditsList :items="creditsUw" />
      </div>
    </section>

    <!-- ✅ Section 2: Diving – kompakte Skills (3 Punkte), Slider & Credits -->
    <section id="diving" class="section">
      <SectionText :section="skillsData.diving.text" />

      <!-- 🔹 Diving Skills (max. 3 Punkte) -->
      <div class="container" style="margin-bottom: 100px">
        <SectionFeatures :section="skillsData.diving.features" />
      </div>

      <div class="container">
        <!-- Slider Viewport -->
        <div class="slider-viewport" ref="gridEl" tabindex="-1">
          <!-- Slider Track -->
          <div class="slider-track" :style="{ transform: `translateX(-${currentPage * 100}%)` }">
            <!-- Seiten (je 6 Cards) -->
            <section
              v-for="(page, pIndex) in pagedCertifications"
              :key="pIndex"
              class="diving-grid slider-page"
              role="group"
              :aria-label="`Seite ${pIndex + 1} von ${totalPages}`"
            >
              <DivingCard
                v-for="(cert, index) in page"
                :key="`${pIndex}-${index}-${cert.padi}`"
                :title="cert.title"
                :completionDate="cert.date"
                :padiNumber="cert.padi"
                :backgroundImage="cert.image"
              />
            </section>
          </div>
        </div>

        <!-- 🔘 Slider Controls (UNVERÄNDERT) -->
        <div class="slider-controls">
          <button
            class="see-more slider-btn"
            type="button"
            :disabled="currentPage === 0"
            @click="goPrev"
            :aria-label="'Vorherige Seite'"
          >
            <span class="see-more__icon" aria-hidden="true">
              <!-- links zeigender Pfeil -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 -960 960 960"
                class="see-more__svg see-more__svg--left"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </span>
            <span class="see-more__text">Zurück</span>
          </button>

          <button
            class="see-more slider-btn"
            type="button"
            :disabled="currentPage >= totalPages - 1"
            @click="goNext"
            :aria-label="'Nächste Seite'"
          >
            <span class="see-more__text">Weiter</span>
            <span class="see-more__icon" aria-hidden="true">
              <!-- rechts zeigender Pfeil -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 -960 960 960"
                class="see-more__svg see-more__svg--right"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <!-- 🔹 Diving Credits -->
      <div class="imageContainer">
        <CreditsList :items="creditsDiving" />
      </div>
    </section>

    <!-- ✅ Section 3 -->
    <section id="web-dev" class="section">
      <SectionText :section="skillsData.webDev.text" />

      <div class="web-grid">
        <WebProjectCard
          v-for="site in webProjects"
          :key="site.id"
          :title="site.title"
          :subtitle="site.subtitle"
          :screenshot="site.image"
          :url="site.url"
        />
      </div>

      <div class="container">
        <SectionFeatures :section="skillsData.webDev.features" />
      </div>

      <!-- ✅ Credits + Bild -->
      <div class="imageContainer">
        <CreditsList :items="creditsWebdev" />
      </div>
    </section>
  </main>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { webProjects, skillsData } from '@/data/projectsData.js'

// 🖼 Header-Bilder für Skills (direkt importiert)
import img7spain from '@/assets/images/spain25/P1072542.jpeg'
import scubaDiveNight from '@/assets/images/night-dive.jpeg'
import webDevImg from '@/assets/images/website/dev.png'

import WebProjectCard from '@/components/card/WebProjectCard.vue'
import SideBar from '@/components/navigation/SideBar.vue'
import SectionCta from '@/components/sections/SectionCta.vue'
import SectionText from '@/components/sections/SectionText.vue'
import SectionFeatures from '@/components/sections/SectionFeatures.vue'
import CreditsList from '@/components/sections/CreditsList.vue'
import DivingCard from '@/components/card/DivingCard.vue'
import RoundImage from '@/components/images/RoundImage.vue'
import FullWidthSlider from '@/components/slider/FullWidthSlider.vue'
import SpecialHeader from '@/components/text/SpecialHeader.vue'

export default {
  name: 'SkillsView',
  components: {
    SideBar,
    SectionCta,
    SectionText,
    SectionFeatures,
    CreditsList,
    DivingCard,
    RoundImage,
    FullWidthSlider,
    WebProjectCard,
    SpecialHeader,
  },
  setup() {
    const sections = skillsData.sections

    // ⭐ Header-Projekt für SpecialHeader (Titel, Subtitle, 3 Bilder)
    const project = {
      header: {
        title: skillsData.header?.title || 'Skills',
        subtitle: skillsData.header?.subtitle || 'UW Filming • Diving • Web Development',
        cta: skillsData.header?.cta || { text: 'Have Fun!' },
      },
      images: [{ src: img7spain }, { src: scubaDiveNight }, { src: webDevImg }],
    }

    const creditsUw = ref(skillsData.uwFilming.credits)
    const creditsDiving = ref(skillsData.diving.credits)
    const creditsWebdev = ref(skillsData.webDev.credits)

    // Sidebar Late Switch (wie vorher – aktuell nicht benutzt, aber behalten)
    const switchLatePx = ref(-200)
    const computeLatePx = () => {
      const vh = window.innerHeight || 800
      const offset = 80
      switchLatePx.value = -(Math.floor(vh * 0.7) - offset)
    }
    onMounted(() => {
      computeLatePx()
      window.addEventListener('resize', computeLatePx, { passive: true })
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', computeLatePx)
    })

    // Zertifikate (Cards im Slider) – aus skillsData
    const certifications = ref(skillsData.diving.certifications)

    const pageSize = 6
    const currentPage = ref(0)
    const totalPages = computed(() => Math.ceil(certifications.value.length / pageSize))

    const pagedCertifications = computed(() => {
      const chunks = []
      for (let i = 0; i < certifications.value.length; i += pageSize) {
        chunks.push(certifications.value.slice(i, i + pageSize))
      }
      return chunks
    })

    const gridEl = ref(null)
    const focusGrid = async () => {
      await nextTick()
      if (gridEl.value) gridEl.value.focus({ preventScroll: true })
    }

    const goPrev = async () => {
      if (currentPage.value > 0) {
        currentPage.value -= 1
        await focusGrid()
      }
    }
    const goNext = async () => {
      if (currentPage.value < totalPages.value - 1) {
        currentPage.value += 1
        await focusGrid()
      }
    }

    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    onMounted(() => document.addEventListener('keydown', onKey))
    onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

    return {
      sections,
      switchLatePx,
      creditsUw,
      creditsDiving,
      creditsWebdev,
      certifications,
      pagedCertifications,
      currentPage,
      totalPages,
      goPrev,
      goNext,
      gridEl,
      webProjects,
      skillsData,
      project,
    }
  },
}
</script>

<style scoped>
.web-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
  margin-top: 2rem;
  max-width: 960px;
  margin: auto;
}

.section {
  min-height: 100vh;
  padding: 60px;
  scroll-margin-top: 80px;
  padding-bottom: 20vh;
}

#uw-filming {
  padding-top: clamp(120px, 18vh, 220px);
}

.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

/* Credits + Bild */
.imageContainer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 8rem;
}
.imageContainer :deep(.credits) {
  flex: 0 0 auto;
  min-width: 220px;
}
.imageContainer img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  max-width: 30vw;
  border-radius: 2px;
}

/* ========= Slider ========= */
.slider-viewport {
  overflow: hidden;
  outline: none;
}
.slider-track {
  display: flex;
  width: 100%;
  transition: transform 350ms ease;
  will-change: transform;
}
.slider-page {
  min-width: 100%;
}

/* Grid für Karten (3x2) */
.diving-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
  outline: none;
}
.diving-grid :deep(.diving-card) {
  flex: 1 1 calc((100% - 2 * 1.5rem) / 3);
  max-width: calc((100% - 2 * 1.5rem) / 3);
}

/* Controls */
.slider-controls {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

/* Pfeil-Buttons wie see-more */
.see-more {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: transparent;
  border: 0;
  color: var(--text-color);
  font: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}
.see-more:hover {
  color: var(--hover-color, var(--text-color));
}
.see-more::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: #ff6f61;
  transition: width 0.3s ease-in-out;
}
.see-more:hover::after {
  width: 100%;
}
.see-more:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.see-more:disabled::after {
  width: 0;
}

/* Icon Pfeile */
.see-more__icon {
  display: inline-flex;
  will-change: transform;
  transition: transform 0.25s ease;
}

/* Icon Pfeile */
.see-more__icon svg {
  fill: var(--text-color);
}

.see-more__svg {
  transition: transform 0.25s ease;
}
.see-more__svg--right {
  transform: rotate(0deg);
}
.see-more__svg--left {
  transform: rotate(180deg);
}
.slider-btn:hover .see-more__icon {
  transform: translateX(2px);
}
.slider-btn:disabled:hover .see-more__icon {
  transform: none;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .see-more__icon,
  .see-more__svg,
  .see-more::after,
  .slider-track {
    transition: none;
  }
}

/* Responsive Breakpoints */
@media (max-width: 900px) {
  .diving-grid :deep(.diving-card) {
    flex: 1 1 calc((100% - 1.5rem) / 2);
    max-width: calc((100% - 1.5rem) / 2);
  }

  .imageContainer {
    width: 100%;
    justify-content: flex-start;
    overflow: auto;
  }
}
@media (max-width: 560px) {
  .diving-grid :deep(.diving-card) {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .section {
    padding: 40px;
  }
}
</style>
