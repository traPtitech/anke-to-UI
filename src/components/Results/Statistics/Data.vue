<template>
  <div v-for="question in countedData" :key="question.title" class="card">
    <header class="card-header">
      <p class="card-header-title">{{ question.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div v-if="isNumberType(question.type)" class="content">
          <ul>
            <li>平均値: {{ question.total.average }}</li>
            <li>標準偏差: {{ question.total.standardDeviation }}</li>
            <li>中央値: {{ question.total.median }}</li>
            <li>最頻値: {{ question.total.mode }}</li>
          </ul>
        </div>
        <div class="table-container">
          <Responce :is-select-type="isSelectType" :question="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Question } from '/@/lib/apis'
import Responce from '/@/components/Results/Statistics/Responces.vue'
import { CountedData } from '/@/src/components/Results/Statistics.vue'

export default defineComponent({
  name: 'Data',
  components: {
    Responce
  },
  props: {
    countedData: {
      type: Array as PropType<CountedData>,
      required: true
    },
    isSelectType: {
      type: Function,
      required: true
    }
  },
  setup() {}
})
</script>
