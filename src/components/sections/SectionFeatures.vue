<template>
  <div class="features-grid">
    <div class="feature" v-for="(item, index) in section.features" :key="index">
      <h3>{{ item.title }}</h3>
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['section'],
}
</script>

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 90px;
}

.feature {
  position: relative;
  background-color: var(--color-text);
  padding: 1.5rem;
  text-align: left;
  /* statt border-bottom benutzen wir Pseudoelemente für feinere Kontrolle */
}

/* Base: grauer/aktueller „dotted“ Strich unten über die volle Breite */
.feature::before,
.feature::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.5rem; /* optischer Abstand */
  height: 4px;
  pointer-events: none;
  background-repeat: repeat-x;
  background-position: left bottom;
  background-size: 10px 4px; /* Abstand der Punkte */
}

/* graue Dots (immer sichtbar) */
.feature::before {
  /* Dotted via radial-gradient */
  background-image: radial-gradient(circle, currentColor 2px, transparent 2.5px);
  opacity: 0.35;
}

/* orange Dots (laufen von links nach rechts ein) */
.feature::after {
  background-image: radial-gradient(circle, #ff6f61 2px, transparent 2.5px);
  /* Start: auf 0 „zusammengedrückt“ → unsichtbar */
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 380ms ease;
  will-change: transform;
}

/* Hover: fährt nach rechts aus */
.feature:hover::after {
  transform: scaleX(1);
}

/* Tastaturfokus zugänglich */
.feature:focus-within::after {
  transform: scaleX(1);
}

/* Motion-Preference respektieren */
@media (prefers-reduced-motion: reduce) {
  .feature::after {
    transition: none;
  }
}

h3 {
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 0 0.25rem;
}

p {
  color: var(--color-text);
  font-size: 14px;
  margin: 0;
}
@media (max-width: 560px) {
  .features-grid {
    display: block;
  }
}
</style>
