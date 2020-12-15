<template>
  <div class="scroll-view">
    <!-- table view -->
    <table v-show="tableForm === 'view'" class="table is-striped">
      <TableHeader />
      <TableBody />
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
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import TableHeader from '/@/components/Results/Spreadsheet/TableHeader.vue'
import TableBody from '/@/components/Results/Spreadsheet/TableBody.vue'
import {
  tableForm,
  tableHeaders,
  showColumn,
  isTextTable,
  textTables
} from '/@/components/Results/use/dummyData'

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
