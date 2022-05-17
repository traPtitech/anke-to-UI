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
          <Questionupdown
            :index="i"
            :max="questions.length"
            @up="upQuestion"
            @down="downQuestion"
          />
          <Questiondispose :index="i" @delete="deleteQuestion" />
          <TextForm
            v-if="isTextForm(question)"
            :index="i"
            :question-data="question"
            @update="updateQuestions"
          />
          <ChoiceForm
            v-if="isChoiceForm(question)"
            :index="i"
            :question-data="question"
            :is-radio="question.question_type === QuestionType.MultipleChoice"
            @update="updateQuestions"
          />
          <LinearScaleForm
            v-if="isLinearScaleForm(question)"
            :index="i"
            :question-data="question"
            @update="updateQuestions"
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
import Questiondispose from './Forms/Questiondispose.vue'
import Questionupdown from './Forms/Questionupdown.vue'

export default defineComponent({
  name: 'Questions',
  components: {
    QuestionnaireTitle,
    Card,
    TextForm,
    ChoiceForm,
    LinearScaleForm,
    AddQuestionButtons,
    Questiondispose,
    Questionupdown
  },
  setup() {
    const questions = ref<QuestionData[]>([])

    const addQuestion = (type: QuestionType) => {
      const question = createNewQuestion(type)
      questions.value.push(question)
    }

    const updateQuestions = (newData: QuestionData, index: number) => {
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
    const upQuestion = (index: number) => {
      ;[questions.value[index], questions.value[index - 1]] = [
        questions.value[index - 1],
        questions.value[index]
      ]
    }
    const downQuestion = (index: number) => {
      ;[questions.value[index], questions.value[index + 1]] = [
        questions.value[index + 1],
        questions.value[index]
      ]
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
      upQuestion,
      downQuestion
    }
  }
})
</script>
