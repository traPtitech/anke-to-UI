<template>
  <Card>
    <template #header>
      <QuestionnaireTitle :title="'タイトル'" />
    </template>
  </Card>
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="i">
      <Card :header-visible="false">
        <template #content>
          <div :class="$style.question">
            <QuestionUpdown
              :class="$style.border"
              :up-disable="i === 0"
              :down-disable="i === questions.length - 1"
              @swap="index => swapQuestions(i, i + index)"
            />
            <QuestionContent
              :model-value="question"
              @update:question="question => updateQuestions(i, question)"
              @update:questiontype="type => updateQuestionType(i, type)"
              @delete="deleteQuestion(i)"
              @copy="copyQuestion(i)"
            />
          </div>
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
import QuestionUpdown from './Forms/QuestionUpdown.vue'
import QuestionContent from './QuestionContent.vue'

export default defineComponent({
  name: 'Questions',
  components: {
    QuestionnaireTitle,
    Card,
    QuestionUpdown,
    AddQuestionButtons,
    QuestionContent
  },
  setup() {
    const questions = ref<QuestionData[]>([])

    const addQuestion = (type: QuestionType) => {
      const question = createNewQuestion(type)
      questions.value.push(question)
    }
    const updateQuestions = (index: number, newData: QuestionData) => {
      questions.value[index] = newData
    }
    const updateQuestionType = (i: number, type: QuestionType) => {
      const question = createNewQuestion(type)
      questions.value.splice(i, 1, question)
    }
    const deleteQuestion = (index: number) => {
      questions.value.splice(index, 1)
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
      swapQuestions,
      copyQuestion
    }
  }
})
</script>

<style lang="scss" module>
.question {
  display: flex;
  flex-direction: row;
  padding: 16px;
}
.border {
  border-right: 2px solid $ui-primary;
  margin-right: 16px;
}
</style>
