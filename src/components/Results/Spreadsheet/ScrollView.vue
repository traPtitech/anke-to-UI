<template>
  <div>
    <!-- table view -->
    <table v-if="tableForm === 'view'">
      <TableHeader
        :table-headers="tableHeaders"
        :toggle-show-column="toggleShowColumn"
        :show-columns="showColumns"
      />
      <TableBody :results="results" />
    </table>

    <!-- markdown, csv view -->
    <button v-if="isTextTable" @click="copyTable">
      <Icon name="clipboard" />
    </button>
    <button v-if="isTextTable" @click="downloadTable">
      <Icon name="download" />
    </button>
    <textarea
      v-for="(table, name) in textTables"
      v-show="tableForm === name"
      :key="name"
      :value="table"
      :rows="table.split('\n').length + textareaAdditionalLineNum"
      readonly
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import {
  TableFormStyle,
  isTextTable,
  textTables,
  defaultColumns,
  textareaAdditionalLineNum
} from '../use/utils'

export default defineComponent({
  name: 'ScrollView',
  components: {
    Icon,
    TableHeader,
    TableBody
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Arrayas PropType<ResponseResult[]>,
      default: []
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      required: true
    },
    tableForm: {
      type: Object as PropType<TableFormStyle>,
      required: true
    }
  },
  setup(props) {
    const copyTable = () => undefined
    const downloadTable = () => undefined
    const questionLabels = computed(() =>
      props.questions.map(question => question.body)
    )
    const tableHeaders = computed(() =>
      defaultColumns.map(data => data.label).concat(questionLabels.value)
    )

    // カラムの表示非表示
    let showColumns = ref(
      new Array(props.questions.length + defaultColumns.length).fill(true)
    )
    watch(props.questions, () => {
      showColumns.value = new Array(
        props.questions.length + defaultColumns.length
      ).fill(true)
    })
    const toggleShowColumn = index => {
      if (index < 0 || index >= showColumns.value.length) return
      showColumns.value[index] = !showColumns[index]
    }

    return {
      copyTable,
      downloadTable,
      tableHeaders,
      showColumns,
      isTextTable,
      textTables,
      toggleShowColumn,
      textareaAdditionalLineNum
    }
  }
})
</script>
