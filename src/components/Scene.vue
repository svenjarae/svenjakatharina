<template>
  <div>
    <!-- Langer Scrollbereich -->
    <a-scene
      xr-mode-ui="enabled: false"
      shadow="type: pcfsoft"
      fog="type: exponential; color: #000000; density: 0.05"
      embedded
    >
      <a-sky color="#0a254e"></a-sky>

      <!-- Grundbeleuchtung -->
      <a-light type="ambient" color="#fff" intensity="0.7"></a-light>

      <!-- Hauptlicht -->
      <a-light
        type="directional"
        position="0 10 -5"
        color="#cde7ff"
        intensity="1.5"
        castShadow="true"
        shadow-mapWidth="2048"
        shadow-mapHeight="2048"
        shadow-camera-left="-10"
        shadow-camera-right="10"
        shadow-camera-bottom="-10"
        shadow-camera-top="10"
      ></a-light>

      <!-- Punktuelles Licht -->
      <a-light type="point" position="2 3 -3" color="#87cefa" intensity="0.2"></a-light>

      <!-- Kamera -->
      <a-entity id="camera" camera position="0 1.6 5"></a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  name: 'Scene',
  mounted() {
    // Kamera-Referenz
    this.camera = this.$el.querySelector('#camera')
    this.scrollHeight = document.documentElement.scrollHeight - window.innerHeight

    // Scroll-Event-Listener auf `window` setzen
    window.addEventListener('scroll', this.onScroll)

    const scene = this.$el.querySelector('a-scene')
    scene.addEventListener('loaded', () => {
      console.log('A-Frame scene loaded')
    })
  },
  beforeUnmount() {
    // Entferne Scroll-Event-Listener beim Demontieren der Komponente
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const scrollTop = window.scrollY // Aktuelle Scrollposition
      const scrollFactor = scrollTop / this.scrollHeight // Normalisierter Scroll-Faktor

      // Kamera entlang der Z-Achse vom Walhai weg bewegen
      const newPositionZ = 5 + scrollFactor * 20 // Bewegung von Z: 5 bis Z: 25

      // Kamera aktualisieren
      this.camera.setAttribute('position', {
        x: 0,
        y: 1.6,
        z: newPositionZ,
      })
    },
  },
}
</script>

<style scoped>
a-scene {
  width: 100vw;
  height: 100vh;
}

div[style*='height: 300vh'] {
  background: linear-gradient(to bottom, #0a254e 0%, #00234c 100%);
}
</style>
