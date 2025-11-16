<template>
  <footer class="landscape-footer">
    <SectionCta :bubbleColor="'16, 185, 129'" :paperAlpha="0.45" />
    <div class="footer-content">
      <div class="column">
        <svg
          fill="#ff6f61"
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 133.87 76.94"
        >
          <g id="Layer_1-2" data-name="Layer 1">
            <g>
              <path
                d="M133.48,1.04v30.71c0,.05-.7.75-.75.75h-9.49c-5.24,0-13.2-5.44-14.88-10.58-2.51-7.67-.36-12.19,5.51-16.74.41-.32.91,0,.63-1.14-8.61-.41-17.76,3.14-16.97,13.22,1.23,15.65,30.96,16.61,35.72,34.19,3.21,11.86-6.36,25.49-19,25.49h-44.94c-.05,0-.75-.7-.75-.75v-32.71c15.66-3.11,33.12,6.78,25.16,24.41l-4.69,5.05c11.18.88,19.13-6.93,14.34-18.09-6.84-15.94-36.6-14.04-36.63-35.67-.02-16.11,13.47-18.05,26.5-18.67,10.91-.52,26.77-.85,37.5,0,.96.08,1.81.29,2.72.52Z"
              />
              <path
                d="M54.33,34.5c-5.28-.53-11.25-3.21-14.44-7.53-3.78-5.13-4.03-13.05-.41-18.3.46-.67,3.62-3.65,3.11-4.13-17.28,3.57-15.84,26.91.28,31.43,3.21.9,5.95-.6,5.22,4.03-21.74-.81-24.48,26.33-5.5,32.96.5-.49-2.6-3.4-3.09-4.15-.97-1.5-2.2-4.31-2.4-6.09-1.94-17.03,12.78-20.14,26.47-19.73v33.21c0,.05-.7.75-.75.75H19.87c-14.39,0-23.72-13.36-18.32-26.81,2.45-6.1,6.52-8.85,12.07-11.9C-1.85,32.91-3.4,9.18,12,2.66c1.92-.81,6.43-2.12,8.37-2.12h42.45c.05,0,.75.7.75.75v32.46c0,.05-.7.75-.75.75-2.67,0-5.92.26-8.49,0Z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div class="column">
        <h3>PROJECTS</h3>
        <ul>
          <li v-for="project in projects" :key="project.id">
            <router-link :to="`/project/${project.id}`">{{ project.name }}</router-link>
          </li>
        </ul>
      </div>

      <div class="column">
        <h3>TOOLSET</h3>
        <ul>
          <li>UW Filmmaking</li>
          <li>Diving</li>
          <li>Web Development</li>
        </ul>
      </div>

      <div class="column">
        <h3>CONTACT</h3>
        <p>svenjaraetzsch@gmail.com</p>
      </div>
    </div>
  </footer>
</template>

<script>
import SectionCta from '@/components/sections/SectionCta.vue'
export default {
  name: 'Footer',
  components: {
    SectionCta,
  },
  data() {
    return {
      projects: [
        { id: 1, name: 'Coast of Hope' },
        { id: 2, name: 'The Last of Their Kind' },
        { id: 3, name: 'Projekt 3' },
      ],
    }
  },
}
</script>

<style scoped>
.column svg {
  position: relative;
  left: 0;
  width: 100px;
}
.landscape-footer {
  margin-top: 60px;
  position: relative;
  color: var(--text-color);
  overflow: hidden;
}

.footer-content {
  padding: 60px;
  display: flex;
  justify-content: space-between;
  max-width: 1800px;
  margin: 0 auto;
}

.column {
  text-align: left;
}

.column h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--text-color);
}

.column ul {
  list-style: none;
  padding: 0;
}

.column a {
  color: var(--text-color);
  font-size: 1.1rem;
  font-family: var(--primaryFont);
}

.column ul li {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  font-family: var(--primaryFont);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 40px;
    padding: 40pxpx;
  }
  .column {
    text-align: left;
  }
}
</style>
