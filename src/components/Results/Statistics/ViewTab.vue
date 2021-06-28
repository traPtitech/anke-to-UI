<template>
  <div v-for="question in countedData || []" :key="question.title">
    <header>
      <p>{{ question.title }}</p>
    </header>
    <div>
      <div>
        <div v-if="isNumberType(question.type)">
          <ul>
            <li>平均値: {{ question.total?.average }}</li>
            <li>標準偏差: {{ question.total?.standardDeviation }}</li>
            <li>中央値: {{ question.total?.median }}</li>
            <li>最頻値: {{ question.total?.mode }}</li>
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
import { computed, defineComponent, PropType } from 'vue'
import { ResponseResult, QuestionDetails } from '/@/lib/apis'
import Responces from './Responses.vue'
import { countData, isNumberType } from '../use/utils'

export default defineComponent({
  name: 'ViewTab',
  components: {
    Responces
  },
  props: {
    results: {
      type: Array as PropType<ResponseResult[]>,
      default: []
    },
    questions: {
      type: Array as PropType<QuestionDetails[]>,
      default: []
    }
  },
  setup(props) {
    const countedData = computed(() =>
      countData(props.questions, props.results)
    )
    return {
      countedData,
      isNumberType
    }
  }
})
</script>
