<template>
  <div class="scroll-view">
    <!-- table view -->
    <table v-show="tableForm === 'view'" class="table is-striped">
      <TableHeader :table-headers="tableHeaders" :show-column="showColumn" />
      <TableBody
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
import TableHeader from '/@/components/Results/Spreadsheet/TableHeader.vue'
import TableBody from '/@/components/Results/Spreadsheet/TableBody.vue'

export default defineComponent({
  name: 'ScrollView',
  components: {
    Icon,
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
    isTextTable: {
      type: Boolean,
      required: true
    },
    textTables: {
      type: Object as PropType<{
        markdown: string
        csv: string
      }>,
      required: true
    }
  }
})
</script>
