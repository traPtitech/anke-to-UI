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
  border: solid 1.5px #d9d9d9;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}
.header {
  border-bottom: solid 1px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  padding: 1rem;
}
.content {
  padding: 1rem;
}
</style>
