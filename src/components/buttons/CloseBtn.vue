<template>
  <div class="close-icon" @click="$emit('close')">
    <div class="line line1"></div>
    <div class="line line2"></div>
  </div>
</template>

<script>
export default {
  name: 'CloseIcon',
}
</script>

<style scoped>
.close-icon {
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  transform: translate(-50%);
  top: -40px;
  background-color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 2px;
}

.line {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: var(--bg-color);
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
}

.line1 {
  transform: rotate(45deg);
}

.line2 {
  transform: rotate(-45deg);
}

.close-icon:hover .line {
  background-color: var(--text-color);
  transform: scale(1.1);
}

.close-icon:hover {
  background-color: var(--bg-color);
}
</style>
