<template>
  <div :class="$style.questiondetail">
    <TextForm
      v-if="isTextForm"
      :question-data="question"
      :text-type="question.question_type"
      @update="updateQuestion"
    />
    <ChoiceForm
      v-if="isChoiceForm"
      :question-data="question"
      :is-radio="question.question_type === QuestionType.MultipleChoice"
      @update="updateQuestion"
    />
    <LinearScaleForm
      v-if="isLinearScaleForm"
      :question-data="question"
      @update="updateQuestion"
    />
    <div :class="$style.control">
      <QuestionTypeSelect
        :model-value="question.question_type"
        @update:type="updateQuestionType"
      />
      <div :class="$style.controlButton">
        <QuestionCopyButton @copy="copyQuestion" />
        <QuestionDeleteButton @delete="deleteQuestion" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { QuestionType } from '/@/lib/apis'
import { QuestionData } from './use/utils'
import TextForm from './Forms/TextForm.vue'
import ChoiceForm from './Forms/ChoiceForm.vue'
import LinearScaleForm from './Forms/LinearScaleForm.vue'
import QuestionDeleteButton from './Forms/QuestionDeleteButton.vue'
import QuestionCopyButton from './Forms/QuestionCopyButton.vue'
import QuestionTypeSelect from './Forms/QuestionTypeSelect.vue'

export default defineComponent({
  name: 'QuestionContent',
  components: {
    TextForm,
    ChoiceForm,
    LinearScaleForm,
    QuestionDeleteButton,
    QuestionCopyButton,
    QuestionTypeSelect
  },
  props: {
    modelValue: {
      type: Object as PropType<QuestionData>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:question': (question: QuestionData) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:questiontype': (type: QuestionType) => true,
    delete: () => true,
    copy: () => true
  },
  setup(props, context) {
    const question = computed(() => props.modelValue)

    const updateQuestion = (newData: QuestionData) => {
      context.emit('update:question', newData)
    }
    const updateQuestionType = (type: QuestionType) => {
      context.emit('update:questiontype', type)
    }
    const deleteQuestion = () => {
      context.emit('delete')
    }
    const copyQuestion = () => {
      context.emit('copy')
    }

    const isTextForm = computed(
      () =>
        props.modelValue.question_type === QuestionType.Text ||
        props.modelValue.question_type === QuestionType.Number ||
        props.modelValue.question_type === QuestionType.TextArea
    )
    const isChoiceForm = computed(
      () =>
        props.modelValue.question_type === QuestionType.Checkbox ||
        props.modelValue.question_type === QuestionType.MultipleChoice
    )
    const isLinearScaleForm = computed(
      () => props.modelValue.question_type === QuestionType.LinearScale
    )
    return {
      QuestionType,
      question,
      updateQuestion,
      updateQuestionType,
      isTextForm,
      isChoiceForm,
      isLinearScaleForm,
      deleteQuestion,
      copyQuestion
    }
  }
})
</script>

<style lang="scss" module>
.questiondetail {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
}
.control {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.controlButton {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 16px;
}
</style>
