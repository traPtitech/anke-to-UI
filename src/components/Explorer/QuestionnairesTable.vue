<template>
  <table :class="$style.table">
    <tr>
      <th
        v-for="(header, index) in headers"
        :key="index"
        :class="$style.header"
      >
        {{ header }}
      </th>
    </tr>
    <questionnaires-table-row />
  </table>
</template>

<script lang="ts">
import QuestionnairesTableRow from '/@/components/Explorer/QuestionnairesTableRow.vue'

export default {
  name: 'QuestionnairesTable',
  components: {
    QuestionnairesTableRow
  },
  setup() {
    const headers = ['', '回答期限', '更新日時', '作成日時', '結果']

    return {
      headers
    }
  }
}
</script>

<style lang="scss" module>
.table {
  width: 100%;
  max-width: fit-content;
  margin: 1em 0;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
.header {
  padding: 0.4em 0;
}
</style>
