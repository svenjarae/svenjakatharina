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

    <!-- ✅ Lightbox rendered in <body>, not inside transformed parents -->
    <Teleport to="body">
      <div v-if="activeImage !== null" class="lightbox" @click.self="closeLightbox">
        <button class="close-btn" type="button" @click="closeLightbox" aria-label="Close">×</button>

        <div class="lightbox-content" role="dialog" aria-modal="true">
          <img :src="section.images[activeImage].src" :alt="section.images[activeImage].alt" />

          <div class="info">
            <h3>{{ section.images[activeImage].caption }}</h3>
            <p>Creator: {{ section.images[activeImage].creator }}</p>
          </div>

          <div class="lightbox-nav">
            <button type="button" @click.stop="prevImage" :disabled="activeImage === 0">‹</button>
            <button
              type="button"
              @click.stop="nextImage"
              :disabled="activeImage === section.images.length - 1"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  props: ['section'],
  data() {
    return {
      activeImage: null,
      _scrollY: 0,
    }
  },
  methods: {
    lockBodyScroll() {
      // prevent background scroll jump
      this._scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${this._scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
    },
    unlockBodyScroll() {
      const y = this._scrollY || 0
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      window.scrollTo(0, y)
    },

    openLightbox(index) {
      this.activeImage = index
      this.lockBodyScroll()
    },
    closeLightbox() {
      this.activeImage = null
      this.unlockBodyScroll()
    },
    prevImage() {
      if (this.activeImage > 0) this.activeImage--
    },
    nextImage() {
      if (this.activeImage < this.section.images.length - 1) this.activeImage++
    },
    onKeydown(e) {
      if (this.activeImage === null) return
      if (e.key === 'Escape') this.closeLightbox()
      if (e.key === 'ArrowLeft') this.prevImage()
      if (e.key === 'ArrowRight') this.nextImage()
    },
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
    // safety: if component unmounts while open
    if (this.activeImage !== null) this.unlockBodyScroll()
  },
}
</script>

<style scoped>
/* Wrapper */
.gallery-wrapper {
  max-width: 960px;
  margin: 0 auto;
}

/* Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.gallery-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 2px;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

@media (hover: hover) {
  .gallery-item img:hover {
    transform: scale(1.04);
  }
}

/* ✅ Lightbox overlay (Teleport => viewport true fixed) */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999; /* higher than any header/sidebar */
}

/* Content centered */
.lightbox-content {
  text-align: center;
  width: min(1100px, 96vw);
  max-height: 95vh;
  display: grid;
  justify-items: center;
  gap: 1rem;
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
}

.info h3 {
  font-size: 1.3rem;
  margin: 0 0 0.4rem;
}

/* Nav */
.lightbox-nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
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

.lightbox-nav button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Close */
.close-btn {
  position: fixed; /* fixed to viewport as well */
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
