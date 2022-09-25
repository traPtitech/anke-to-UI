<template>
  <ResultCard :title="countedData.title" @copy="copy">
    <template #statistics>
      <div v-if="isNumberType(countedData.type)" :class="$style.analysis">
        <span>平均値：{{ countedData.total?.average }}</span>
        <span>標準偏差：{{ countedData.total?.average }}</span>
        <span>中央値：{{ countedData.total?.standardDeviation }}</span>
        <span>最頻値：{{ countedData.total?.mode }}</span>
      </div>
      <Responces :question="countedData" />
    </template>
  </ResultCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Responces from './Responses.vue'
import ResultCard from './ViewCardBase.vue'
import { CountedData, isNumberType } from '../use/utils'

export default defineComponent({
  name: 'ViewCard',
  components: {
    Responces,
    ResultCard
  },
  props: {
    countedData: {
      type: Object as PropType<CountedData>,
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
    return {
      copy,
      isNumberType
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
