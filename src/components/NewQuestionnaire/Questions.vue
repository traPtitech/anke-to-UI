<template>
  <QuestionTitle :title="'タイトル'" />
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="i">
      <TextForm
        v-if="
          question.question_type === QuestionType.Text ||
          question.question_type === QuestionType.Number ||
          question.question_type === QuestionType.TextArea
        "
        :index="i"
        :question-data="question"
        @update="updateQuestion"
      />
      <ChoiceForm
        v-if="
          question.question_type === QuestionType.Checkbox ||
          question.question_type === QuestionType.MultipleChoice
        "
        :index="i"
        :question-data="question"
        :is-radio="question.question_type === QuestionType.MultipleChoice"
        @update="updateQuestion"
      />
      <LinearScaleForm
        v-if="question.question_type === QuestionType.LinearScale"
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
import { QuestionType } from '/@/lib/apis'
import QuestionTitle from './QuestionTitle.vue'
import AddButtons from './AddButtons.vue'
import { createNewQuestion, QuestionData } from './use/utils'
import TextForm from './Forms/TextForm.vue'
import ChoiceForm from './Forms/ChoiceForm.vue'
import LinearScaleForm from './Forms/LinearScaleForm.vue'

export default defineComponent({
  name: 'Questions',
  components: {
    QuestionTitle,
    TextForm,
    ChoiceForm,
    LinearScaleForm,
    AddButtons
  },
  setup() {
    const questions = ref<QuestionData[]>([])

    const addQuestion = (type: string) => {
      const question = createNewQuestion(type)
      if (question) questions.value.push(question)
    }

    const updateQuestion = (newData: QuestionData, index: number) => {
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
