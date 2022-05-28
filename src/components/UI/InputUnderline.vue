<template>
  <!-- <div :class="($style.underline, [orange ? $style.orange : $style.blue])" /> -->
  <div :class="[$style.underline, isBlue ? $style.blue : '']" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputUnderline',
  props: {
    isBlue: {
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
$orange: #ac4848;
$blue: #005bac;
.underline {
  width: 100%;
  height: 2px;
  background-color: $orange;
  transform: scaleX(0);
  transition: transform 0.1s;
  textarea:focus + &,
  input:focus + & {
    transform: scaleX(1);
  }
}
.blue {
  background-color: $blue;
}
</style>
