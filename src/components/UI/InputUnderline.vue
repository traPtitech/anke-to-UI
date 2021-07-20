<template>
  <div :class="$style.underline" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputUnderline',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.underline {
  width: 100%;
  height: 2px;
  margin-top: -1px;
  background-color: #7c6c4d;
  transform: scaleX(0);
  transition: transform 0.1s;
}
</style>
