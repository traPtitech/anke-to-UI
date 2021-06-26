<template>
  <tbody>
    <tr v-for="(row, j) in results" :key="j">
      <td v-for="(item, k) in getTableRow(results, j)" :key="k">
        {{ item }}
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getTableRow } from '../use/utils'

export default defineComponent({
  name: 'TableHeader',
  props: {
    results: {
      type: Object as PropType<ResponseResult[]>,
      required: true
    }
  },
  setup() {
    return {
      getTableRow
    }
  }
})
</script>
