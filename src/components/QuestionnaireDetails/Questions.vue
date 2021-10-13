<template>
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="i">
      <TextForm
        v-if="
          question.type === QuestionType.Text ||
          question.type === QuestionType.Number ||
          question.type === QuestionType.TextArea
        "
        :index="i"
        :question-data="question"
        @update="updateQuestion"
      />
      <ChoiceForm
        v-if="
          question.type === QuestionType.Checkbox ||
          question.type === QuestionType.MultipleChoice
        "
        :index="i"
        :question-data="question"
        :is-radio="question.type === QuestionType.MultipleChoice"
        @update="updateQuestion"
      />
      <TextForm
        v-if="question.type === QuestionType.MultipleChoice"
        :index="i"
        :question-data="question"
        @update="updateQuestion"
      />
      <TextForm
        v-if="question.type === QuestionType.TextArea"
        :index="i"
        :question-data="question"
        @update="updateQuestion"
      />
    </div>
    <AddButtons @add-question="addQuestion" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuestionDetails, QuestionType } from '/@/lib/apis'
import AddButtons from './AddButtons.vue'
import { createNewQuestion, QuestionLite } from './use/utils'
import TextForm from './Forms/TextForm.vue'
import ChoiceForm from './Forms/ChoiceForm.vue'

export default defineComponent({
  name: 'Questions',
  components: {
    TextForm,
    ChoiceForm,
    AddButtons
  },
  setup() {
    const questions = ref<QuestionLite[]>([])

    const addQuestion = (type: string) => {
      const question = createNewQuestion(type)
      if (question) questions.value.push(question)
    }

    const updateQuestion = (newData: QuestionLite, index: number) => {
      questions.value[index] = newData
    }

    return {
      QuestionType,
      questions,
      addQuestion,
      updateQuestion
    }
  }
})
</script>
