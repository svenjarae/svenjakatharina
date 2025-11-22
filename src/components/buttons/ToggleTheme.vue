<template>
  <button
    class="heart-toggle"
    :class="{ on: isOn }"
    role="switch"
    :aria-checked="isOn"
    @click="toggleTheme"
  >
    <span class="heart"></span>

    <!-- knob erhält dynamisch die Animationsklasse -->
    <span class="knob" :class="animationClass" @animationend="animationClass = ''"></span>
  </button>
</template>

<script>
export default {
  name: 'ToggleThemeHeart',
  data() {
    return {
      isOn: false,
      animationClass: '',
    }
  },
  mounted() {
    this.isOn = true
    document.documentElement.classList.add('dark')
  },
  methods: {
    toggleTheme() {
      const old = this.isOn
      this.isOn = !this.isOn

      // Animation setzen
      this.animationClass = this.isOn ? 'animate-on' : 'animate-off'

      // Theme toggeln
      document.documentElement.classList.toggle('dark', this.isOn)
    },
  },
}
</script>

<style scoped>
/* ---------- Variablen ---------- */
.heart-toggle {
  --size: 64px;
  --inactive: #161616;
  --active: #d64b3d;
  --knob-size: 18px;
  --shadow: 0 6px 12px rgba(0, 0, 0, 0.25);

  position: relative;
  width: var(--size);
  height: calc(var(--size) * 0.9);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

/* ---------- Herzform ---------- */
.heart {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--size) * 0.62);
  height: calc(var(--size) * 0.62);
  background: var(--inactive);
  transform: translate(-50%, -45%) rotate(-45deg);
  border-radius: 10%;
  box-shadow: var(--shadow);
  transition: background 0.25s ease;
}

.heart:before,
.heart:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
}

.heart:before {
  top: -50%;
  left: 0;
}

.heart:after {
  left: 50%;
  top: 0;
}

.heart-toggle.on .heart,
.heart-toggle.on .heart:before,
.heart-toggle.on .heart:after {
  background: var(--active);
}

/* ---------- Knopf ---------- */
.knob {
  position: absolute;
  width: var(--knob-size);
  height: var(--knob-size);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);

  /* Startposition (inaktiv): oben links */
  left: 12%;
  top: 10%;
}

/* Endposition ohne Animation (aktiv) */
.heart-toggle.on .knob:not(.animate-on):not(.animate-off) {
  left: 62%;
  top: 10%;
}

/* ---------- Animationen ---------- */
/* aktive Richtung */
@keyframes knob-on {
  0% {
    left: 12%;
    top: 10%;
  }
  55% {
    left: 40%;
    top: 55%;
  } /* Zwischenposition – unten */
  100% {
    left: 62%;
    top: 10%;
  }
}

/* rückwärts */
.animate-on {
  animation: knob-on 0.45s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.animate-off {
  animation: knob-on 0.45s cubic-bezier(0.25, 0.8, 0.25, 1) reverse forwards;
}
</style>
