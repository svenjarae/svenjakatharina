<template>
  <div class="section-youtube">
    <h2 v-if="section.title">{{ section.title }}</h2>
    <p v-if="section.content">{{ section.content }}</p>

    <div class="yt-frame">
      <iframe
        :src="`https://www.youtube.com/embed/${section.videoId}`"
        title="YouTube Video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>


  </div>
</template>

<script>
export default {
  props: ['section'],
}
</script>

<style scoped>
.section-youtube {
  max-width: 960px;
  margin: 6rem auto 6rem auto;
  font-family: var(--primaryFont);
}

h2 {
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1.05;
  color: var(--text-color);
}

.yt-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 2px;
  overflow: hidden;
  margin: 1rem 0;
}

.yt-frame iframe {
  width: 100%;
  height: 100%;
}
</style>
