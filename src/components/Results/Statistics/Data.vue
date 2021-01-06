<template>
  <div v-for="question in countedData" :key="question.title">
    <header>
      <p>{{ question.title }}</p>
    </header>
    <div>
      <div>
        <div v-if="isNumberType(question.type)">
          <ul>
            <li>平均値: {{ question.total.average }}</li>
            <li>標準偏差: {{ question.total.standardDeviation }}</li>
            <li>中央値: {{ question.total.median }}</li>
            <li>最頻値: {{ question.total.mode }}</li>
          </ul>
        </div>
        <div>
          <Responces :question="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Responces from '/@/components/Results/Statistics/Responces.vue'
import { countedData } from '/@/components/Results/use/dummyData'

export default defineComponent({
  name: 'Data',
  components: {
    Responces
  },
  setup() {
    return {
      countedData
    }
  }
})
</script>
