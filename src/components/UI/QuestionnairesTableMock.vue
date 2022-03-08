<template>
  <ATable>
    <template #tableheader>
      <th
        v-for="(header, index) in HEADERS"
        :key="index"
        :class="$style.header"
      >
        {{ header }}
      </th>
    </template>
    <template #tablecontent>
      <table-row v-for="questionnaire of 20" :key="questionnaire">
        <questionnaires-table-row-mock :questionnaire="questionnaire" />
      </table-row>
    </template>
  </ATable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionnairesTableRowMock from './QuestionnairesTableRowMock.vue'
import ATable from '/@/components/UI/ATable.vue'
import TableRow from '/@/components/UI/TableRow.vue'

const HEADERS = ['', '回答期限', '更新日時', '作成日時', '結果']

export default defineComponent({
  name: 'LoadingForExplorerAndResponses',
  components: {
    ATable,
    QuestionnairesTableRowMock,
    TableRow
  },
  setup() {
    return {
      HEADERS
    }
  }
})
</script>

<style lang="scss" module>
.header {
  text-align: center;
  padding: 0.8rem;
}
</style>
