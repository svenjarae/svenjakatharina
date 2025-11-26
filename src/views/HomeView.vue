<template>
  <main class="home">
    <!-- Sidebar -->
    <SideBar
      :items="sections"
      :offset="80"
      :switchEarlyPx="200"
      :deactivate-after-last="true"
      deactivate-after-id="cta"
    />

    <!-- Start Section -->
    <section id="start" class="section">
      <WordAnimation />
      <div class="absolute-container">
        <AboutShowcase />
      </div>
    </section>

    <!-- Vertical Image Gallery (AUTOMATISCH AUS PROJECTS DATA) -->
    <VerticalImageGallery :images="galleryImages" />

    <!-- Skills -->
    <section id="skills" class="section">
      <StackedHoverGallery />
    </section>

    <!-- Vertical Image Gallery (AUTOMATISCH AUS PROJECTS DATA) -->
    <HorizontalImageGallery :images="galleryImages" />

    <!-- Projects -->
    <section id="projects" class="section">
      <div class="innerContainer">
        <ProjectsTabs :projects="myProjects">
          <template #panel="{ project }">
            <div class="flex-row">
              <div class="circle-cut">
                <img :src="project.previewImage" class="thumb" />
              </div>

              <div class="content">
                <h4>{{ project.subtitle }}</h4>
                <h2>{{ project.title }}</h2>
                <p>{{ project.teaser }}</p>
                <p class="info">{{ project.info }}</p>
              </div>
            </div>
          </template>
        </ProjectsTabs>
      </div>
    </section>

    <FullWidthSlider :projectId="2" :imageOpacity="1" :maxImages="5" />
  </main>
</template>

<script>
import SideBar from '@/components/navigation/SideBar.vue'
import WordAnimation from '@/components/animation/WordAnimation.vue'
import ProjectsTabs from '@/components/tabs/ProjectsTabs.vue'
import StackedHoverGallery from '@/components/images/StackedHoverGallery.vue'
import AboutShowcase from '@/components/text/AboutShowcase.vue'
import SectionCta from '@/components/sections/SectionCta.vue'
import FullWidthSlider from '@/components/slider/FullWidthSlider.vue'
import VerticalImageGallery from '@/components/images/VerticalImageGallery.vue'
import HorizontalImageGallery from '@/components/images/HorizontalImageGallery.vue'
import { projects } from '@/data/projectsData.js'

export default {
  name: 'Home',

  components: {
    SideBar,
    WordAnimation,
    ProjectsTabs,
    StackedHoverGallery,
    AboutShowcase,
    SectionCta,
    FullWidthSlider,
    VerticalImageGallery,
    HorizontalImageGallery,
  },

  data() {
    return {
      myProjects: projects,

      sections: [
        { id: 'start', number: '1', title: 'Start' },
        { id: 'skills', number: '2', title: 'Skills' },
        { id: 'projects', number: '3', title: 'Projects' },
      ],
    }
  },

  computed: {
    // Extract images from Project ID 1 automatically
    galleryImages() {
      const project = projects.find((p) => p.id === 1)
      if (!project) return []

      const imageGallery = project.sections.find((s) => s.type === 'imageGallery')
      if (!imageGallery) return []

      return imageGallery.images.map((img) => img.src)
    },
  },
}
</script>

<style scoped>
.home {
  position: relative;
  overflow-x: hidden;
}

.section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.absolute-container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
}

.content {
  font-size: 1.1rem;
  font-family: var(--primaryFont);
  color: var(--textColor);
  max-width: 700px;
}

.innerContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow-x: hidden;
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}

.circle-cut {
  width: 150px;
  height: 150px;
  border-radius: 2px;
  overflow: hidden;
}

.circle-cut img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .section {
    padding: 60px;
  }

  .flex-row {
    flex-direction: column;
  }

  .previewImgContainer {
    width: 100%;
    max-width: 100%;
  }
}
</style>
