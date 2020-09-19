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
      <div class="scroll-view">
        <!-- table view -->
        <table v-show="tableForm === 'view'" class="table is-striped">
          <TableHeader
            :table-headers="tableHeaders"
            :show-column="showColumn"
            :get-results="getResults"
            :toggle-show-column="toggleShowColumn"
          />
          <TableBody
            :results="results"
            :default-columns="defaultColumns"
            :table-headers="tableHeaders"
            :show-column="showColumn"
            :table-form="tableForm"
          />
        </table>

        <!-- markdown, csv view -->
        <button v-if="isTextTable" class="button copy" @click="copyTable">
          <Icon name="clipboard" />
        </button>
        <button
          v-if="isTextTable"
          class="button download"
          @click="downloadTable"
        >
          <Icon name="download" />
        </button>
        <textarea
          v-for="(table, name) in textTables"
          v-show="tableForm === name"
          :key="name"
          class="textarea"
          :value="table"
          :rows="table.split('\n').length + 3"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { Responce, Question, ResponceBody } from '/@/lib/apis'
import Tab from '/@/components/Results/Spreadsheet/Tab.vue'
import TableHeader from '/@/components/Results/Spreadsheet/TableHeader.vue'
import TableBody from '/@/components/Results/Spreadsheet/TableBody.vue'

type State = {
  tableForm: string
  showColumn: boolean[]
}

type Props = {
  results: Responce[]
  questions: Question[]
}

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    TableHeader,
    TableBody
  },
  setup(props: Props, context) {
    const defaultColumns = [
      { name: 'traqId', label: 'traQID' },
      { name: 'submittedAt', label: '回答日時' }
    ]
    const downloadLabel = 'CSV形式でダウンロード'
    const state = reactive<State>({
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
      (): number => defaultColumns.length + props.questions.length
    )

    const route = useRoute()
    const questionnaireId = computed((): number => Number(route.params.id))
    const tableHeaders = computed((): string[] =>
      defaultColumns.map(column => column.label).concat(props.questions)
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
      defaultColumns,
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
