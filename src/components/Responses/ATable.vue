<template>
  <div :class="$style.content">
    <div :class="$style.header">
      <slot name="header1"></slot>
    </div>
    <div :class="$style.table">
      <slot name="content1"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ATable'
})
</script>

<style lang="scss" module>
.content {
  padding: 1rem;
  border: solid 1.5px #dfe0d7;
  border-collapse: collapse;
  overflow: auto;
}
.header {
  width: 100%;
  padding: 1rem;
  border-collapse: collapse;
}
.table {
  font-size: 1.4rem;
  border-bottom: solid 1.5px #d9d9d9;
  &:nth-child(even) {
    background-color: #fafafa;
  }
}
</style>
