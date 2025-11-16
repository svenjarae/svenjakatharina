<template>
  <div class="gallery-wrapper">
    <div class="gallery-grid">
      <div
        class="gallery-item"
        v-for="(img, index) in section.images"
        :key="index"
        @click="openLightbox(index)"
      >
        <img :src="img.src" :alt="img.alt" />
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="activeImage !== null" class="lightbox" @click.self="closeLightbox">
      <button class="close-btn" @click="closeLightbox">×</button>

      <div class="lightbox-content">
        <img :src="section.images[activeImage].src" :alt="section.images[activeImage].alt" />

        <div class="info">
          <h3>{{ section.images[activeImage].caption }}</h3>
          <p>Creator: {{ section.images[activeImage].creator }}</p>
        </div>

        <div class="lightbox-nav">
          <button @click="prevImage" :disabled="activeImage === 0">‹</button>
          <button @click="nextImage" :disabled="activeImage === section.images.length - 1">
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['section'],
  data() {
    return {
      activeImage: null,
    }
  },
  methods: {
    openLightbox(index) {
      this.activeImage = index
    },
    closeLightbox() {
      this.activeImage = null
    },
    prevImage() {
      if (this.activeImage > 0) this.activeImage--
    },
    nextImage() {
      if (this.activeImage < this.section.images.length - 1) this.activeImage++
    },
  },
}
</script>

<style scoped>
/* Wrapper */
.gallery-wrapper {
  max-width: 960px;
  margin: 0 auto;
}

/* ⭐ Super smoother responsive Flow */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

/* ⭐ Responsive images */
.gallery-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 1/1; /* keeps square-ish shape fluid */
  object-fit: cover;

  border-radius: 2px;
  cursor: pointer;

  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

/* Hover only on devices that support hover */
@media (hover: hover) {
  .gallery-item img:hover {
    transform: scale(1.04);
  }
}

/* ⭐ LIGHTBOX */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

/* ⭐ Responsive lightbox layout */
.lightbox-content {
  text-align: center;
  max-width: 96%;
  max-height: 95%;
}

.lightbox-content img {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 2px;
}

/* Info */
.info {
  color: #fff;
  margin-top: 1rem;
}

.info h3 {
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
}

/* Navigation buttons */
.lightbox-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.lightbox-nav button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 2rem;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 2px;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

/* Close button */
.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  font-size: 2.2rem;
  color: white;
  cursor: pointer;
  padding: 0.2rem 0.8rem;
  border-radius: 2px;
  backdrop-filter: blur(4px);
}

/* ⭐ Mobile improvements */
@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .info h3 {
    font-size: 1.1rem;
  }

  .lightbox-nav button {
    font-size: 1.6rem;
  }
}
</style>
