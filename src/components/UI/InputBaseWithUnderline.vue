<template>
  <div>
    <slot />
    <input-focus-underline :class="$style.underline" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputFocusUnderline from './InputFocusUnderline.vue'

export default defineComponent({
  name: 'InputBaseWithUnderline',
  components: {
    InputFocusUnderline
  }
})
</script>

<style lang="scss" module>
.underline {
  position: relative;
  z-index: 2;
  margin-top: -1px;
}
</style>
