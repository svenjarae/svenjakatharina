<template>
  <div class="web-card" :style="[backgroundStyle, sizeStyle]" @click="openLink">
    <div class="overlay">
      <h3 class="title">{{ title }}</h3>

      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>

      <p v-if="url" class="visit">Visit →</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebProjectCard',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    screenshot: { type: String, default: '' },
    url: { type: String, default: '' },

    // 🔸 Gleich wie DivingCard
    cardWidth: { type: String, default: '31%' },
    cardHeight: { type: String, default: '180px' },
  },

  computed: {
    backgroundStyle() {
      return this.screenshot ? { backgroundImage: `url(${this.screenshot})` } : {}
    },
    sizeStyle() {
      return { width: this.cardWidth, height: this.cardHeight }
    },
  },

  methods: {
    openLink() {
      if (!this.url) return
      window.open(this.url, '_blank')
    },
  },
}
</script>

<style scoped>
.web-card {
  position: relative;
  border-radius: 2px;
  background-size: cover;
  background-position: top center;
  background-color: #222;
  overflow: hidden;
  cursor: pointer;

  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.web-card:hover {
  transform: translateY(-6px);
  filter: brightness(1.1);
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  color: #fff;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 2px 0;
}

.subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.visit {
  margin-top: 6px;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Responsive breakpoints wie bei diving-card */
@media (max-width: 900px) {
  .web-card {
    width: 48% !important;
  }
}
@media (max-width: 560px) {
  .web-card {
    width: 100% !important;
  }
}
</style>
