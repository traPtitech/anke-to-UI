<template>
  <div :class="[isFocused ? $style.focused : '', $style.underline]" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputUnderline',
  props: {
    isFocused: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.underline {
  width: 100%;
  height: 2px;
  background-color: #7c6c4d;
  transform: scaleX(0);
  transition: transform 0.1s;
}
.focused {
  transform: scaleX(1);
}
</style>
