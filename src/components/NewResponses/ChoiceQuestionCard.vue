<template>
  <question-card-base :title="title" :is-required="isRequired">
    <div v-if="questionType === QuestionType.Checkbox">
      <QuestionCheckbox
        :contents="options"
        :model-value="modelValue"
        @update:model-value="update"
      />
    </div>
    <div v-else>
      <QuestionRadio
        :contents="options"
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
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'
import QuestionRadio from '/@/components/UI/QuestionRadio.vue'

export default defineComponent({
  name: 'InputQuestionCard',
  components: {
    QuestionCardBase,
    QuestionCheckbox,
    QuestionRadio
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
    options: {
      type: Array as PropType<string[]>,
      required: true
    },
    modelValue: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (choice: string[]) => true
  },
  setup(props, context) {
    const update = (choice: string[]) => {
      context.emit('update', choice)
    }
    return { QuestionType, update }
  }
})
</script>

<style lang="scss" module></style>
