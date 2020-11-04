<template>
  <table class="table is-striped">
    <thead>
      <td>回答</td>
      <td>回答数</td>
      <td v-if="isSelectType(question.type)">選択率</td>
      <td>その回答をした人</td>
    </thead>
    <tbody>
      <tr v-for="[choice, ids] of question.data" :key="choice">
        <td>{{ choice }}</td>
        <td>{{ ids.length }}</td>
        <td v-if="isSelectType(question.type)">
          {{ `${((ids.length / question.length) * 100).toFixed(2)}%` }}
        </td>
        <td>{{ ids.join(', ') }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CountedData } from '/@/src/components/Results/Statistics.vue'

export default defineComponent({
  name: 'Responces',
  props: {
    question: {
      type: Object as PropType<CountedData>,
      required: true
    }
  },
  setup() {
    const isSelectType = (type: string): boolean =>
      ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)
    const isNumberType = (type: string): boolean =>
      ['LinearScale', 'Number'].includes(type)
    return {
      isSelectType
    }
  }
})
</script>
