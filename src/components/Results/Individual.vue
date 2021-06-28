<template>
  <div>個人の回答を表示する</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'

export default defineComponent({
  name: 'Individual',
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Array as PropType<ResponseResult[]>,
      default: []
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      default: []
    }
  },
  setup() {
    return {}
  }
})
</script>
