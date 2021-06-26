<template>
  <div>
    <Tab
      :table-form="tableForm"
      :table-form-tabs="tableFormTabs"
      :change-table-form="changeTableForm"
    />
    <div>
      <!-- table view -->
      <div v-if="tableForm === 'view'">
        <Data :results="results" :questions="questions" />
      </div>

      <!-- markdown view -->
      <textarea
        v-if="tableForm === 'markdown'"
        :value="markdownTable"
        :rows="markdownTable.split('\n').length + textareaAdditionalLineNum"
        readonly
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Tab from './Statistics/Tab.vue'
import Data from './Statistics/Data.vue'
import {
  TableFormStyle,
  tableFormTabs,
  textareaAdditionalLineNum
} from './use/utils'

export default defineComponent({
  name: 'Statistics',
  components: {
    Tab,
    Data
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
  },
  setup() {
    const markdownTable = computed(() => {
      // マークダウン生成
      return ''
    })

    const tableForm = ref<TableFormStyle>('view')
    const changeTableForm = (newTableForm: TableFormStyle) =>
      (tableForm.value = newTableForm)

    return {
      tableForm,
      tableFormTabs,
      changeTableForm,
      markdownTable,
      textareaAdditionalLineNum
    }
  }
})
</script>
