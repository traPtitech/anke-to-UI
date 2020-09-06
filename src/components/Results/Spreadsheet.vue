<template>
  <div class="wrapper">
    <div class="card">
      <div class="tabs">
        <ul>
          <li
            v-for="tab in tableFormTabs"
            :key="tab"
            class="tab"
            :class="{ 'is-active': tableForm === tab }"
          >
            <a @click="tableForm = tab">{{ tab }}</a>
          </li>
        </ul>
        <button v-if="isTextTable" class="button copy" @click="copyTable">
          <span class="ti-clipboard"></span>
        </button>
        <button
          v-if="isTextTable"
          class="button download"
          @click="downloadTable"
        >
          <span class="ti-download"></span>
        </button>
      </div>
      <div class="scroll-view">
        <!-- table view -->
        <table v-show="tableForm === 'view'" class="table is-striped">
          <thead>
            <tr>
              <th
                v-for="(header, k) in tableHeaders"
                :key="k"
                :class="{
                  'active-header': isColumnActive(k),
                  hidden: isColumnHidden(k)
                }"
              >
                <span class="header-wrapper">
                  <span class="header-icon-left" @click="toggleShowColumn(k)">
                    <Icon
                      :name="isColumnHidden(k) ? 'eye-closed' : 'eye'"
                      color="var(--base-darkbrown)"
                      class="clickable"
                    ></Icon>
                  </span>
                  <span class="header-label">
                    {{ header }}
                  </span>
                  <span
                    class="header-icon-right clickable"
                    :class="sorted !== k + 1 ? 'ti-angle-up' : 'ti-angle-down'"
                    @click="sort(k + 1)"
                  ></span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, j) in results" :key="j">
              <td
                v-for="(item, k) in getTableRow(j)"
                :key="k"
                :class="{ hidden: isColumnHidden(k) }"
              >
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- markdown, csv view -->
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
import Icon from '/@/components/UI/Icon.vue'

type State = {
  tableForm: string
  showColumn: boolean[]
  sorted: string | number
}

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Icon
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    questions: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
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

    const responseToString = (body: any): string => {
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
