<template>
  <header class="navbar">
    <!-- Desktop Navigation -->
    <nav class="nav-links">
      <router-link to="/" class="nav-link">Start</router-link>
      <router-link to="/skills" class="nav-link">Skills</router-link>
      <router-link to="/project/1" class="nav-link">Recent Project</router-link>
      <a href="mailto:svenjaraetzsch@gmail.com" class="nav-link">Say Hello</a>
    </nav>

    <div>
      <ToggleTheme />
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-menu">
      <button @click="toggleMobileMenu" class="menu-button" :class="{ open: isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Fullscreen Mobile Menu -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-overlay">
        <nav class="mobile-nav">
          <router-link to="/" class="mobile-link" @click="closeMobileMenu">
            Svenja Katharina
          </router-link>
          <router-link to="/skills" class="mobile-link" @click="closeMobileMenu">
            Skills
          </router-link>
          <router-link to="/project/1" class="mobile-link" @click="closeMobileMenu">
            Recent Project
          </router-link>
          <a href="mailto:svenjaraetzsch@gmail.com" class="mobile-link" @click="closeMobileMenu">
            Say Hello
          </a>

          <div class="mobile-theme-toggle">
            <ToggleTheme />
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script>
import ToggleTheme from '@/components/buttons/ToggleTheme.vue'

export default {
  name: 'MainNav',
  components: { ToggleTheme },
  data() {
    return {
      isMobileMenuOpen: false,
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
  },
}
</script>

<style scoped>
.navbar {
  font-family: var(--primaryFont);
  position: fixed;
  right: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  max-width: 1800px;
  margin: auto;
  color: var(--text-color);
  transition:
    background-color 0.3s,
    color 0.3s;
}

/* Desktop Navigation */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  position: relative;
  text-decoration: none;
  font-size: 1.1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

/* ⭐ Restored Orange Hover Line */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;

  /* ORANGE HOVER LINE */
  background: #ff7a00; /* Change here if needed */

  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Mobile Menu Button (Hamburger) */
.mobile-menu {
  display: none;
}

.menu-button {
  width: 34px;
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 3000;
}

.menu-button span {
  display: block;
  height: 4px;
  width: 100%;
  background: var(--text-color);
  border-radius: 2px;
  transition: 0.3s;
}

/* Animation for open state */
.menu-button.open span:nth-child(1) {
  transform: translateY(12px) rotate(45deg);
}
.menu-button.open span:nth-child(2) {
  opacity: 0;
}
.menu-button.open span:nth-child(3) {
  transform: translateY(-12px) rotate(-45deg);
}

/* Mobile Fullscreen Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2500;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
}

.mobile-link {
  font-size: 1.8rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 400;
}

.mobile-link:hover {
  opacity: 0.7;
}

.mobile-theme-toggle {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.nav-link.router-link-active {
  color: rgb(255, 111, 97) !important;
}

.nav-link.router-link-active::after {
  width: 100%; /* permanent underline */
  background: rgb(255, 111, 97);
}

/* Responsive */
@media (max-width: 920px) {
  .nav-links {
    display: none;
  }

  .mobile-menu {
    display: block;
  }

  .navbar {
    padding: 20px 40px;
  }
}
</style>
