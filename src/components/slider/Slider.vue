<template>
  <div class="slider-container" @mouseleave="resetToDefault">
    <div class="slider">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="slide"
        :class="{
          active: index === activeIndex,
          left: index === activeIndex - 1,
          right: index === activeIndex + 1,
        }"
        @mouseenter="setActive(index)"
        @touchstart.passive="setActive(index)"
        @click="setActive(index)"
        role="img"
        :aria-label="`Slide ${index + 1}`"
      >
        <img :src="item.image" alt="Project Image" draggable="false" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import image1 from '@/assets/images/yo/spain25.jpeg'
import image2 from '@/assets/images/yo/bretagne24.jpeg'
import image3 from '@/assets/images/yo/nemo.jpeg'
import image5 from '@/assets/images/yo/spain24.jpeg'

export default {
  setup() {
    const router = useRouter()

    const items = ref([
      { id: 1, image: image1 },
      { id: 2, image: image2 },
      { id: 3, image: image3 },
      { id: 4, image: image5 },
      { id: 5, image: image5 },
    ])

    // standardmäßig der mittlere Index
    const defaultIndex = Math.floor(items.value.length / 2)
    const activeIndex = ref(defaultIndex)

    const setActive = (i) => {
      if (i < 0 || i >= items.value.length) return
      activeIndex.value = i
    }

    const resetToDefault = () => {
      activeIndex.value = defaultIndex
    }

    const goToProject = (id) => {
      router.push(`/project/${id}`)
    }

    return { items, activeIndex, setActive, resetToDefault, goToProject }
  },
}
</script>

<style scoped>
.slider-container {
  perspective: 1200px;
  text-align: center;
  height: 400px;
  overflow: hidden;
  user-select: none;
  position: relative;
}

.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  transition: all 0.35s ease;
}

.slide {
  width: 120px;
  height: 120px;
  border-radius: 2px;
  overflow: hidden;
  opacity: 0.6;
  transition: all 0.35s ease;
  flex-shrink: 0;
  cursor: pointer;
  pointer-events: auto;
  transform: translateZ(0);
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.slide.active {
  opacity: 1;
  width: 400px;
  height: 400px;
  transform: scale(1);
  z-index: 3;
}

.slide.left,
.slide.right {
  opacity: 0.75;
}

/* Mobile: nur aktiven Slide zeigen */
@media (max-width: 1300px) {
  .slider {
    justify-content: center;
    gap: 0;
  }
  .slide {
    display: none;
  }
  .slide.active {
    display: block;
    margin: 0 auto;
  }
}
</style>
