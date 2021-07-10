<template>
  <div>{{ value }}</div>
  <textarea
    v-show="tableForm === 'markdown'"
    class="textarea"
    :value="markdownTable"
    :rows="markdownTable.split('\n').length + 3"
    readonly
  ></textarea>
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
