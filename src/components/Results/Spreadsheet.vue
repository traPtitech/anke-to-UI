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
import Icon from '@/components/Icons/Icon'

type Props = {
  reuslts: any[]
  questions: any[]
}

type Context = {}

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Icon
  },
  setup(props: Props, context: Context) {
    const defaultColumns = [
      { name: 'traqId', label: 'traQID' },
      { name: 'submittedAt', label: '回答日時' }
    ]
    const downloadLabel = 'CSV形式でダウンロード'
    const showColumn = []
    const state = reactive({
      tableForm: 'view'
    })

    const initializeShowColumn = () => {}
    const getTableRow = () => {}
    const responseToString = () => {}
    const downloadTable = () => {}
    const sort = () => {}
    const arrayToMarkdown = () => {}
    const toggleShowColumn = () => {}
    const isColumnActive = () => {}
    const isColumnHidden = () => {}
    const copyTable = () => {}

    const tableWidth = computed(() => {})
    const questionnaireId = computed(() => {})
    const tableHeaders = computed(() => {})
    const textTables = computed(() => {})
    const markdownTable = computed(() => {})
    const csvTable = computed(() => {})
    const isTextTable = computed(() => {})

    watchEffect(() => {})

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
