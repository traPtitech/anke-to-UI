<template>
  <div>
    {{ contentsleft }}
    <span v-for="n in contentsmax" :key="n">
      <tr>
        {{
          n + contentsmin - 1
        }}
      </tr>
      <tr>
        <input type="radio" disabled />
      </tr>
    </span>
    {{ contentsright }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionDetails } from '/@/lib/apis'

export default defineComponent({
  name: 'ReadonlyLinearScale',
  props: {
    contentsleft: {
      type: Object as PropType<QuestionDetails>,
      required: true
    },
    contentsright: {
      type: Object as PropType<QuestionDetails>,
      required: true
    },
    contentsmax: {
      type: Object as PropType<QuestionDetails>,
      required: true
    },
    contentsmin: {
      type: Object as PropType<QuestionDetails>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
