<template>
  <question-card-base :title="title" :is-required="isRequired">
    <div v-if="questionType === QuestionType.Number">
      <InputNumber
        :placeholder="0"
        :model-value="modelValue"
        @update:model-value="update"
      />
    </div>
    <div v-else>
      <InputText
        :placeholder="'回答を入力'"
        :model-value="modelValue"
        @update:model-value="update"
      />
    </div>
  </question-card-base>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionType } from '/@/lib/apis'
import QuestionCardBase from '/@/components/UI/QuestionCardBase.vue'
import InputText from '/@/components/UI/InputText.vue'
import InputNumber from '/@/components/UI/InputNumber.vue'

export default defineComponent({
  name: 'InputQuestionCard',
  components: {
    QuestionCardBase,
    InputText,
    InputNumber
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
    questionType: {
      type: String as PropType<QuestionType>,
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
    const update = (value: string) => {
      context.emit('update', value)
    }
    return { QuestionType, update }
  }
})
</script>

<style lang="scss" module></style>
