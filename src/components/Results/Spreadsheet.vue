<template>
  <Tab
    :table-form="tableForm"
    :table-form-tabs="tableFormTabs"
    :change-table-form="changeTableForm"
  />
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
import Tab from './Spreadsheet/Tab.vue'
import ScrollView from './Spreadsheet/ScrollView.vue'
import { TableFormStyle, tableFormTabs } from './use/utils'

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
      type: Object as PropType<QuestionDetails[]>,
      required: true
    }
  },
  setup() {
    const tableForm = ref<TableFormStyle>('view')
    const changeTableForm = (newTableForm: TableFormStyle) =>
      (tableForm.value = newTableForm)
    return {
      tableForm,
      tableFormTabs,
      changeTableForm
    }
  }
})
</script>
