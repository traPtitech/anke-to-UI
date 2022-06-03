<template>
  <div :class="$style.underlinefocus" />
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
  height: 1px;
  background-color: $ui-secondary;
  margin-top: -1px;
}
.underlinefocus {
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
