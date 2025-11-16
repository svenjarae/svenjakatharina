<template>
  <section class="gallery">
    <!-- LEFT: REAL STACK -->
    <div class="stack">
      <div
        v-for="item in items"
        :key="item.key"
        class="photo"
        :class="[`photo-${item.key}`, { active: active === item.key }]"
      >
        <img :src="item.image" :alt="item.title" />
      </div>
    </div>

    <!-- RIGHT SIDE LINKS -->
    <div class="links">
      <router-link
        v-for="item in items"
        :key="item.key"
        class="link"
        :to="{ name: 'skills', hash: `#${item.sectionId}` }"
        @mouseenter="active = item.key"
      >
        <div class="text-content">
          <h2 class="title">{{ item.title }}</h2>
          <p class="subtitle">{{ item.subtitle }}</p>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StackedHoverGallery',
  data() {
    return {
      active: 'film',
      items: [
        {
          key: 'film',
          title: 'UW Filmmaking',
          subtitle: 'Cinematic Storytelling',
          sectionId: 'uw-filming',
          image: '/src/assets/images/project4.jpg',
        },
        {
          key: 'dive',
          title: 'Diving',
          subtitle: 'Scuba & Apnea',
          sectionId: 'diving',
          image: '/src/assets/images/night-dive.jpeg',
        },
        {
          key: 'web',
          title: 'Web Development',
          subtitle: 'Modern & User-Friendly Websites',
          sectionId: 'web-dev',
          image: '/src/assets/images/website/dev.png',
        },
      ],
    }
  },
}
</script>

<style scoped>
/* =============================
   FIXED PERFECT LAYOUT
============================= */
.gallery {
  display: grid;

  /* ✅ Linke Spalte hat FIXE Breite, wird NIE gequetscht */
  grid-template-columns: 350px 1fr;

  align-items: center;

  /* ✅ DU wolltest mehr Abstand */
  column-gap: clamp(60px, 8vw, 140px);

  padding: 60px 0;

  /* ✅ Größerer Maxwidth, damit Titel Platz haben */
  max-width: 1200px;
  margin: auto;
  font-family: var(--primaryFont);
}

/* =============================
   STACK (unchanged!)
============================= */
.stack {
  position: relative;
  width: 250px;
  height: 250px;
  overflow: visible;
}

.photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
    filter 0.35s ease,
    z-index 0.3s ease,
    box-shadow 0.45s ease;
  filter: brightness(0.82);
  border-radius: 2px;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

/* ✅ ORIGINAL STACK LOOK */
.photo-film {
  transform: rotate(-8deg) translate(-50px, -20px);
  z-index: 1;
}
.photo-dive {
  transform: rotate(4deg) translate(20px, 40px);
  z-index: 2;
}
.photo-web {
  transform: rotate(-3deg) translate(50px, 10px);
  z-index: 3;
}

.photo.active {
  transform: translate(0, 0) rotate(0deg) scale(1.05);
  filter: brightness(1);
  z-index: 10;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4);
}

/* =============================
   RIGHT COLUMN
============================= */
.links {
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 40px);

  /* ✅ Verhindert, dass der Titel die Spalte sprengt */
  min-width: 0;
}

.link {
  --hl: var(--primary-color, #ff6f61);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  text-decoration: none;
  color: var(--text-color);
  position: relative;
  padding-bottom: 8px;

  width: 100%;
}

/* underline */
.link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background: var(--hl);
  transition: width 0.25s ease;
}
.link:hover::after {
  width: 100%;
}

/* =============================
   TITLES — responsive max size
============================= */
.title {
  font-size: clamp(2rem, 4vw, 4rem);

  /* ✅ NO WRAP EVER */
  white-space: nowrap;

  text-overflow: clip;

  line-height: 1.05;
}

.subtitle {
  margin: 4px 0 0;
  opacity: 0.7;
  font-size: 1.1rem;
  white-space: nowrap;
}

/* =============================
   MOBILE
============================= */
@media (max-width: 900px) {
  .gallery {
    grid-template-columns: 1fr;
    row-gap: 120px;
    column-gap: 0;
  }

  .stack {
    margin: auto;
  }

  .links {
    order: 2;
    width: 100%;
  }

  .title {
    font-size: clamp(1.8rem, 8vw, 3rem);
  }
}
</style>
