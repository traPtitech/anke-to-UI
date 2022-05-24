<template>
  <div>
    <textarea
      :class="$style.textarea"
      :value="value"
      :rows="rows"
      readonly
    ></textarea>
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

<style lang="scss" module>
.textarea {
  color: black;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1rem;
  padding: 1rem;
  width: 98%;
  line-height: 1.5rem;
}
</style>
