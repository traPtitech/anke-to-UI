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
  width: 277px;
  height: 1px;
  background-color: $accent-primary;
  transform: scaleX(0);
  transition: transform 0.1s;
  textarea:focus + &,
  input:focus + & {
    transform: scaleX(1);
  }
}
</style>
