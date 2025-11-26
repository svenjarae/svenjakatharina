<template>
  <div class="h-gallery-container">
    <div class="rows">
      <!-- ROW 1 (RIGHT) -->
      <div class="row">
        <div class="row-inner" :style="{ transform: `translateX(${row1Pos}px)` }">
          <img v-for="(img, i) in row1Loop" :key="'r1' + i" :src="img" />
        </div>
      </div>

      <!-- ROW 2 (LEFT) -->
      <div class="row">
        <div class="row-inner" :style="{ transform: `translateX(${row2Pos}px)` }">
          <img v-for="(img, i) in row2Loop" :key="'r2' + i" :src="img" />
        </div>
      </div>

      <!-- ROW 3 (RIGHT) -->
      <div class="row">
        <div class="row-inner" :style="{ transform: `translateX(${row3Pos}px)` }">
          <img v-for="(img, i) in row3Loop" :key="'r3' + i" :src="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projects } from '@/data/projectsData.js'

// Utility: shuffle
function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default {
  name: 'HorizontalImageGallery',

  computed: {
    allImages() {
      const out = []
      projects.forEach((p) => {
        p.sections?.forEach((s) => {
          if (s.type === 'imageGallery') {
            s.images.forEach((img) => out.push(img.src))
          }
        })
      })
      return out
    },

    row1Images() {
      return shuffle(this.allImages)
    },
    row2Images() {
      return shuffle(this.allImages)
    },
    row3Images() {
      return shuffle(this.allImages)
    },

    row1Loop() {
      const out = []
      while (out.length < 80) out.push(...this.row1Images)
      return out
    },
    row2Loop() {
      const out = []
      while (out.length < 80) out.push(...this.row2Images)
      return out
    },
    row3Loop() {
      const out = []
      while (out.length < 80) out.push(...this.row3Images)
      return out
    },
  },

  data() {
    return {
      row1Pos: 0,
      row2Pos: 0,
      row3Pos: 0,

      lastScrollY: 0,
      lastTimestamp: null,
    }
  },

  mounted() {
    requestAnimationFrame(this.updateLoop)
  },

  methods: {
    updateLoop(timestamp) {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp
      const delta = timestamp - this.lastTimestamp
      this.lastTimestamp = timestamp

      const scrollDelta = window.scrollY - this.lastScrollY
      this.lastScrollY = window.scrollY

      // move only while scrolling
      if (Math.abs(scrollDelta) > 0.2) {
        const s = scrollDelta * 0.08

        this.row1Pos += s // RIGHT
        this.row2Pos -= s * 1.1 // LEFT
        this.row3Pos += s * 0.9 // RIGHT
      }

      // Loop
      const loopWidth = -5000
      const wrap = (v) => ((v - loopWidth) % -loopWidth) + loopWidth

      this.row1Pos = wrap(this.row1Pos)
      this.row2Pos = wrap(this.row2Pos)
      this.row3Pos = wrap(this.row3Pos)

      requestAnimationFrame(this.updateLoop)
    },
  },
}
</script>

<style scoped>
.h-gallery-container {
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  margin: 4rem 0;
}

.rows {
  display: flex;
  flex-direction: column;
}

.row {
  width: 100%;
  overflow: hidden;
}

.row-inner {
  display: flex;
  flex-direction: row;
}

.row-inner img {
  height: 120px;
  width: auto;
  object-fit: cover;
}

/* MOBILE: slightly bigger images */
@media (max-width: 900px) {
  .row-inner img {
    height: 90px;
  }
}

@media (max-width: 600px) {
  .row-inner img {
    height: 70px;
  }
}
</style>
