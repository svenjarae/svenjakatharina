<template>
  <div class="section-text">
    <h2>{{ section.title }}</h2>
    <p>{{ section.content }}</p>
  </div>
</template>

<script>
export default {
  props: ['section'],
}
</script>

<style scoped>
.section-text {
  max-width: 960px;
  margin: 0 auto 4rem auto;
  font-family: var(--primaryFont);
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

h2 {
  font-size: clamp(2rem, 4vw, 4rem);

    line-height: 1.05;
  color: var(--text-color);
}

p {
  margin: 4px 0 0;
    opacity: .7;
    font-size: 1.1rem;
  color: var(--color-text);
}
</style>
