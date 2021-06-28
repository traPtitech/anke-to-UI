<template>
  <div>{{ value }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarkdownTab',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
