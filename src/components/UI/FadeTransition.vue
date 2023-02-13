<template>
  <transition name="fadeTransition">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FadeTransition'
})
</script>

<style lang="scss" module>
:global {
  .fadeTransition-enter-active,
  .fadeTransition-leave-active {
    transition: opacity 0.2s;
  }
  .fadeTransition-enter-from,
  .fadeTransition-leave-to {
    opacity: 0;
  }
}
</style>
