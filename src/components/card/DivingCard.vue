<template>
  <div class="diving-card" :style="[backgroundStyle, sizeStyle]">
    <div class="overlay">
      <h3 class="title">{{ title }}</h3>
      <p v-if="completionDate" class="date">Completed: {{ completionDate }}</p>
      <p v-if="padiNumber" class="padi">PADI No: {{ padiNumber }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivingCard',
  props: {
    title: { type: String, required: true },
    backgroundImage: { type: String, default: '' },
    completionDate: { type: String, default: '' },
    padiNumber: { type: String, default: '' },
    // 🔸 Neu: Größe steuerbar (Standard entspricht deiner Grid-Karte)
    cardWidth: { type: String, default: '31%' },
    cardHeight: { type: String, default: '180px' },
  },
  computed: {
    backgroundStyle() {
      return this.backgroundImage ? { backgroundImage: `url(${this.backgroundImage})` } : {}
    },
    sizeStyle() {
      return { width: this.cardWidth, height: this.cardHeight }
    },
  },
}
</script>

<style scoped>
.diving-card {
  position: relative;
  border-radius: 2px;
  background-size: cover;
  background-position: center;
  background-color: #333;
  overflow: hidden;

  transition: transform 0.3s ease;
}

.diving-card:hover {
  transform: translateY(-6px);
}

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
  margin: 0;
}

.date,
.padi {
  font-size: 0.8rem;
  margin: 2px 0 0 0;
  opacity: 0.9;
}

/* einfache Responsivität für Karten im Grid-Fall */
@media (max-width: 900px) {
  .diving-card {
    width: 48%;
  }
}
@media (max-width: 560px) {
  .diving-card {
    width: 100%;
  }
}
</style>
