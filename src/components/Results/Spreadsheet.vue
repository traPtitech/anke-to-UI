<template>
  <div class="wrapper">
    <div class="card">
      <Tab
        :table-form-tabs="tableFormTabs"
        :table-form="tableForm"
        :is-text-table="isTextTable"
        @change-tab="changeTab"
        @copy-table="copyTable"
        @download-table="downloadTable"
      />
      <ScrollView
        :table-form="tableForm"
        :table-headers="tableHeaders"
        :show-column="showColumn"
        :toggle-show-column="toggleShowColumn"
        :results="results"
        :default-columns="defaultColumns"
        :is-text-table="isTextTable"
        :text-tables="textTables"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  computed,
  watchEffect,
  toRefs
} from 'vue'

import { useRoute } from 'vue-router'
import { Responce, Question, ResponceBody } from '/@/lib/apis'
import ScrollView from '/@/components/Results/Spreadsheet/ScrollView.vue'

type State = {
  tableForm: string
  showColumn: boolean[]
}

type Context = {}

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    ScrollView
  },
  props: {
    results: {
      type: Array as PropType<Response[]>,
      required: true
    },
    questions: {
      type: Array as PropType<Question[]>,
      required: true
    }
  },
  setup(props, context) {
    const DEFAULT_COLUMNS = [
      { name: 'traqId', label: 'traQID' },
      { name: 'submittedAt', label: '回答日時' }
    ]
    const downloadLabel = 'CSV形式でダウンロード'
    const state = reactive<{
      tableForm: string
      showColumn: boolean[]
    }>({
      tableForm: 'view',
      showColumn: []
    })

    const initializeShowColumn = (len: number): void => {
      if (state.showColumn.length < len) {
        state.showColumn = new Array(len).fill(true)
      }
    }

    const downloadTable = (): void => {
      if (!isTextTable.value) return
      let form: { type: string; ext: string; data: string }
      switch (state.tableForm) {
        case 'markdown':
          form = {
            type: 'text/markdown',
            ext: '.md',
            data: markdownTable.value
          }
          break
        case 'csv':
          form = { type: 'text/csv', ext: '.csv', data: csvTable.value }
          break
        default:
          return
      }
      const blob = new Blob([form.data], { type: form.type })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Result' + form.ext
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const changeTab = (tab: string) => (state.tableForm = tab)

    const getResults = (queryString: string) => {
      context.emit('get-results', queryString)
    }
    const arrayToMarkdown = (arr: string[]): string => {
      let ret = '|'
      arr
        .filter((val, index) => !isColumnHidden(index))
        .forEach(val => {
          ret += ' ' + val + ' |'
        })
      ret += '\n'
      return ret
    }
    const toggleShowColumn = (index: number): void => {
      state.showColumn[index] = !state.showColumn[index]
    }
    const isColumnHidden = (index: number): boolean =>
      state.showColumn.length === tableWidth.value && !state.showColumn[index]

    const copyTable = (): void => {
      // TODO vue clipboardがないのでどうするか
      // context.root.$copyText(textTables.value[state.tableForm])
    }

    const tableWidth = computed(
      (): number => DEFAULT_COLUMNS.length + props.questions.length
    )

    const route = useRoute()
    const questionnaireId = computed((): number => Number(route.params.id))
    const tableHeaders = computed((): string[] =>
      DEFAULT_COLUMNS.map(column => column.label).concat(props.questions)
    )
    const textTables = computed((): { [key: string]: string } => ({
      markdown: markdownTable.value,
      csv: csvTable.value
    }))

    // TODO markdownとcsv
    const markdownTable = computed((): string => '')
    const csvTable = computed((): string => '')

    const isTextTable = computed((): boolean =>
      Object.keys(textTables.value).includes(state.tableForm)
    )

    watchEffect(() => {
      initializeShowColumn(tableWidth.value)
    })

    return {
      ...toRefs(state),
      DEFAULT_COLUMNS,
      tableFormTabs: ['view', 'markdown', 'csv'],
      isTextTable,
      copyTable,
      changeTab,
      downloadTable,
      tableHeaders,
      isColumnHidden,
      toggleShowColumn,
      getResults,
      textTables
    }
  }
})
</script>
