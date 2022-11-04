<template>
  <view-card-base :title="questionData.question.body" @copy="copy">
    <template #statistics>
      <div v-if="isNumberQuestion(questionData)" :class="$style.analysis">
        <span>平均値：{{ statistics?.average }}</span>
        <span>標準偏差：{{ statistics?.standardDeviation }}</span>
        <span>中央値：{{ statistics?.median }}</span>
        <span>最頻値：{{ statistics?.mode }}</span>
      </div>
      <Responces :question="questionData" />
    </template>
  </view-card-base>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import Responces from './Responses.vue'
import ViewCardBase from './ViewCardBase.vue'
import {
  AllTypeQuestionUnion,
  generateStats,
  isNumberQuestion
} from '../use/statistics'

export default defineComponent({
  name: 'ViewCard',
  components: {
    Responces,
    ViewCardBase
  },
  props: {
    questionData: {
      type: Object as PropType<AllTypeQuestionUnion>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    copy: () => true
  },
  setup(props, context) {
    const copy = () => {
      context.emit('copy')
    }
    const statistics = computed(() =>
      isNumberQuestion(props.questionData)
        ? generateStats(props.questionData)
        : null
    )
    return {
      statistics,
      isNumberQuestion,
      copy
    }
  }
})
</script>

<style lang="scss" module>
.analysis {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
}
</style>
