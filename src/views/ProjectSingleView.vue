<template>
  <!-- PAGE TRANSITION WRAPPER → sorgt für übergang wie auf allen anderen Seiten -->
  <div class="page-anim" :class="{ 'page-enter': isEntering }">
    <!-- Sidebar -->
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
          <!-- DYNAMIC SECTIONS -->
          <section
            v-for="(section, index) in project.sections"
            :key="index"
            class="section dynamic-section"
          >
            <h2 class="sr-only">{{ section.title || `Section ${index + 1}` }}</h2>
            <component :is="getComponent(section.type)" :section="section" />
          </section>

          <!-- PROJECT NAVIGATION -->
          <div class="project-nav">
            <!-- PREVIOUS PROJECT -->
            <button class="nav-button left" v-if="prevProject" @click="goToProject(prevProject.id)">
              <span class="label">Prev:</span>
              <span class="title">{{ prevProject.title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
              </svg>
              <span class="hover-line"></span>
            </button>

            <!-- NEXT PROJECT -->
            <button
              class="nav-button right"
              v-if="nextProject"
              @click="goToProject(nextProject.id)"
            >
              <span class="label">Next:</span>
              <span class="title">{{ nextProject.title }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
              <span class="hover-line"></span>
            </button>
          </div>
        </div>

        <!-- ERROR FALL -->
        <div v-else class="not-found">
          <p>Projekt nicht gefunden.</p>
        </div>
      </section>

      <section id="project-end" style="height: 1px"></section>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { projects } from '@/data/projectsData.js'
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'

import SectionText from '@/components/sections/SectionText.vue'
import SectionImageGallery from '@/components/sections/SectionImageGallery.vue'
import SectionFeatures from '@/components/sections/SectionFeatures.vue'
import FullWidthSlider from '@/components/slider/FullWidthSlider.vue'
import SectionYouTube from '@/components/sections/SectionYouTube.vue'

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

    const isEntering = ref(true)

    const loadProject = () => {
      const projectId = parseInt(route.params.id)
      const index = projects.findIndex((p) => p.id === projectId)

      project.value = projects[index] || null
      prevProject.value = projects[index - 1] || null
      nextProject.value = projects[index + 1] || null

      sections.value = [
        {
          id: 'project',
          number: '1',
          title: project.value?.title || 'Project',
        },
      ]
    }

    loadProject()

    // RUN ENTER ANIMATION WHEN switching between projects
    watch(
      () => route.params.id,
      () => {
        loadProject()
        window.scrollTo(0, 0)

        isEntering.value = false
        requestAnimationFrame(() => {
          isEntering.value = true
        })
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

    // Your scroll effect:
    const handleScroll = () => {}

    onMounted(() => {
      setTimeout(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
      }, 400)
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
      isEntering,
    }
  },
}
</script>

<style>
/* ✨ PAGE ENTER ANIMATION — smooth & cinematic */
.page-anim {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(10px);
  transition: all 0.6s ease;
}
.page-anim.page-enter {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* ----- EXISTING PROJECT PAGE STYLES ----- */

.project-single {
  padding: 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.single-project-wrapper {
  width: 100%;
}

.dynamic-section {
  margin: 6rem 0;
}

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

.nav-button .label {
  opacity: 0.6;
  font-size: 0.92rem;
}

.nav-button .title {
  font-weight: 600;
}

.nav-button svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

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

.nav-button.left:hover svg {
  transform: translateX(-5px);
}

.nav-button.right:hover svg {
  transform: translateX(5px);
}

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

  .project-nav {
    display: block;
  }
}
</style>
