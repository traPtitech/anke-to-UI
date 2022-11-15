<template>
  <div :class="[$style.container, isCurrent ? $style.current : '']">
    {{ number }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PaginationButton',
  props: {
    number: {
      type: Number,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.container {
  @include size-body-small;
  @include weight-bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 99rem;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
    background: $bg-primary-highlight;
  }
}
.current {
  color: $ui-white;
  background: $accent-primary;
  &:hover {
    transform: none;
    background: $accent-primary;
  }
}
</style>
