<template>
  <div class="sidebar" role="navigation" aria-label="Seiten-Navigation">
    <nav class="nav-links">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click.prevent="scrollToSection(item.id)"
      >
        <span class="vertical-label">{{ item.title }}</span>
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

/* ---------------------------------------------
   PROPS
--------------------------------------------- */
const props = defineProps({
  items: { type: Array, required: true },
  offset: { type: Number, default: 80 },
  switchEarlyPx: { type: Number, default: 0 },

  /* beide deaktiviert = automatisch bestimmen */
  deactivateAfterLast: { type: Boolean, default: true },
  deactivateAfterId: { type: String, default: '' },
})

/* ---------------------------------------------
   STATE
--------------------------------------------- */
const activeSection = ref(null)
let rafId = 0

const elById = (id) => (id ? document.getElementById(id) : null)
const sectionEls = () => (props.items || []).map((i) => elById(i.id)).filter(Boolean)

/* ---------------------------------------------
   NEUE LOGIK: AUTODEAKTIVIEREN NACH LETZTER SECTION
--------------------------------------------- */
function computeActiveId() {
  const els = sectionEls()
  if (!els.length) return null

  const scrollY = window.scrollY || 0

  // Scroll-Marker (ein Punkt unter deinem Header)
  const markerY = scrollY + (props.offset || 0) + (props.switchEarlyPx || 0)

  // Falls du doch eine Marker-ID übergeben willst, ist das weiterhin erlaubt
  if (props.deactivateAfterId) {
    const marker = elById(props.deactivateAfterId)
    if (marker) {
      const mTop = marker.getBoundingClientRect().top + scrollY
      if (markerY >= mTop) return null
    }
  }

  /* ---------------------------------------------
     🔥 AUTOMATISCHE ERKENNUNG DES ENDES
  --------------------------------------------- */
  const last = els[els.length - 1]
  const lastBottom = last.getBoundingClientRect().bottom + scrollY

  // Wenn Scrollmarker UNTER letzter Section → deaktivieren
  if (props.deactivateAfterLast && markerY >= lastBottom) {
    return null
  }

  /* ---------------------------------------------
     Normale Aktivierung
  --------------------------------------------- */
  let current = null

  for (const el of els) {
    const top = el.getBoundingClientRect().top + scrollY
    if (top <= markerY) current = el.id
  }

  // Wenn vor der ersten Section → nichts aktiv
  const firstTop = els[0].getBoundingClientRect().top + scrollY
  if (markerY < firstTop) return null

  return current
}

function updateActive() {
  const id = computeActiveId()
  if (activeSection.value !== id) {
    activeSection.value = id
  }
}

function onScrollOrResize() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateActive)
}

/* ---------------------------------------------
   SCROLL TO SECTION
--------------------------------------------- */
function scrollToSection(id) {
  const el = elById(id)
  if (!el) return

  const targetY = window.scrollY + el.getBoundingClientRect().top - (props.offset || 0)

  window.history.replaceState(null, '', `#${id}`)
  window.scrollTo({ top: targetY, behavior: 'smooth' })
}

/* ---------------------------------------------
   LIFECYCLE
--------------------------------------------- */
onMounted(async () => {
  await nextTick()
  updateActive()

  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScrollOrResize)
  window.removeEventListener('resize', onScrollOrResize)
})

watch(
  () => (props.items || []).map((i) => i.id).join('|'),
  async () => {
    await nextTick()
    updateActive()
  },
)
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 3;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.nav-item {
  transform: rotate(-90deg);
  text-decoration: none;
  color: var(--text-color, #888);
  font-size: 1.1rem;
  letter-spacing: 2px;
  opacity: 0;
  transition:
    color 0.6s ease,
    opacity 0.6s ease,
    transform 0.4s ease,
    font-size 0.4s ease;
}

.nav-item.active {
  color: var(--highlightColor, orange);
  opacity: 1;
  font-weight: 700;
}

.vertical-label {
  display: inline-block;
  letter-spacing: 3px;
  pointer-events: none;
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}
</style>
