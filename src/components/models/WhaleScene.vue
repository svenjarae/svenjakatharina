<template>
  <a-scene>
    <!-- Kamera -->
    <a-entity id="camera" camera :position="currentPosition" :rotation="currentRotation"></a-entity>

    <!-- Walhai -->
    <a-entity
      id="whale"
      gltf-model="/models/model_99a_-_whale_shark.glb"
      position="0 1 -5"
      animation-mixer="clip"
    ></a-entity>

    <!-- Licht -->
    <a-light type="directional" position="1 2 3"></a-light>
  </a-scene>
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    targetPosition: {
      type: Object,
      required: true,
    },
    targetRotation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPosition: { x: 0, y: 1.6, z: 4 }, // Initialposition der Kamera
      currentRotation: { x: 0, y: 0, z: 0 }, // Initialrotation der Kamera
    }
  },
  watch: {
    targetPosition(newPosition) {
      this.animateCameraPosition(newPosition)
    },
    targetRotation(newRotation) {
      this.animateCameraRotation(newRotation)
    },
  },
  methods: {
    animateCameraPosition(newPosition) {
      gsap.to(this.currentPosition, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 2,
        onUpdate: () => {
          const camera = this.$el.querySelector('#camera')
          camera.setAttribute('position', this.currentPosition)
        },
      })
    },
    animateCameraRotation(newRotation) {
      gsap.to(this.currentRotation, {
        x: newRotation.x,
        y: newRotation.y,
        z: newRotation.z,
        duration: 2,
        onUpdate: () => {
          const camera = this.$el.querySelector('#camera')
          camera.setAttribute('rotation', this.currentRotation)
        },
      })
    },
  },
}
</script>
