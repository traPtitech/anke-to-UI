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
      v-for="questionnaire in questionnaires"
      :key="questionnaire.questionnaireID"
      :questionnaire="questionnaire"
    />
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionnairesTableRow from '/@/components/Explorer/QuestionnairesTableRow.vue'
import { Questionnaire } from '/@/lib/apis'

const HEADERS = ['', '回答期限', '更新日時', '作成日時', '結果']

export default defineComponent({
  name: 'QuestionnairesTable',
  components: {
    QuestionnairesTableRow
  },
  props: {
    questionnaires: {
      type: Object as PropType<Questionnaire>,
      required: true
    }
  },
  setup() {
    return { HEADERS }
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
