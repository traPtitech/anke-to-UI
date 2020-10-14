<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <slot name="header"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Card'
})
</script>

<style lang="scss" module>
.header {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 15pt;
  padding: 1rem;
}
</style>
