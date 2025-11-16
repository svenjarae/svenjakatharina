<template>
  <div class="marquee" :style="rootStyle">
    <div class="track" :style="trackStyle">
      <div class="segment">
        <div v-for="(it, i) in normalized" :key="'segA-' + i" class="item">
          <img :src="it.src" :alt="it.alt || 'Bild ' + (i + 1)" />
        </div>
      </div>
      <div class="segment" aria-hidden="true">
        <div v-for="(it, i) in normalized" :key="'segB-' + i" class="item">
          <img :src="it.src" :alt="it.alt || 'Bild ' + (i + 1)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoMarqueeSlider',
  props: {
    items: { type: Array, required: true }, // strings oder {src, alt}
    speed: { type: [String, Number], default: '20s' }, // 'slow' | 'normal' | 'fast' | '12s'
    gap: { type: String, default: '16px' },
    height: { type: String, default: '100px' },
  },
  computed: {
    normalized() {
      return (this.items || []).map((x, i) =>
        typeof x === 'string' ? { src: x, alt: 'Bild ' + (i + 1) } : x,
      )
    },
    dur() {
      if (typeof this.speed === 'number') return this.speed + 's'
      const map = { slow: '30s', normal: '20s', fast: '10s' }
      return map[this.speed] || this.speed || '20s'
    },
    rootStyle() {
      return { '--gap': this.gap, '--height': this.height, '--dur': this.dur }
    },
    trackStyle() {
      return { animationDuration: 'var(--dur)' }
    },
  },
}
</script>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
  height: var(--height);
}

/* Track: bewegt sich, hat nun auch GAP zwischen den beiden Segmenten */
.track {
  display: flex;
  gap: var(--gap); /* 👈 sorgt für Lücke zwischen Segment A und B (Naht 5↔1) */
  will-change: transform;
  animation-name: marquee-x;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: running;
}

/* Hover pausiert die Animation */
.marquee:hover .track {
  animation-play-state: paused;
}

/* Jedes Segment enthält die Items mit eigenem Gap */
.segment {
  display: inline-flex;
  flex: 0 0 auto;
  gap: var(--gap);
}

/* Items */
.item {
  flex: 0 0 auto;
}
.item img {
  width: 120px; /* nach Bedarf anpassen */
  height: 120px;
  display: block;
  border-radius: 100%;
  object-fit: cover;
}

/* genau um eine Segmentbreite schieben */
@keyframes marquee-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
