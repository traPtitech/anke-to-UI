<template>
  <div>
    <!-- table view -->
    <table v-if="tableForm === 'view'">
      <TableHeader
        :table-headers="tableHeaders"
        :show-columns="showColumns"
        @toggleShowColumn="toggleShowColumn"
      />
      <TableBody :results="results" />
    </table>

    <!-- markdown, csv view -->
    <button v-if="isTextTable">
      <Icon name="clipboard" />
    </button>
    <button v-if="isTextTable">
      <Icon name="download" />
    </button>
    <textarea
      v-for="(table, name) in textTables"
      v-show="tableForm === name"
      :key="name"
      :value="table"
      :rows="table.split('\n').length + TEXTAREA_ADDITIONAL_LINE_NUM"
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
  TableFormTypes,
  getIsTextTable,
  textTables,
  defaultColumns,
  TEXTAREA_ADDITIONAL_LINE_NUM
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
      type: Array as PropType<ResponseResult[]>,
      default: []
    },
    questions: {
      type: Array as PropType<QuestionDetails[]>,
      default: []
    },
    tableForm: {
      type: String as PropType<TableFormTypes>,
      required: true
    }
  },
  setup(props) {
    const isTextTable = computed(() => getIsTextTable(props.tableForm))
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
    const toggleShowColumn = (index: number) => {
      if (index < 0 || index >= showColumns.value.length) return
      showColumns.value[index] = !showColumns.value[index]
    }

    return {
      tableHeaders,
      showColumns,
      isTextTable,
      textTables,
      toggleShowColumn,
      TEXTAREA_ADDITIONAL_LINE_NUM
    }
  }
})
</script>
