<template>
  <div>
    <div v-if="questions.length === 0">質問がありません</div>
    <div v-for="(question, i) in questions" :key="i">
      <QuestionCheckbox
        v-if="question.type === 'MultipleChoice'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
      <QuestionInput
        v-if="question.type === 'Text'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
      <QuestionRadio
        v-if="question.type === 'Checkbox'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
      <QuestionTextarea
        v-if="question.type === 'TextArea'"
        :contents="question.contents"
        :model-value="question.modelValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QuestionDetails, QuestionType } from '/@/lib/apis'
import QuestionCheckbox from '../UI/QuestionCheckbox.vue'
import QuestionInput from '../UI/QuestionInput.vue'
import QuestionRadio from '../UI/QuestionRadio.vue'
import QuestionTextarea from '../UI/QuestionTextarea.vue'

interface QuestionLite {
  type: QuestionType
  contents: string[]
  modelValue: string[]
}

export default defineComponent({
  name: 'Questions',
  components: {
    QuestionCheckbox,
    QuestionInput,
    QuestionRadio,
    QuestionTextarea
  },
  setup() {
    const questions = ref<QuestionLite[]>([])

    return {
      questions
    }
  }
})
</script>
