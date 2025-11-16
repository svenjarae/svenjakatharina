<template>
  <div class="slider">
    <!-- Track -->
    <div class="slider__track" :style="{ transform: 'translateX(-' + index * (100 / 3) + '%)' }">
      <div v-for="(src, i) in images" :key="i" class="slider__slide">
        <img :src="src" :alt="alt + ' – Bild ' + (i + 1)" loading="lazy" />
      </div>
    </div>

    <!-- Navigation: gleiche SVGs & Animation wie im Accordion -->
    <button class="slider__nav prev" @click.stop="prev" aria-label="Zurück" :disabled="index === 0">
      <span class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="var(--text-color)"
          class="arrow arrow--left"
        >
          <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
        </svg>
      </span>
    </button>

    <button
      class="slider__nav next"
      @click.stop="next"
      aria-label="Weiter"
      :disabled="index >= maxIndex"
    >
      <span class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="48px"
          fill="var(--text-color)"
          class="arrow"
        >
          <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'MiniSlider',
  props: {
    images: { type: Array, required: true },
    alt: { type: String, default: '' },
  },
  data() {
    return { index: 0 }
  },
  computed: {
    count() {
      return this.images?.length || 0
    },
    // immer 3 sichtbar → letzter Start-Index ist count - 3 (nicht negativ)
    maxIndex() {
      return Math.max(0, this.count - 3)
    },
  },
  methods: {
    go(n) {
      if (!this.count) return
      if (n < 0) this.index = 0
      else if (n > this.maxIndex) this.index = this.maxIndex
      else this.index = n
    },
    next() {
      this.go(this.index + 1)
    },
    prev() {
      this.go(this.index - 1)
    },
  },
}
</script>

<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

/* Track mit 3 Slides sichtbar */
.slider__track {
  display: flex;
  transition: transform 300ms ease;
}

.slider__slide {
  flex: 0 0 calc(100% / 3);
  padding: 0 4px;
  box-sizing: border-box;
}
.slider__slide img {
  width: 100%;
  height: 400px;
  display: block;
  border-radius: 100%;
  object-fit: cover;
}

/* Pfeile – gleiche Optik/Animation wie im Accordion */
.slider__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent; /* transparent wie im Accordion */
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  color: var(--text-color, #111); /* falls --text-color fehlt, #111 als Fallback */
  z-index: 2;
}

.slider__nav.prev {
  left: 0.5rem;
}
.slider__nav.next {
  right: 0.5rem;
}

/* Icon-Wrapper für die Hover-Translation */
.icon {
  display: inline-flex;
  transition: transform 0.3s ease; /* gleiche Animation */
}

/* Richtungsspezifische Bewegung beim Hover */
.slider__nav.next:hover .icon {
  transform: translateX(5px);
}
.slider__nav.prev:hover .icon {
  transform: translateX(-5px);
}

/* Gleiches SVG für beide Richtungen; links wird gespiegelt */
.arrow {
  display: block;
}
.arrow--left {
  transform: scaleX(-1);
}

/* Disabled-State am Rand */
.slider__nav:disabled {
  opacity: 0;
  cursor: default;
  pointer-events: none;
}
</style>
