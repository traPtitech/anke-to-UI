<template>
  <table :class="$style.table">
    <tr :class="$style.title">
      自分の回答
    </tr>
    <tr>
      <th v-for="(header, index) in headers" :key="index" :class="$style.header">
        {{ header }}
      </th>
    </tr>
    <responses-table />
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ResponsesTable from '/@/components/Responses/ResponsesTable.vue'

export default defineComponent({
  name: 'List',
  components: {
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
  margin: 1em 0;
  border: solid 1.5px #ffffff;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
.header {
  padding: 0.4em 0em;
}
.title {
  text-align: left;
  font-size: 15pt;
  margin: 8px 0;
}
</style>
