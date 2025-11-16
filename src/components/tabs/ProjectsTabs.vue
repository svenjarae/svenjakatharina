<template>
  <section class="projects-tabs" role="tablist" aria-label="Select Projects">
    <article v-for="(p, i) in list" :key="p.id || i" class="tab">

      <!-- Header -->
      <button
        class="tab__header"
        role="tab"
        :aria-expanded="isOpen(i) ? 'true' : 'false'"
        :aria-controls="`panel-${uid}-${i}`"
        @click="toggle(i)"
      >
        <div class="tab__meta">
          <div class="tab__date">{{ p.date }}</div>
          <div class="tab__title">{{ p.title }}</div>
          <div class="tab__location">{{ p.location }}</div>
          <div class="tab__category">{{ p.category }}</div>
        </div>
        <span class="tab__chev" :class="{ open: isOpen(i) }">⌄</span>
      </button>

      <!-- Panel -->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div
          v-show="isOpen(i)"
          class="tab__panel-wrap"
          role="tabpanel"
          :id="`panel-${uid}-${i}`"
        >
          <div class="tab__panel">
            <slot name="panel" :project="p" :index="i">
              <div class="placeholder"><p>No panel content provided.</p></div>
            </slot>

            <div class="buttonContainer">
              <component style="cursor: pointer;"
                v-if="resolveTo(p)"
                :is="isExternal(resolveTo(p)) ? 'a' : RouterLink"
                :href="isExternal(resolveTo(p)) ? resolveTo(p) : undefined"
                :to="!isExternal(resolveTo(p)) ? resolveTo(p) : undefined"
                class="project-link"
                :aria-label="'See more: ' + (p.title || 'Project')"
                @click.stop
                :target="isExternal(resolveTo(p)) ? '_blank' : null"
                :rel="isExternal(resolveTo(p)) ? 'noopener' : null"
              >
                <span class="project-link__text">See more</span>
                <span class="project-link__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
                    viewBox="0 -960 960 960" fill="currentColor">
                    <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                  </svg>
                </span>
              </component>
            </div>
          </div>
        </div>
      </transition>

      <!-- Divider -->
      <div class="tab__divider" role="separator" aria-hidden="true"></div>

    </article>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'ProjectsTabs',
  components: { RouterLink },

  props: {
    projects: { type: Array, default: () => [] },
    fallbackRouteName: { type: String, default: 'ProjectSingleView' },
  },

  setup(props) {
    const fallback = [
      {
        id: 'fallback',
        date: 'Fallback',
        title: 'Mobula Bycatch Study',
        location: 'Gulf Islands, BCS, Mexico',
        href: '/project/5',
        category: 'Research'
      },
    ]

    const list = computed(() => props.projects.length ? props.projects : fallback)

    const openIndex = ref(null)
    const isOpen = i => openIndex.value === i
    const toggle = i => openIndex.value = isOpen(i) ? null : i

    watch(list, () => openIndex.value = null)

    const beforeEnter = el => { el.style.height = '0'; el.style.overflow = 'hidden' }
    const enter = el => {
      el.style.transition = 'height 320ms ease'
      el.style.height = el.scrollHeight + 'px'
    }
    const afterEnter = el => {
      el.style.height = 'auto'
      el.style.overflow = ''
    }
    const beforeLeave = el => {
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    }
    const leave = el => {
      el.style.transition = 'height 260ms ease'
      el.style.height = '0'
    }
    const afterLeave = el => {
      el.style.overflow = ''
      el.style.transition = ''
    }

    const uid = Math.random().toString(36).slice(2)

    const isExternal = to => typeof to === 'string' && /^https?:\/\//i.test(to)
    const resolveTo = p =>
      p?.href ? p.href :
      p?.id ? { name: 'ProjectSingleView', params: { id: p.id }} : null

    return {
      list,
      isOpen,
      toggle,
      beforeEnter, enter, afterEnter,
      beforeLeave, leave, afterLeave,
      uid,
      resolveTo,
      isExternal,
      RouterLink
    }
  },
}
</script>

<style scoped>
.projects-tabs {
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  color: var(--text-color);
  font-family: var(--primaryFont);
  font-size: 1.1rem;
}

/* Header */
.tab__header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 10px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  text-align: left;
  color: var(--text-color);
}

/* Layout */
.tab__meta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  min-width: 0;
}

.tab__title,
.tab__location,
.tab__category {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tab__chev {
  transition: transform 200ms ease;
}
.tab__chev.open { transform: rotate(180deg); }

/* Panel */
.tab__panel { padding: 1rem 30px; text-align: left; }

/* --- Neuer Hover-Stil (wie features-grid) --- */
.tab__divider {
  position: relative;
  height: 4px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Basislinie (grau, immer sichtbar) */
.tab__divider::before,
.tab__divider::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  pointer-events: none;
  background-repeat: repeat-x;
  background-position: left bottom;
  background-size: 10px 4px;
}

/* graue Punkte */
.tab__divider::before {
  background-image: radial-gradient(circle, currentColor 2px, transparent 2.5px);
  opacity: 0.35;
}

/* orange Punkte (animiert) */
.tab__divider::after {
  background-image: radial-gradient(circle, #ff6f61 2px, transparent 2.5px);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 380ms ease;
  will-change: transform;
}

/* Hover oder geöffnet */
.tab:hover .tab__divider::after,
.tab__header[aria-expanded="true"] ~ .tab__divider::after {
  transform: scaleX(1);
}

/* Fokus für Tastatur */
.tab__header:focus-within ~ .tab__divider::after {
  transform: scaleX(1);
}

/* Barrierefreiheit */
@media (prefers-reduced-motion: reduce) {
  .tab__divider::after {
    transition: none;
  }
}

/* Button */
.buttonContainer {
  display: flex;
  justify-content: right;
}
.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
  padding: 0.5rem;
  position: relative;
  text-decoration: none;
}
.project-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  height: 3px;
  background: #ff6f61;
  transition: width 0.3s;
}
.project-link:hover::after { width: 100%; }

.project-link__icon {
  transition: transform 0.3s ease;
}
.project-link:hover .project-link__icon {
  transform: translateX(5px);
}

.placeholder {
  padding: 0.75rem;
  background: #f7f7f7;
  border-radius: 2px;
}
</style>
