<!-- src/components/ServicesList.vue -->
<template>
  <div class="accordion">
    <div v-for="(topic, index) in topics" :key="index" class="accordion-item">
      <!-- Header -->
      <router-link :to="{ name: 'skills', hash: `#${topic.sectionId}` }" class="accordion-header">
        <div class="text-content">
          <h2 class="title">{{ topic.title }}</h2>
          <p class="subtitle">{{ topic.description }}</p>
        </div>
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--text-color)"
          >
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicesList',
  data() {
    return {
      topics: [
        {
          title: 'UW Filmmaking',
          description: 'Cinematic Storytelling',
          sectionId: 'uw-filming', // ✅ statt link: id der Section in SkillsView
        },
        {
          title: 'Diving',
          description: 'Scuba & Apnea',
          sectionId: 'diving', // ✅
        },
        {
          title: 'Web Development',
          description: 'Building modern, responsive, and user-friendly websites',
          sectionId: 'web-dev', // ✅
        },
      ],
    }
  },
}
</script>

<style scoped>
/* dein bestehendes CSS unverändert */
.accordion {
  flex-direction: column;
  max-width: 960px;
  margin: auto;
  z-index: 1;
  width: 100%;
}
.accordion-item {
  position: relative;
}
.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  padding: 1rem 0;
}
.accordion-header:hover {
  color: var(--hover-color);
}
.accordion-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #ff6f61;
  transition: width 0.3s ease-in-out;
}
.accordion-header:hover::after {
  width: 100%;
}
.text-content {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.title {
  font-size: 4rem;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}
.subtitle {
  font-size: 14px;
  color: var(--text-color);
  margin: 0;
}
.icon {
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;
  color: var(--text-color);
}
.accordion-header:hover .icon {
  transform: translateX(5px);
}
@media only screen and (max-width: 1000px) {
  .title {
    font-size: 4vw;
  }
}
</style>
