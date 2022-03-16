<template>
  <div>
    <Tab v-model="tableForm" :tabs="tableFormTabs" />
    <div>
      {{ questionnaire.title }}
      これをheader.vueみたいなの作って渡して、それっぽく表示する
    </div>
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
      <!-- markdown view -->
      <markdown-tab
        v-if="tableForm === 'markdown'"
        :value="markdownText"
        :rows="markdownText.split('\n').length + TEXTAREA_ADDITIONAL_LINE_NUM"
        class="textarea"
      />

      <!-- csv view -->
      <csv-tab
        v-if="tableForm === 'csv'"
        :value="csvText"
        :rows="csvText.split('\n').length + TEXTAREA_ADDITIONAL_LINE_NUM"
        class="textarea"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Tab from '/@/components/UI/Tab.vue'
import Icon from '/@/components/UI/Icon.vue'
import TableHeader from '/@/components/Results/Spreadsheet/TableHeader.vue'
import TableBody from '/@/components/Results/Spreadsheet/TableBody.vue'
import {
  TableFormTypes,
  getIsTextTable,
  defaultColumns,
  resultsToMarkdown,
  TEXTAREA_ADDITIONAL_LINE_NUM,
  tableFormTabs
} from '/@/components/Results/use/utils'
import MarkdownTab from './Spreadsheet/MarkdownTab.vue'
import CsvTab from './Spreadsheet/CsvTab.vue'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    Icon,
    TableHeader,
    TableBody,
    MarkdownTab,
    CsvTab
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
  setup(props) {
    const tableForm = ref<TableFormTypes>('view')
    const isTextTable = computed(() => getIsTextTable(tableForm.value))
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

    const markdownText = resultsToMarkdown(tableHeaders.value, props.results)
    const csvText = 'csvをべた書き'

    return {
      tableForm,
      tableFormTabs,
      tableHeaders,
      showColumns,
      isTextTable,
      markdownText,
      csvText,
      toggleShowColumn,
      TEXTAREA_ADDITIONAL_LINE_NUM
    }
  }
})
</script>
<style lang="scss" module>
.textarea {
  color: black;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1rem;
  padding: 1rem;
  width: 98%;
  line-height: 1.5rem;
}
</style>
