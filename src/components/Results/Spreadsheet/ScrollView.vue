<template>
  <div class="scroll-view">
    <!-- table view -->
    <table v-show="tableForm === 'view'" class="table is-striped">
      <TableHeader
        :table-headers="tableHeaders"
        :show-column="showColumn"
        :toggle-show-column="toggleShowColumn"
        @get-results="getResults"
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
    <button v-if="isTextTable" class="button download" @click="downloadTable">
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { Response } from '/@/lib/api'
import Tab from '/@/components/Results/Spreadsheet/Tab.vue'
import TableHeader from '/@/components/Results/Spreadsheet/TableHeader.vue'
import TableBody from '/@/components/Results/Spreadsheet/TableBody.vue'

export default defineComponent({
  name: 'ScrollView',
  components: {
    Icon,
    Tab,
    TableHeader,
    TableBody
  },
  props: {
    tableForm: {
      type: String,
      required: true
    },
    tableHeaders: {
      type: Array as PropType<string[]>,
      required: true
    },
    showColumn: {
      type: Array as PropType<boolean[]>,
      required: true
    },
    toggleShowColumn: {
      type: Function,
      required: true
    },
    results: {
      type: Array as PropType<Response>,
      required: true
    },
    defaultColumns: {
      type: Array as PropType<string[]>,
      required: true
    },
    isTextTable: {
      type: Boolean,
      required: true
    },
    textTables: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup(props, context) {
    const getResults = (query: string) => context.emit('get-results', query)
    return {
      getResults
    }
  }
})
</script>
