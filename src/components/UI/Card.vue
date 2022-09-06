<template>
  <div :class="$style.content">
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Card',
  props: {
    hasPadding: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" module>
.content {
  background-color: $bg-secondary;
  border-radius: 8px;
  padding: 16px;
}
</style>
