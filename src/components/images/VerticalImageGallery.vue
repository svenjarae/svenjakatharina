<template>
  <div class="gallery-container">
    <div class="columns">
      <!-- COLUMN 1 (DOWN) -->
      <div class="col">
        <div class="col-inner" :style="{ transform: `translateY(${col1Pos}px)` }">
          <img v-for="(img, i) in col1Loop" :key="'c1' + i" :src="img" />
        </div>
      </div>

      <!-- COLUMN 2 (UP) -->
      <div class="col">
        <div class="col-inner" :style="{ transform: `translateY(${col2Pos}px)` }">
          <img v-for="(img, i) in col2Loop" :key="'c2' + i" :src="img" />
        </div>
      </div>

      <!-- COLUMN 3 (DOWN) -->
      <div class="col">
        <div class="col-inner" :style="{ transform: `translateY(${col3Pos}px)` }">
          <img v-for="(img, i) in col3Loop" :key="'c3' + i" :src="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projects } from '@/data/projectsData.js'

// Utility: shuffle array
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default {
  name: 'VerticalImageGallery',

  data() {
    return {
      col1Pos: 0,
      col2Pos: 0,
      col3Pos: 0,

      lastScrollY: 0,
      lastTimestamp: null,

      // wie weit die Spalten maximal rauf/runter verschoben werden dürfen
      maxOffset: 400,
    }
  },

  computed: {
    // sammelt alle Bilder aus imageGallery-Sections, aber nur mit gültigem src
    allImages() {
      const out = []
      projects.forEach((p) => {
        p.sections?.forEach((s) => {
          if (s.type === 'imageGallery') {
            s.images?.forEach((img) => {
              if (img && img.src && typeof img.src === 'string') {
                out.push(img.src)
              }
            })
          }
        })
      })
      return out
    },

    // 3 unterschiedlich geshuffelte Listen
    col1Images() {
      return shuffle(this.allImages)
    },
    col2Images() {
      return shuffle(this.allImages)
    },
    col3Images() {
      return shuffle(this.allImages)
    },

    // genug Bilder, damit jede Spalte “voll” wirkt
    col1Loop() {
      const out = []
      while (out.length < 40) out.push(...this.col1Images)
      return out
    },
    col2Loop() {
      const out = []
      while (out.length < 40) out.push(...this.col2Images)
      return out
    },
    col3Loop() {
      const out = []
      while (out.length < 40) out.push(...this.col3Images)
      return out
    },
  },

  mounted() {
    // kleine Kontrolle – kannst du auch wieder rausnehmen
    // console.log('Loaded gallery images:', this.allImages.length)
    requestAnimationFrame(this.updateLoop)
  },

  methods: {
    clamp(value, min, max) {
      return Math.min(max, Math.max(min, value))
    },

    updateLoop(timestamp) {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp

      const scrollDelta = window.scrollY - this.lastScrollY
      this.lastScrollY = window.scrollY

      // Bewegung nur bei Scroll
      if (Math.abs(scrollDelta) > 0.2) {
        const s = scrollDelta * 0.08

        // down / up / down – aber NIE so weit,
        // dass die komplette Spalte aus dem Sichtbereich verschwindet
        this.col1Pos = this.clamp(this.col1Pos - s, -this.maxOffset, this.maxOffset)
        this.col2Pos = this.clamp(this.col2Pos + s * 1.2, -this.maxOffset, this.maxOffset)
        this.col3Pos = this.clamp(this.col3Pos - s * 0.9, -this.maxOffset, this.maxOffset)
      }

      requestAnimationFrame(this.updateLoop)
    },
  },
}
</script>

<style scoped>
.gallery-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 105vh; /* Default desktop height */
  pointer-events: none;
  overflow: hidden;

  /* etwas softere Maske, aber du kannst sie auch komplett rausnehmen */
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

.columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.col {
  overflow: hidden;
}

.col-inner {
  display: flex;
  flex-direction: column;
}

.col-inner img {
  width: 100%;
  object-fit: cover;
}

/* ⭐ MOBILE/TABLET: From 1100px down → reduce height to 50vh */
@media (max-width: 1100px) {
  .gallery-container {
    height: 50vh;
  }
}
</style>
