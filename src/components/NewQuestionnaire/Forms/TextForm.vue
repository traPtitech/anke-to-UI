<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
  </QuestionForm>
  <InputText
    v-if="questionData.question_type === 'Number'"
    :is-number="true"
    :placeholder="'0'"
    :non-events="true"
  />
  <InputText
    v-else-if="questionData.question_type === 'Text'"
    :placeholder="'回答を入力'"
    :non-events="true"
  />
  <InputText
    v-else
    :is-number="false"
    :is-long="true"
    :placeholder="'回答を入力'"
    :non-events="true"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionForm from './QuestionForm.vue'
import InputText from '/@/components/UI/InputText.vue'
import { TextQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'

export default defineComponent({
  name: 'TextForm',
  components: {
    QuestionForm,
    InputText
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
