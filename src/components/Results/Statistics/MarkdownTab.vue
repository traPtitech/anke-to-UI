<template>
  <div>
    <textarea :value="value" :rows="rows" readonly></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MarkdownTab',
  props: {
    value: {
      type: String,
      required: true
    },
    rows: { type: Number, default: 0 }
  },
  setup() {
    return {}
  }
})
</script>
