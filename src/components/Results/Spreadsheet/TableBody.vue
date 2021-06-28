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
import { defineComponent, PropType } from 'vue'
import { ResponseResult } from '/@/lib/apis'
import { getTableRow } from '../use/utils'

export default defineComponent({
  name: 'TableHeader',
  props: {
    results: {
      type: Array as PropType<ResponseResult[]>,
      default: []
    }
  },
  setup() {
    return {
      getTableRow
    }
  }
})
</script>
