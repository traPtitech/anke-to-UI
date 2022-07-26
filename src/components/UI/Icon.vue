<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="box"
    role="img"
    :class="$style.icon"
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
}
</style>
