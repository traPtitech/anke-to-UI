<template>
  <div :class="$style.container">
    <div v-show="headerVisible" :class="$style.header">
      <slot name="header"></slot>
    </div>
    <div :class="$style.content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Card',
  props: {
    headerVisible: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 1rem 0;
}
.header {
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem;
}
.content {
  background-color: $bg-secondary;
  border-radius: 1rem;
}
</style>
