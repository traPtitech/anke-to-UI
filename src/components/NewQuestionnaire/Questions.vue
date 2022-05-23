<template>
  <Card>
    <template #header>
      <QuestionnaireTitle :title="'タイトル'" />
    </template>
  </Card>
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="question.key">
      <Card :header-visible="false">
        <template #content>
          <QuestionUpdown
            :index="i"
            :max="questions.length"
            @swap="swapQuestions"
          />
          <QuestionDispose :index="i" @delete="deleteQuestion" />
          <TextForm
            v-if="isTextForm(question)"
            :question-data="question"
            @update="
              question => {
                updateQuestions(i)(question)
              }
            "
          />
          <ChoiceForm
            v-if="isChoiceForm(question)"
            :question-data="question"
            :is-radio="question.question_type === QuestionType.MultipleChoice"
            @update="
              question => {
                updateQuestions(i)(question)
              }
            "
          />
          <LinearScaleForm
            v-if="isLinearScaleForm(question)"
            :question-data="question"
            @update="
              question => {
                updateQuestions(i)(question)
              }
            "
          />
        </template>
      </Card>
    </div>
    <AddQuestionButtons @add="addQuestion" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuestionType } from '/@/lib/apis'
import QuestionnaireTitle from './QuestionnaireTitle.vue'
import AddQuestionButtons from './AddQuestionButtons.vue'
import { createNewQuestion, QuestionData } from './use/utils'
import Card from '/@/components/UI/Card.vue'
import TextForm from './Forms/TextForm.vue'
import ChoiceForm from './Forms/ChoiceForm.vue'
import LinearScaleForm from './Forms/LinearScaleForm.vue'
import QuestionDispose from './Forms/QuestionDispose.vue'
import QuestionUpdown from './Forms/QuestionUpdown.vue'

export default defineComponent({
  name: 'Questions',
  components: {
    QuestionnaireTitle,
    Card,
    TextForm,
    ChoiceForm,
    LinearScaleForm,
    AddQuestionButtons,
    QuestionDispose,
    QuestionUpdown
  },
  setup() {
    const questions = ref<QuestionData[]>([])

    const addQuestion = (type: QuestionType) => {
      const question = createNewQuestion(type)
      questions.value.push(question)
    }
    const updateQuestions = (index: number) => (newData: QuestionData) => {
      questions.value[index] = newData
    }

    const isTextForm = (question: QuestionData) =>
      question.question_type === QuestionType.Text ||
      question.question_type === QuestionType.Number ||
      question.question_type === QuestionType.TextArea
    const isChoiceForm = (question: QuestionData) =>
      question.question_type === QuestionType.Checkbox ||
      question.question_type === QuestionType.MultipleChoice
    const isLinearScaleForm = (question: QuestionData) =>
      question.question_type === QuestionType.LinearScale

    const deleteQuestion = (index: number) => {
      questions.value.splice(index, 1)
    }

    const swapQuestions = (index1: number, index2: number) => {
      const tmp = questions.value[index1]
      questions.value[index1] = questions.value[index2]
      questions.value[index2] = tmp
    }
    return {
      QuestionType,
      questions,
      addQuestion,
      updateQuestions,
      deleteQuestion,
      isTextForm,
      isChoiceForm,
      isLinearScaleForm,
      swapQuestions
    }
  }
})
</script>
