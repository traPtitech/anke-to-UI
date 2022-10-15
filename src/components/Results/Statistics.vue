<template>
  <div :class="$style.container">
    <div v-for="(question, i) in resultsPerQuestion.questions" :key="i">
      <view-card
        :question-data="resultsPerQuestion.questions[i]"
        @copy="copy(question)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ViewCard from './Statistics/ViewCard.vue'
import { AllTypeQuestionUnion, ResultsPerQuestion } from './use/statistics'
import {
  generateQuestionCSVTable,
  generateQuestionMarkdownTable
} from './use/CopyForm'
import { FormTypes } from './use/utils'

export default defineComponent({
  name: 'Statistics',
  components: {
    ViewCard
  },
  props: {
    formType: {
      type: String as PropType<FormTypes>,
      required: true
    },
    resultsPerQuestion: {
      type: Object as PropType<ResultsPerQuestion>,
      required: true
    }
  },

  setup(props) {
    const copy = (questionData: AllTypeQuestionUnion) => {
      if (props.formType === 'Markdown') {
        navigator.clipboard.writeText(
          generateQuestionMarkdownTable(questionData)
        )
      } else {
        navigator.clipboard.writeText(generateQuestionCSVTable(questionData))
      }
    }

    return {
      copy
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
