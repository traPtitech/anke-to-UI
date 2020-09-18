<template>
  <div class="wrapper">
    <div class="card">
      <Tab
        :table-form-tabs="tableFormTabs"
        :table-form="tableForm"
        :is-text-table="isTextTable"
      />
      <div class="scroll-view">
        <!-- table view -->
        <table v-show="tableForm === 'view'" class="table is-striped">
          <TableHeader
            :table-headers="tableHeaders"
            :sorted="sorted"
            :show-column="showColumn"
            @sort="sort"
            @toggle-show-column="toggleShowColumn"
          />
          <TableBody />
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
  sorted: string | number
}

type Props = {
  resutls: Responce[]
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
      showColumn: [],
      sorted: ''
    })

    const initializeShowColumn = (len: number): void => {
      if (state.showColumn.length < len) {
        state.showColumn = new Array(len).fill(true)
      }
    }
    const getTableRow = (index: number): string[] => {
      const ret = defaultColumns
        .map(column => props.results[index][column.name])
        .concat(
          props.results[index].responseBody.map((response: any) =>
            responseToString(response)
          )
        )
      return ret
    }

    const responseToString = (body: ResponceBody): string => {
      let ret = ''
      switch (body.question_type) {
        case 'MultipleChoice':
        case 'Checkbox':
        case 'Dropdown':
          body.option_response.forEach((response: string) => {
            if (ret !== '') {
              ret += ', '
            }
            ret += response
          })
          return ret
        case 'TextArea':
          return state.tableForm === 'markdown'
            ? body.response.replace(/\n/g, '<br>')
            : body.response
        default:
          return body.response
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

    const sort = (index: number) => {
      let query = ''
      if (state.sorted !== index) {
        query += '-'
        state.sorted = index
      } else {
        state.sorted = -index
      }
      switch (index) {
        case 1:
          query += 'traqid'
          break
        case 2:
          query += 'submitted_at'
          break
        default:
          query += index - 2
      }
      context.emit('get-results', '?sort=' + query)
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
    const isColumnActive = (index: number): boolean =>
      state.sorted === Math.abs(index + 1)
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
      tableFormTabs: ['view', 'markdown', 'csv'],
      isTextTable,
      copyTable,
      downloadTable,
      tableHeaders,
      isColumnActive,
      isColumnHidden,
      toggleShowColumn,
      sorted: '',
      sort,
      getTableRow,
      textTables
    }
  }
})
</script>
