<template>
  <Card>
    <template #header>
      <QuestionnaireTitle :title="'タイトル'" />
    </template>
  </Card>
  <div :class="$style.container">
    <div v-for="(question, i) in questions" :key="question.key">
      <Card :header-visible="false">
        <template #content>
          <div :class="$style.question">
            <QuestionUpdown
              :class="$style.border"
              :up-disable="i === 0"
              :down-disable="i === questions.length - 1"
              @up="swapQuestions(i, i - 1)"
              @down="swapQuestions(i, i + 1)"
            />
            <QuestionContent
              :model-value="question"
              @update:question="question => updateQuestions(i, question)"
              @update:questiontype="
                type => updateQuestionType(i, type, question)
              "
              @delete="deleteQuestion(i)"
              @copy="copyQuestion(i)"
              @focusout="deleteFocusout(i)"
            />
          </div>
        </template>
      </Card>
    </div>
    <AddQuestion @focusin="addQuestion(QuestionType.Text)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuestionType } from '/@/lib/apis'
import QuestionnaireTitle from './QuestionnaireTitle.vue'
import { createNewQuestion, NewQuestionData } from './use/utils'
import Card from '/@/components/UI/Card.vue'
import QuestionUpdown from './Forms/QuestionUpdown.vue'
import QuestionContent from './QuestionContent.vue'
import AddQuestion from './AddQuestion.vue'

export default defineComponent({
  name: 'Questions',
  components: {
    QuestionnaireTitle,
    Card,
    QuestionUpdown,
    QuestionContent,
    AddQuestion
  },
  setup() {
    const questions = ref<NewQuestionData[]>([])

    const addQuestion = (type: QuestionType) => {
      const question = createNewQuestion(type)
      questions.value.push(question)
    }
    const updateQuestions = (index: number, newData: NewQuestionData) => {
      questions.value[index] = newData
    }
    const updateQuestionType = (
      i: number,
      type: QuestionType,
      preQuestion: NewQuestionData
    ) => {
      const newQuestion = createNewQuestion(type)

      newQuestion.title = preQuestion.title
      newQuestion.isRequired = preQuestion.isRequired
      newQuestion.key = preQuestion.key
      if (
        (newQuestion.questionType === QuestionType.Checkbox ||
          newQuestion.questionType === QuestionType.MultipleChoice) &&
        (preQuestion.questionType === QuestionType.Checkbox ||
          preQuestion.questionType === QuestionType.MultipleChoice)
      ) {
        newQuestion.options = preQuestion.options
      }

      questions.value.splice(i, 1, newQuestion)
    }

    const deleteQuestion = (index: number) => {
      questions.value.splice(index, 1)
    }
    const deleteFocusout = (index: number) => {
      if (questions.value[index].title === '') {
        deleteQuestion(index)
      }
    }
    const copyQuestion = (index: number) => {
      questions.value.splice(index + 1, 0, questions.value[index])
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
      updateQuestionType,
      deleteQuestion,
      deleteFocusout,
      swapQuestions,
      copyQuestion
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.question {
  display: flex;
  flex-direction: row;
  padding: 16px;
}
.border {
  border-right: 1px solid $ui-secondary;
  padding-right: 8px;
  margin-right: 8px;
}
</style>
