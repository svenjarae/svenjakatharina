<template>
  <section class="credits">
    <ul class="credits__list">
      <li v-for="(c, i) in items" :key="i" class="credits__row">
        <span class="credits__date">{{ c.date }}</span>

        <span class="credits__title">
          <template v-if="c.link">
            <a :href="c.link" target="_blank" rel="noopener noreferrer">{{ c.title }}</a>
          </template>
          <template v-else>{{ c.title }}</template>
        </span>

        <span v-if="c.subtitle" class="credits__sub">{{ c.subtitle }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'CreditsList',
  props: {
    items: { type: Array, default: () => [] },
  },
}
</script>

<style scoped>
.credits__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
  font-size: 1.1rem;
  color: var(--color-text);
}

a {
  color: var(--color-text);
  font-weight: 700;
}

/* ============================
   DESKTOP (≥ 860px)
============================ */
.credits__row {
  display: grid;
  grid-template-columns: 120px 220px 1fr;
  gap: 2rem;
  align-items: baseline;
}

.credits__date {
  font-weight: 600;
}

.credits__title {
  font-weight: 700;
}

.credits__sub {
  opacity: 0.85;
}

/* ============================
   TABLET (860px → 720px)
============================ */
@media (max-width: 860px) {
  .credits__row {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
  }

  .credits__sub {
    grid-column: 1 / -1;
  }
}

/* ============================
   MOBILE (< 720px)
============================ */
@media (max-width: 720px) {
  .credits__row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .credits__date {
    font-size: 0.95rem;
    opacity: 0.8;
  }

  .credits__title {
    font-size: 1.1rem;
  }

  .credits__sub {
    font-size: 0.95rem;
    opacity: 0.8;
  }
}
</style>
