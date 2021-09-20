<template>
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="i">
      <QuestionCheckbox
        v-if="question.type === 'Checkbox'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
      <QuestionInput
        v-if="question.type === 'Text' || question.type === 'Number'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
      <QuestionRadio
        v-if="question.type === 'MultipleChoice'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
      <QuestionTextarea
        v-if="question.type === 'TextArea'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
    </div>
    <AddButtons @add-question="addQuestion" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuestionDetails, QuestionType } from '/@/lib/apis'
import QuestionCheckbox from '../UI/QuestionCheckbox.vue'
import QuestionInput from '../UI/QuestionInput.vue'
import QuestionRadio from '../UI/QuestionRadio.vue'
import QuestionTextarea from '../UI/QuestionTextarea.vue'
import AddButtons from './AddButtons.vue'
import { createNewQuestion, QuestionLite } from './use/utils'



export default defineComponent({
  name: 'Questions',
  components: {
    QuestionCheckbox,
    QuestionInput,
    QuestionRadio,
    QuestionTextarea,
    AddButtons
  },
  setup() {
    const questions = ref<QuestionLite[]>([])

    const addQuestion = (type: string) => {
      console.log(`add question : ${type}`)
      questions.value.push(createNewQuestion(type))
    }

    return {
      questions,
      addQuestion
    }
  }
})
</script>
