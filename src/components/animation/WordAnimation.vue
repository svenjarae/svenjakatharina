<template>
  <div :class="['word-cloud', { blurred: isScrolled }]" :style="scrolledStyles">
    <div
      v-for="(word, index) in animatedWords"
      :key="index"
      class="word"
      :style="wordStyles[index]"
      ref="wordElements"
    >
      {{ word }}
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'DynamicWordCloud',
  props: {
    words: {
      type: Array,
      default: () => [
        'WE ARE',
        'CREATIVE',
        'WOMAN',
        'FRIEND',
        'INDEPENDENT',
        'HUMAN',
        'LEARN',
        'LOVE',
        'TIDES',
        'ARCHITECTURE',
        'VISUAL',
        'SPIRITUAL',
        'APNEA',
        'OCEAN',
        'RHYTHM',
        'CREATIVITY',
        'KINDNESS',
        'FOCUS',
        'PASSION',
        'VISIONARY',
        'COLLABORATIVE',
        'EXPLORERS',
        'DREAMERS',
        'INNOVATORS',
        'MINIMALISTS',
        'INSPIRED',
        'ADVENTUROUS',
        'FREEDOM',
        'INDEPENDENCE',
        'FILMMAKERS',
        'ARTISTS',
        'ADRENALINE',
        'STORYTELLERS',
        'THINKERS',
        'DEVELOPERS',
        'DESIGNERS',
        'PHOTOGRAPHERS',
        'VIDEOGRAPHERS',
        'DIVERS',
        'TRAVELERS',
        'EXPLORATION',
        'HOPE',
        'IMAGINATION',
        'BELIEVERS',
        'OPEN-MINDED',
        'REFLECTIVE',
        'WEIGHTLESS',
        'BUILDERS',
        'EXPERIMENTAL',
        'UNIQUE',
      ],
    },
  },
  setup(props) {
    const wordElements = ref([])
    const animatedWords = ref([...props.words])
    const wordStyles = ref([])
    const isScrolled = ref(false)
    const scrolledStyles = ref({})

    const getRandomPosition = () => {
      const x = Math.random() * 60 - 30
      const y = Math.random() * 60 - 30
      const z = Math.random() * 30 - 15
      const fontSize = Math.random() * 0.8 + 0.7
      const opacity = Math.random() * 0.8 + 0.2
      return {
        transform: `translate3d(${x}vw, ${y}vh, ${z}px)`,
        fontSize: `${fontSize}rem`,
        opacity,
      }
    }

    const animateWords = () => {
      wordElements.value.forEach((el) => {
        gsap.to(el, {
          duration: Math.random() * 6 + 4,
          x: `+=${Math.random() * 40 - 20}`,
          y: `+=${Math.random() * 40 - 20}`,
          z: `+=${Math.random() * 20 - 10}`,
          opacity: Math.random() * 0.8 + 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      })
    }

    const replaceWord = (index) => {
      const wordPool = [...props.words]
      const currentWord = animatedWords.value[index]
      const newWord = wordPool.filter((w) => w !== currentWord)[
        Math.floor(Math.random() * (wordPool.length - 1))
      ]
      animatedWords.value[index] = newWord
    }

    const startWordReplacement = () => {
      animatedWords.value.forEach((_, index) => {
        const interval = Math.random() * 4000 + 2000
        setInterval(() => {
          replaceWord(index)
        }, interval)
      })
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY

      if (scrollPosition > 0 && scrollPosition <= 100) {
        isScrolled.value = true
        const scale = 1 - scrollPosition / 500
        const blur = scrollPosition / 12
        scrolledStyles.value = {
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
        }
      } else if (scrollPosition > 100) {
        scrolledStyles.value = {
          transform: `scale(0.8)`,
          filter: `blur(8px)`,
        }
      } else {
        isScrolled.value = false
        scrolledStyles.value = {
          transform: `scale(1)`,
          filter: '', // lässt CSS zurück auf blur(3px)
        }
      }
    }

    onMounted(() => {
      wordStyles.value = animatedWords.value.map(() => getRandomPosition())
      wordElements.value = Array.from(document.querySelectorAll('.word'))
      animateWords()
      startWordReplacement()
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { animatedWords, wordStyles, wordElements, isScrolled, scrolledStyles }
  },
}
</script>

<style scoped>
.word-cloud {
  filter: blur(3px);
  position: fixed;
  top: -30vh;
  left: -30vw;
  width: 160vw;
  height: 160vh;
  overflow: hidden;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: -1;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
}

.word-cloud.blurred {
  z-index: 0;
}

.word {
  position: absolute;
  white-space: nowrap;
  color: var(--text-color);
  font-weight: 600;
  pointer-events: none;
  font-family: var(--primaryFont);
}
</style>
