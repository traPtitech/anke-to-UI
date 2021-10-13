<template>
  <QuestionForm
    :name="questionData.name"
    :is-required="questionData.required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <QuestionInput model-value="" />
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionInput from '../../UI/QuestionInput.vue'
import QuestionForm from './QuestionForm.vue'
import { TextQuestion } from '../use/utils'

export default defineComponent({
  name: 'TextForm',
  components: {
    QuestionForm,
    QuestionInput
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    questionData: {
      type: Object as PropType<TextQuestion>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: TextQuestion, index: number) => true
  },
  setup(props, context) {
    const updateQuestionName = (name: string) => {
      const newData = { ...props.questionData, name }
      context.emit('update', newData, props.index)
    }
    const updateQuestionRequired = (required: boolean) => {
      const newData = { ...props.questionData, required }
      context.emit('update', newData, props.index)
    }

    return {
      updateQuestionName,
      updateQuestionRequired
    }
  }
})
</script>
