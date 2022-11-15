<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="box"
    role="img"
    :class="[$style.icon, hoverAnimation ? $style.hover : '']"
  >
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import mdi from '/@/assets/mdi'
export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    },
    hoverAnimation: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const path = computed(() => mdi.get(props.name))
    const box = computed(() => {
      return `0 ${(props.width - props.height) / 2} ${props.width} ${
        props.height
      }`
    })

    return { path, box }
  }
})
</script>

<style lang="scss" module>
.icon {
  contain: strict;
  display: flex;
  border-radius: 99rem;
}
.hover {
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
    background: $bg-primary-highlight;
  }
}
</style>
