<template>
  <div class="vt-wrap" ref="wrap" :style="{ left }">
    <span ref="text" class="vt-text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    left: { type: String, default: '20px' },
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      const wrap = this.$refs.wrap
      const text = this.$refs.text

      if (!wrap || !text) return

      const available = wrap.clientHeight

      // Start mit sehr großer Schrift
      let size = 400
      text.style.fontSize = size + 'px'

      // Höhe messen (bereits vertikal gedreht)
      const current = text.getBoundingClientRect().height

      // Skalierungsfaktor
      const scale = available / current

      // endgültige Schriftgröße
      const finalSize = size * scale

      text.style.fontSize = finalSize + 'px'
    },
  },
}
</script>

<style scoped>
.vt-wrap {
  position: absolute;
  inset: 0 auto 0 0;
  right: 0;
  z-index: 12002;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  pointer-events: none;
}

.vt-text {
  white-space: nowrap;
  line-height: 1;
  font-weight: 700;
  opacity: 0.14;
}
</style>
