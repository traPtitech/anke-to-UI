<template>
  <div>
    <!-- table view -->
    <table v-show="tableForm === 'view'">
      <TableHeader />
      <TableBody />
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
      :rows="table.split('\n').length + 3"
      readonly
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import { tableHeaders, showColumn } from '../use/dummyData'
import { tableForm, isTextTable, textTables } from '../use/utils'

export default defineComponent({
  name: 'ScrollView',
  components: {
    Icon,
    TableHeader,
    TableBody
  },
  setup() {
    const copyTable = () => console.log('copy')
    const downloadTable = () => console.log('download')
    return {
      tableForm,
      copyTable,
      downloadTable,
      tableHeaders,
      showColumn,
      isTextTable,
      textTables
    }
  }
})
</script>
