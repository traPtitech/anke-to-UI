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
import { defineComponent, PropType } from 'vue'
import { ResponseResult, QuestionDetails } from '/@/lib/apis'
import Responces from './Responces.vue'
import { countData, isNumberType } from '../use/utils'

export default defineComponent({
  name: 'Data',
  components: {
    Responces
  },
  props: {
    results: {
      type: Object as PropType<ResponseResult[]>,
      required: true
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      required: true
    }
  },
  setup(props) {
    return {
      countedData: countData(props.questions, props.results),
      isNumberType
    }
  }
})
</script>
