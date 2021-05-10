<template>
  <tr
    v-for="(responseSummary, index) in responseSummaries"
    :key="index"
    :class="$style.body"
  >
    <responses-table-row :response-summary="responseSummary" />
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ResponsesTableRow from './ResponsesTableRow.vue'
import { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'ResponsesTable',
  components: {
    ResponsesTableRow
  },
  props: {
    responseSummaries: {
      type: Array as PropType<ResponseSummary[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.body {
  font-size: 1.4rem;
  border-bottom: solid 1.5px #d9d9d9;
  &:nth-child(even) {
    background-color: #fafafa;
  }
}
</style>
