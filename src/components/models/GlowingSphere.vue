<template>
  <div class="globe-container" ref="container"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

export default {
  name: 'GlowingRotatingGlobe',
  mounted() {
    this.initScene()
    this.createGlobe()
    this.addGlowEffect()
    this.addLights()
    this.addOrbitControls()
    this.animateGlobe()
    this.startRendering()
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
    if (this.renderer) this.renderer.dispose()
    if (this.controls) this.controls.dispose()
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene()

      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      this.camera.position.z = 4

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.$refs.container.appendChild(this.renderer.domElement)
    },
    createGlobe() {
      const geometry = new THREE.SphereGeometry(1, 64, 64)

      // Globale Textur (z. B. eine Weltkarte)
      const texture = new THREE.TextureLoader().load(
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg',
      )

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.5,
        metalness: 0.2,
      })

      this.globe = new THREE.Mesh(geometry, material)
      this.scene.add(this.globe)
    },
    addGlowEffect() {
      const glowGeometry = new THREE.SphereGeometry(1.2, 64, 64) // Leicht größere Kugel
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          viewVector: { type: 'v3', value: this.camera.position },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.9 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity; // Blaues Leuchten
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      })

      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
      this.scene.add(glowMesh)
    },
    addLights() {
      const ambientLight = new THREE.AmbientLight(0x404040, 10) // Grundbeleuchtung
      const pointLight = new THREE.PointLight(0xffffff, 1.5)
      pointLight.position.set(5, 5, 5)
      this.scene.add(ambientLight, pointLight)
    },
    addOrbitControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.1
      this.controls.enableZoom = false // Deaktiviert das Zoomen für bessere Kontrolle
    },
    animateGlobe() {
      gsap.to(this.globe.rotation, {
        y: '+=6.28', // 360 Grad (2 * Math.PI)
        duration: 10,
        repeat: -1, // Endlose Wiederholung
        ease: 'none',
      })
    },
    startRendering() {
      const renderLoop = () => {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(renderLoop)
      }
      renderLoop()
    },
    onWindowResize() {
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    },
  },
}
</script>

<style scoped>
.globe-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle, #000428, #004e92); /* Dunkler Hintergrund */
}
</style>
