<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <QuestionTextarea
        v-if="questionData.question_type === 'TextArea'"
        model-value=""
        :pointerevents="false"
      />
      <QuestionInput
        v-else
        :is-number="questionData.question_type === 'Number'"
        model-value=""
        :pointerevents="false"
      />
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionInput from '../../UI/QuestionInput.vue'
import QuestionTextarea from '/@/components/UI/QuestionTextarea.vue'
import QuestionForm from './QuestionForm.vue'
import { TextQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'

export default defineComponent({
  name: 'TextForm',
  components: {
    QuestionInput,
    QuestionTextarea,
    QuestionForm
  },
  props: {
    questionData: {
      type: Object as PropType<TextQuestion>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: TextQuestion) => true
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
