<template>
  <div>
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'QuestionTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
