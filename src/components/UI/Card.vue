<template>
  <div :class="[$style.content, hasPadding ? $style.paddingcontent : '']">
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
      default: true
    }
  }
})
</script>

<style lang="scss" module>
.content {
  background-color: $bg-secondary;
  border-radius: 8px;
}
.paddingcontent {
  padding: 16px;
}
</style>
