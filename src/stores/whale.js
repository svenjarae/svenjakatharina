// src/stores/whale.js
import { defineStore } from 'pinia'

export const useWhaleStore = defineStore('whale', {
  state: () => ({
    position: { x: 0, y: 1, z: -5 }, // Startposition des Walhais
  }),
  actions: {
    setPosition(newPosition) {
      this.position = newPosition
    },
    getPosition() {
      return this.position
    },
  },
})
