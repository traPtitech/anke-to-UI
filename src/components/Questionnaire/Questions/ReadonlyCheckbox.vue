<template>
  <div>
    <div v-for="(content, index) in contents" :key="index">
      <input type="checkbox" disabled /> <span>{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ReadonlyCheckbox',
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

<style lang="scss" module></style>
