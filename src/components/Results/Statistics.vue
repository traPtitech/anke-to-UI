<template>
  <div :class="$style.container">
    <div v-for="(data, i) in countedData" :key="i">
      <view-tab :counted-data="data" @copy="copy(data)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import ViewTab from './Statistics/ViewCard.vue'
import {
  countData,
  CountedData,
  FormTypes,
  generateQuestionMarkdownTable,
  generateQuestionCSVTable
} from './use/utils'

export default defineComponent({
  name: 'Statistics',
  components: {
    ViewTab
  },
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
    },
    formType: {
      type: String as PropType<FormTypes>,
      required: true
    }
  },

  setup(props) {
    const copy = (data: CountedData) => {
      if (props.formType === 'Markdown') {
        navigator.clipboard.writeText(generateQuestionMarkdownTable(data))
      } else {
        navigator.clipboard.writeText(generateQuestionCSVTable(data))
      }
    }

    const countedData = computed(() =>
      countData(props.questions, props.results)
    )

    return {
      countedData,
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
