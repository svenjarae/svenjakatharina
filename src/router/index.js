// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SkillsView from '../views/SkillsView.vue'
import SceneView from '../views/SceneView.vue'
import ProjectSingleView from '../views/ProjectSingleView.vue'

// 👉 GSAP / ScrollTrigger importieren, damit wir beim Routen alles killen können
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Kleiner Helfer: warte bis das Ziel-Element gerendert ist
const waitForEl = (hash, tries = 40) =>
  new Promise((resolve) => {
    if (!hash) return resolve(null)
    const el = document.querySelector(hash)
    if (el) return resolve(el)
    if (tries <= 0) return resolve(null)
    // ~16ms pro Versuch ≈ 0.64s gesamt
    setTimeout(() => resolve(waitForEl(hash, tries - 1)), 16)
  })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // ✅ Einheitliches Scroll-Verhalten
  scrollBehavior: async (to, from, savedPosition) => {
    // Zurück/Weiter → Standard-Verhalten
    if (savedPosition) return savedPosition

    // Anker-Navigation (#id)
    if (to.hash) {
      const el = await waitForEl(to.hash)
      if (el) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }
      // Fallback, falls Anker nicht gefunden
      return { top: 0, behavior: 'smooth' }
    }

    // Standard: immer nach oben
    return { top: 0, behavior: 'smooth' }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView,
    },
    {
      path: '/scene',
      name: 'scene',
      component: SceneView,
    },
    {
      path: '/project/:id',
      name: 'ProjectSingleView',
      component: ProjectSingleView,
    },
  ],
})

/**
 * 🔥 WICHTIG:
 * Vor JEDEM Routenwechsel alle alten ScrollTrigger (inkl. pin-spacer)
 * killen, damit nichts von der vorherigen Seite übrig bleibt.
 */
router.beforeEach((to, from, next) => {
  if (typeof window !== 'undefined' && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((t) => t.kill())
    ScrollTrigger.clearMatchMedia()
    // einmal kurz refreshen, um Layout neu zu berechnen
    ScrollTrigger.refresh()
  }

  // Zur Sicherheit auch Scroll-Position einmal hard resetten
  window.scrollTo(0, 0)

  next()
})

export default router
