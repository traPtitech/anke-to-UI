<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
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
import { updateQuestionData } from '../use/computeData'

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
    const updateTextQuestionData = updateQuestionData<TextQuestion>(
      props,
      context
    )
    const updateQuestionName = (name: string) => {
      updateTextQuestionData('body', name)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateTextQuestionData('is_required', required)
    }

    return {
      updateQuestionName,
      updateQuestionRequired
    }
  }
})
</script>
