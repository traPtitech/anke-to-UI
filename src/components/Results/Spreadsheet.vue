<template>
  <div class="wrapper">
    <div class="card">
      <Tab
        :table-form-tabs="tableFormTabs"
        :table-form="tableForm"
        :is-text-table="isTextTable"
      />
      <ScrollView
        :table-form="tableForm"
        :table-headers="tableHeaders"
        :show-column="showColumn"
        :is-text-table="isTextTable"
        :text-tables="textTables"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watchEffect, toRefs } from 'vue'
import Tab from '/@/components/Results/Spreadsheet/Tab.vue'
import ScrollView from '/@/components/Results/Spreadsheet/ScrollView.vue'
import * as utils from '/@/components/Results/use/utils'
import * as dummyData from '/@/components/Results/use/dummyData'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    ScrollView
  },
  setup(props, context) {
    const state = reactive<{
      tableForm: string
      showColumn: boolean[]
      sorted: number | string
    }>({
      tableForm: 'view',
      showColumn: [],
      sorted: ''
    })

    const initializeShowColumn = (len: number): void => {
      if (state.showColumn.length < len) {
        state.showColumn = new Array(len).fill(true)
      }
    }

    const isColumnHidden = (index: number): boolean =>
      state.showColumn.length === tableWidth.value && !state.showColumn[index]

    const tableWidth = computed(
      (): number => utils.defaultColumns.length + dummyData.questions.length
    )

    const tableHeaders = computed((): string[] =>
      utils.defaultColumns
        .map(column => column.label)
        .concat(dummyData.questions)
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
      tableFormTabs: utils.tableFormTabs,
      isTextTable,
      tableHeaders,
      isColumnHidden,
      textTables
    }
  }
})
</script>
