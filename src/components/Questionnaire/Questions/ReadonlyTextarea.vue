<template>
  <div>
    <p :class="$style.box"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ReadonlyTextarea',
  props: {
    contents: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.box {
  border-bottom: 1px dotted black;
}
</style>
