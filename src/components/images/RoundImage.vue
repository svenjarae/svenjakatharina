<template>
  <div class="round-image-wrapper">
    <img :src="src" :alt="alt" class="round-image" />
  </div>
</template>

<script>
export default {
  name: 'RoundImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.round-image-wrapper {
}

.round-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
