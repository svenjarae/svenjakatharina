<template>
  <div class="accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item">
      <!-- Header -->
      <div class="accordion-header" @click="toggleAccordion(index)">
        <div>
          <h2 class="title">{{ item.title }}</h2>
          <p class="subtitle">{{ item.subtitle }}</p>
        </div>
        <div class="icon">
          <span v-if="activeIndex === index">-</span>
          <span v-else>+</span>
        </div>
      </div>

      <!-- Content -->
      <transition name="accordion">
        <div v-if="activeIndex === index" class="accordion-content">
          <p>{{ item.content }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: null, // Tracks the currently active accordion item
    }
  },
  methods: {
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    },
  },
}
</script>

<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 960px;
  margin: auto;
  z-index: 1;
  position: relative;
}

.accordion-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
}

.title {
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

.subtitle {
  font-size: 1.1rem;
  color: grey;
  margin: 0;
}

.icon {
  font-size: 2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.accordion-content {
  padding: 1rem 0 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  overflow: hidden;
}

/* Accordion Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
