<template>
  <section
    class="insta-cta"
    :style="{
      '--ink': inkColor,
      '--bubble': bubbleColor,
      '--paperAlpha': paperAlpha,
    }"
  >
    <div class="wrap">
      <h2 class="h">Stay in the loop</h2>

      <p class="sub">
        Regular updates, dive notes, and project bits on
        <a :href="profileUrl" class="link" target="_blank" rel="noopener">@svenjaraetzsch</a>.
        Prefer DMs? <span class="nowrap">Say hi anytime.</span>
      </p>

      <div class="actions">
        <a
          :href="profileUrl"
          target="_blank"
          rel="noopener"
          class="btn primary"
          aria-label="Open Instagram profile @svenjaraetzsch"
        >
          Follow on Instagram
        </a>

        <a :href="mailtoUrl" class="btn ghost" aria-label="Send me an email"> Message me </a>
      </div>

      <div class="secondary">
        also worth a look:
        <a
          href="https://www.instagram.com/oceancollective"
          target="_blank"
          rel="noopener"
          class="chip"
          >@oceancollective</a
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionInstagram',
  props: {
    inkColor: { type: String, default: '#0f172a' }, // Textfarbe
    bubbleColor: { type: String, default: '0, 180, 255' }, // RGB der Bubbles (ohne alpha)
    paperAlpha: { type: Number, default: 0.5 }, // Transparenz des weißen Overlays (0–1)
    handle: { type: String, default: 'svenjaraetzsch' },
    email: { type: String, default: 'svenjaraetzsch@gmail.com' },
  },
  computed: {
    profileUrl() {
      return `https://www.instagram.com/${this.handle}`
    },
    mailtoUrl() {
      const subject = encodeURIComponent('Hello from your website')
      const body = encodeURIComponent('Hi Svenja,\n\nI just saw your work and...')
      return `mailto:${this.email}?subject=${subject}&body=${body}`
    },
  },
}
</script>

<style scoped>
.insta-cta {
  color: var(--text-color);
  border-radius: 2px;
  position: relative;
  overflow: hidden; /* falls Bubbles weit rausgehen */
  z-index: 10;
  pointer-events: auto;
  isolation: isolate;
  padding: 60px;
  max-width: 1800px;
  margin: 0 auto;
}

.wrap {
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 1;
}

.h {
  font-size: clamp(20px, 2.4vw, 28px);
  letter-spacing: -0.02em;
  margin: 0 0 8px 0;
  font-weight: 700;
}

.sub {
  margin: 0 0 20px 0;
  font-size: clamp(14px, 1.4vw, 16px);
  line-height: 1.6;
  opacity: 0.9;
}

.nowrap {
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 2px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid rgba(15, 23, 42, 0.14);

  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.btn.primary {
  background: var(--text-color);
  color: var(--bg-color);
  border-color: transparent;
}
.btn.primary:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.btn.ghost {
  color: var(--text-color);
}
.btn.ghost:hover {
  background: rgba(15, 23, 42, 0.04);
  transform: translateY(-1px);
}

.secondary {
  margin-top: 8px;
  font-size: 13px;
  opacity: 0.75;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.link:hover {
  opacity: 0.8;
}

.chip {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 2px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: inherit;
  text-decoration: none;
}
.chip:hover {
  background: rgba(15, 23, 42, 0.04);
}
</style>
