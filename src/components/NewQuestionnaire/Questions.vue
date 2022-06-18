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
              :index="i"
              :max="questions.length"
              @swap="swapQuestions"
            />
            <div :class="$style.border" />
            <div :class="$style.questiondetail">
              <TextForm
                v-if="isTextForm(question)"
                :question-data="question"
                @update="
                  question => {
                    updateQuestions(i, question)
                  }
                "
              />
              <ChoiceForm
                v-if="isChoiceForm(question)"
                :question-data="question"
                :is-radio="
                  question.question_type === QuestionType.MultipleChoice
                "
                @update="
                  question => {
                    updateQuestions(i, question)
                  }
                "
              />
              <LinearScaleForm
                v-if="isLinearScaleForm(question)"
                :question-data="question"
                @update="
                  question => {
                    updateQuestions(i, question)
                  }
                "
              />
              <div :class="$style.control">
                <QuestionTypeSelect
                  :model-value="question.question_type"
                  @update:type="
                    type => {
                      updateQuestionType(i, type)
                    }
                  "
                />
                <div :class="$style.button">
                  <QuestionCopy :index="i" @copy="copyQuestion" />
                  <QuestionDispose :index="i" @delete="deleteQuestion" />
                </div>
              </div>
            </div>
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
import TextForm from './Forms/TextForm.vue'
import ChoiceForm from './Forms/ChoiceForm.vue'
import LinearScaleForm from './Forms/LinearScaleForm.vue'
import QuestionDispose from './Forms/QuestionDispose.vue'
import QuestionUpdown from './Forms/QuestionUpdown.vue'
import QuestionCopy from './Forms/QuestionCopy.vue'
import QuestionTypeSelect from './Forms/QuestionTypeSelect.vue'

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
    QuestionUpdown,
    QuestionCopy,
    QuestionTypeSelect
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
      isTextForm,
      isChoiceForm,
      isLinearScaleForm,
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
  padding: 1rem;
}
.border {
  width: 1px;
  background-color: $ui-primary;
  margin-right: 4px;
}
.questiondetail {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
}
.control {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.button {
  margin-left: auto;
}
</style>
