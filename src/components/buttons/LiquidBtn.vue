<template>
  <div class="button-container">
    <button class="gradient-button">
      {{ btnText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'GradientBorderButton',
  props: {
    btnText: {
      type: String,
      required: true, // The button text is required
    },
  },
}
</script>

<style scoped>
/* Main Container */
.button-container {
  display: flex;
  justify-content: center;
  padding: 60px;
}

/* Button Styling */
.gradient-button {
  position: relative;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-text);
  text-align: center;
  text-decoration: none;
  padding: 15px 40px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  overflow: hidden;
}

/* Gradient Border */
.gradient-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 2px;
  padding: 3px; /* Adjust thickness of the border */
  background: linear-gradient(90deg, #ff6ec4, #7873f5, #1fd1f9, #38ef7d, #ff6ec4);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor; /* Ensures the center is cut out */
  z-index: -1;
  animation: gradient-animation 3s linear infinite; /* Smooth color movement */
}

/* Button Text */
.gradient-button {
  z-index: 1;
}

/* Border Animation */
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
