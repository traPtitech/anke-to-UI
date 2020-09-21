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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Responces',
  setup() {
  }
})
</script>
