<template>
  <Card>
    <template #header>自分の回答</template>
    <template #content>
      <div :class="$style.content">
        <table :class="$style.table">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="$style.header"
          >
            {{ header }}
          </th>
          <responses-table :response-summaries="responseSummaries" />
        </table>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ResponsesTable from '/@/components/Responses/ResponsesTable.vue'
import Card from '/@/components/UI/Card.vue'
import apis, { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'Responses',
  components: {
    Card,
    ResponsesTable
  },
  setup() {
    const headers = ['', '回答期限', '回答日時', '更新日時', '回答']
    const responseSummaries = ref<ResponseSummary[]>([])
    const getMyResponses = async () => {
      const { data } = await apis.getMyResponses()
      responseSummaries.value = data
    }
    onMounted(async () => {
      const { data } = await apis.getMyResponses()
      responseSummaries.value = data
    })
    return {
      headers,
      responseSummaries,
      getMyResponses
    }
  }
})
</script>

<style lang="scss" module>
.content {
  padding: 1rem;
  border: solid 1.5px #dfe0d7;
  border-collapse: collapse;
  overflow: auto;
}
.table {
  width: 100%;
  padding: 1rem;
  border-collapse: collapse;
}
.header {
  padding: 0.5rem 0rem;
  min-width: 8rem;
  border-bottom: solid 2px #dbdbdb;
}
</style>
