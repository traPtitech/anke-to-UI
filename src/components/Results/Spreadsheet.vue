<template>
  <Tab />
  <ScrollView />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Tab from './Spreadsheet/Tab.vue'
import ScrollView from './Spreadsheet/ScrollView.vue'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    ScrollView
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Object as PropType<ResponseResult[]>,
      required: true
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      required: true
    }
  }
})
</script>
