<template>
  <div :class="$style.focusunderline" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'InputFocusUnderline',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.focusunderline {
  width: 100%;
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
