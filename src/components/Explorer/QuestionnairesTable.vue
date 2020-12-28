<template>
  <table :class="$style.table">
    <tr>
      <th
        v-for="(header, index) in HEADERS"
        :key="index"
        :class="$style.header"
      >
        {{ header }}
      </th>
    </tr>
    <questionnaires-table-row
      v-for="questionnaire in data.questionnaires"
      :key="questionnaire.questionnaireID"
      :questionnaire="questionnaire"
    />
  </table>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import QuestionnairesTableRow from '/@/components/Explorer/QuestionnairesTableRow.vue'

const HEADERS = ['', '回答期限', '更新日時', '作成日時', '結果']

export default defineComponent({
  name: 'QuestionnairesTable',
  components: {
    QuestionnairesTableRow
  },
  setup() {
    const data = reactive({
      questionnaires: [
        {
          questionnaireID: 1,
          title: 'こんにちは',
          res_time_limit: '2020-12-31',
          created_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        },
        {
          questionnaireID: 2,
          title: 'こんばんは',
          res_time_limit: '2020-12-31',
          created_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        }
      ]
    })

    return {
      data,
      HEADERS
    }
  }
})
</script>

<style lang="scss" module>
.table {
  width: 100%;
  max-width: fit-content;
  margin: 1rem 0;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
.header {
  padding: 0.4rem 0;
}
</style>
