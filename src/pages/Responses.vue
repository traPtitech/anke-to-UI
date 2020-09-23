<template>
  <table :class="$style.table">
    <tr :class="$style.title">
      自分の回答
    </tr>
    <tr>
      <th
        v-for="(header, index) in headers"
        :key="index"
        :class="$style.header"
      >
        {{ header }}
      </th>
    </tr>
    <Responses-table />
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Routes from '/@/components/Routes.vue'
import ResponsesTable from '/@/components/Responses/ResponsesTable.vue'

export default defineComponent({
  name: 'Responses',
  component: {
    Routes,
    ResponsesTable
  },
  setup() {
    const headers = [
      'anke-to_title',
      '回答期限',
      '回答日時',
      '更新日時',
      '回答'
    ]
    return {
      headers
    }
  }
})
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
.title {
  text-align: left;
  font-size: 15pt;
  margin: 8px 0;
}
</style>
