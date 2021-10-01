<template>
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="i">
      <TextForm
        v-if="
          question.type === QuestionType.Text ||
          question.type === QuestionType.Number
        "
        :question-data="question"
        @update="updateQuestion(i)"
      />
      <TextForm
        v-if="question.type === QuestionType.Checkbox"
        :question-data="question"
        @update="updateQuestion(i)"
      />
      <TextForm
        v-if="question.type === QuestionType.MultipleChoice"
        :question-data="question"
        @update="updateQuestion(i)"
      />
      <TextForm
        v-if="question.type === QuestionType.TextArea"
        :question-data="question"
        @update="updateQuestion(i)"
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

export default defineComponent({
  name: 'Questions',
  components: {
    TextForm,
    AddButtons
  },
  setup() {
    const questions = ref<QuestionLite[]>([])

    const addQuestion = (type: string) => {
      console.log(`add question : ${type}`)
      const question = createNewQuestion(type)
      if (question) questions.value.push(question)
    }

    const updateQuestion = (index: number) => (newData: QuestionLite) => {
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
