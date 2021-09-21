<template>
  <tr :class="$style.container">
    <slot />
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableRow',
  components: {},
  props: {},
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
  font-size: 1rem;
  border-bottom: solid 1.5px #d9d9d9;
  &:nth-child(odd) {
    background-color: #fafafa;
  }
}
</style>
