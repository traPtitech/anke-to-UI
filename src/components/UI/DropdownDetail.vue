<template>
  <div :class="$style.content">{{ content }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownDetail',
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.content {
  position: absolute;
  word-break: normal;
  z-index: 1;
  @include size-body-small-2;
  background-color: $ui-primary;
  border-radius: 6px;
  color: $ui-white;
  padding: 2px 10px;
}
</style>
