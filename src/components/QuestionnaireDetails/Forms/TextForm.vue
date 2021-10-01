<template>
  <QuestionForm
    :name="questionData.name"
    :required="questionData.required"
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

interface TextQuestion {
  name: string
  required: boolean
}

export default defineComponent({
  name: 'TextForm',
  components: {
    QuestionForm,
    QuestionInput
  },
  props: {
    questionData: {
      type: Object as PropType<TextQuestion>,
      required: true
    }
  },
  setup(props, context) {
    const updateQuestionName = (name: string) => {
      const newData = { ...props.questionData, name }
      context.emit('update', newData)
    }
    const updateQuestionRequired = (required: boolean) => {
      const newData = { ...props.questionData, required }
      context.emit('update', newData)
    }

    return {
      updateQuestionName,
      updateQuestionRequired
    }
  }
})
</script>
