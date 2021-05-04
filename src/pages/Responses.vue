<template>
  <div :class="$style.card">
    <div :class="$style.title">自分の回答</div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ResponsesTable from '/@/components/Responses/ResponsesTable.vue'
import apis, { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'List',
  components: {
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
.card {
  /* width: fit-content; */
  margin: 1rem 1.5rem;
  overflow-x: auto;
  width: auto;
  max-width: fit-content;
  overflow-wrap: normal;
}
.title {
  font-size: 14pt;
  text-align: left;
  padding: 0.8rem;
  border: solid 1.5px #dfe0d7;
  letter-spacing: 0.05rem;
}
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
