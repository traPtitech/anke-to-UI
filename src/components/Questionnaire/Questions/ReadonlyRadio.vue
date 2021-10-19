<template>
  <div>
    <div v-for="(content, index) in contents" :key="index">
      <input type="radio" disabled /> <span>{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ReadonlyRadio',
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
