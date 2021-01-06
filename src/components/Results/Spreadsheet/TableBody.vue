<template>
  <tbody>
    <tr v-for="(row, j) in results" :key="j">
      <td v-for="(item, k) in getTableRow(j)" :key="k">
        {{ item }}
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { results } from '../use/dummyData'
import { getTableRow } from '../use/utils'

export default defineComponent({
  name: 'TableHeader',
  setup() {
    return {
      getTableRow,
      results
    }
  }
})
</script>
