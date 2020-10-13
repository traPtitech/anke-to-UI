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
.container {
  width: 100%;
  max-width: fit-content;
  margin: 1em 0;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
.header {
  text-align: left;
  font-size: 15pt;
  margin: 8px 0;
}
</style>
