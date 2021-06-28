<template>
  <Tab v-model="tableForm" :tabs="tableFormTabs" />
  <ScrollView
    :questionnaire="questionnaire"
    :results="results"
    :questions="questions"
    :table-form="tableForm"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Tab from '/@/components/UI/Tab.vue.vue'
import ScrollView from './Spreadsheet/ScrollView.vue'
import { TableFormTypes, tableFormTabs } from './use/utils'

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
      type: Array as PropType<ResponseResult[]>,
      default: []
    },
    questions: {
      type: Array as PropType<QuestionDetails[]>,
      default: []
    }
  },
  setup() {
    const tableForm = ref<TableFormTypes>('view')
    return {
      tableForm,
      tableFormTabs
    }
  }
})
</script>
