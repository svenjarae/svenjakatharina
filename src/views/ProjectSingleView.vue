<template>
  <SideBar
    :items="sections"
    :offset="80"
    :switchEarlyPx="200"
    :deactivate-after-last="true"
    deactivate-after-id="project-end"
  />

  <div class="bgSingleProject project-single">
    <!-- HEADER -->
    <SpecialHeader :project="project" />

    <section id="project" class="single-project-wrapper">
      <div v-if="project">
        <!-- ⭐ Dynamische Sections -->
        <section
          v-for="(section, index) in project.sections"
          :key="index"
          class="section dynamic-section"
        >
          <h2 class="sr-only">
            {{ section.title || `Section ${index + 1}` }}
          </h2>

          <component :is="getComponent(section.type)" :section="section" />
        </section>

        <!-- ⭐ Navigation -->
        <div class="project-nav">
          <!-- PREV BUTTON -->
          <button class="nav-button left" v-if="prevProject" @click="goToProject(prevProject.id)">
            <span class="label">Prev:</span>
            <span class="title">{{ prevProject.title }}</span>

            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 -960 960 960">
              <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
            </svg>

            <span class="hover-line"></span>
          </button>

          <!-- NEXT BUTTON -->
          <button class="nav-button right" v-if="nextProject" @click="goToProject(nextProject.id)">
            <span class="label">Next:</span>
            <span class="title">{{ nextProject.title }}</span>

            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 -960 960 960">
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>

            <span class="hover-line"></span>
          </button>
        </div>
      </div>

      <div v-else class="not-found">
        <p>Projekt nicht gefunden.</p>
      </div>
    </section>

    <section id="project-end" style="height: 1px"></section>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { projects } from '@/data/projectsData.js'
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'

// Sections
import SectionText from '@/components/sections/SectionText.vue'
import SectionImageGallery from '@/components/sections/SectionImageGallery.vue'
import SectionFeatures from '@/components/sections/SectionFeatures.vue'
import FullWidthSlider from '@/components/slider/FullWidthSlider.vue'
import SectionYouTube from '@/components/sections/SectionYouTube.vue'

// Sidebar & Header
import SideBar from '@/components/navigation/SideBar.vue'
import SpecialHeader from '@/components/text/SpecialHeader.vue'

export default {
  components: {
    SideBar,
    SpecialHeader,
    SectionText,
    SectionImageGallery,
    SectionFeatures,
    FullWidthSlider,
    SectionYouTube,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const sections = ref([])
    const project = ref(null)
    const prevProject = ref(null)
    const nextProject = ref(null)

    // ⭐ Ladefunktion
    const loadProject = () => {
      const projectId = parseInt(route.params.id)
      const index = projects.findIndex((p) => p.id === projectId)

      project.value = projects[index] || null
      prevProject.value = projects[index - 1] || null
      nextProject.value = projects[index + 1] || null

      // ⭐ Sidebar Abschnitt
      sections.value = [
        {
          id: 'project',
          number: '1',
          title: project.value?.title || 'Project',
        },
      ]
    }

    loadProject()

    watch(
      () => route.params.id,
      () => {
        loadProject()
        window.scrollTo(0, 0)
      },
    )

    const goToProject = (id) => {
      router.push(`/project/${id}`)
    }

    const getComponent = (type) =>
      ({
        text: 'SectionText',
        imageGallery: 'SectionImageGallery',
        features: 'SectionFeatures',
        fullWidthSlider: 'FullWidthSlider',
        youtube: 'SectionYouTube',
      })[type] || 'div'

    // Scroll Effekt
    const imageOpacity = ref(1)
    const imageScale = ref(1)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const fade = Math.min(1, Math.max(0, scrollY / 80))
      imageOpacity.value = 1 - fade * 0.4
      imageScale.value = 1 + fade * 0.1
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      project,
      prevProject,
      nextProject,
      goToProject,
      getComponent,
      sections,
      imageOpacity,
      imageScale,
    }
  },
}
</script>

<style scoped>
.project-single {
  padding: 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.single-project-wrapper {
  width: 100%;
}

.dynamic-section {
  margin: 4rem 0;
}

/* ⭐ PROJECT NAVIGATION */
.project-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  gap: 2rem;
}

.nav-button {
  position: relative;
  background: transparent;
  color: var(--text-color);
  border: none;
  font-size: 1.1rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 4px;
  transition: 0.2s ease;
}

/* text parts */
.nav-button .label {
  opacity: 0.6;
  font-size: 0.92rem;
}

.nav-button .title {
  font-weight: 600;
}

/* SVG icons */
.nav-button svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

/* orange hover underline */
.nav-button .hover-line {
  position: absolute;
  bottom: -3px;
  left: 0;
  height: 2px;
  width: 0%;
  background: var(--accent-color, #ff6a00);
  transition: width 0.25s ease;
}

.nav-button:hover .hover-line {
  width: 100%;
}

/* hover icon animations */
.nav-button.left:hover svg {
  transform: translateX(-5px);
}
.nav-button.right:hover svg {
  transform: translateX(5px);
}

/* not found */
.not-found {
  text-align: center;
  padding: 5rem;
  font-size: 1.5rem;
  color: #999;
}

.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}

@media (max-width: 560px) {
  .project-single {
    padding: 40px;
  }
  /* ⭐ PROJECT NAVIGATION */
  .project-nav {
    display: block;
  }
}
</style>
