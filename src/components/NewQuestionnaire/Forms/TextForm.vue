<template>
  <QuestionForm
    :name="questionData.title"
    :is-required="questionData.isRequired"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionForm from './QuestionForm.vue'
import { NewTextQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'

export default defineComponent({
  name: 'TextForm',
  components: {
    QuestionForm
  },
  props: {
    questionData: {
      type: Object as PropType<NewTextQuestion>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: NewTextQuestion) => true
  },
  setup(props, context) {
    const updateNewTextQuestionData = updateQuestionData<NewTextQuestion>(
      props,
      context
    )
    const updateQuestionName = (name: string) => {
      updateNewTextQuestionData('title', name)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateNewTextQuestionData('isRequired', required)
    }

    return {
      updateQuestionName,
      updateQuestionRequired
    }
  }
})
</script>
