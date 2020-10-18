<template>
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
      <responses-table />
    </table>
  </div>
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
    const headers = ['', '回答期限', '回答日時', '更新日時', '回答']
    return {
      headers
    }
  }
})
</script>

<style lang="scss" module>
.title {
  font-size: 14pt;
  text-align: left;
  padding: 0.8em;
  border: solid 1.5px #dfe0d7;
}
.content {
  padding: 1em;
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
  padding: 0.5em 0em;
  min-width: 8em;
  border-bottom: solid 2px #dbdbdb;
}
</style>
