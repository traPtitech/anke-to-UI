<template>
  <question-card-base :title="title" :is-required="isRequired">
    <LinearScale
      :range="range"
      :left-label="leftLabel"
      :right-label="rightLabel"
      :model-value="Number(modelValue)"
      @update:model-value="update"
    />
  </question-card-base>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QuestionType } from '/@/lib/apis'
import QuestionCardBase from '/@/components/UI/QuestionCardBase.vue'
import LinearScale from '/@/components/UI/LinearScale.vue'

export default defineComponent({
  name: 'LinearScaleQuestionCard',
  components: {
    QuestionCardBase,
    LinearScale
  },
  props: {
    title: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    leftLabel: {
      type: String,
      required: true
    },
    rightLabel: {
      type: String,
      required: true
    },
    scaleMin: {
      type: Number,
      required: true
    },
    scaleMax: {
      type: Number,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (value: string) => true
  },
  setup(props, context) {
    const range = (() => {
      const range = []
      for (let i = props.scaleMin; i < props.scaleMax + 1; i++) {
        range.push(i)
      }
      return range
    })()
    const update = (value: number) => {
      context.emit('update', String(value))
    }
    return { QuestionType, update, range }
  }
})
</script>

<style lang="scss" module></style>
