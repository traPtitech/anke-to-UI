<template>
  <div :class="$style.container">
    <div :class="$style.header">
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
  name: 'Card'
})
</script>

<style lang="scss" module>
.container {
  padding: 1rem 0 1rem;
}
.header {
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem;
}
.content {
  background-color: rgb(255, 255, 255);
  border-radius: 1rem;
}
</style>
