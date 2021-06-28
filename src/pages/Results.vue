<template>
  <div v-if="questionnaire">
    <ResultTab
      :questionnaire="questionnaire"
      :results="results"
      :questions="questions"
    />
  </div>
  <div v-if="/* information.administrators && !canViewResults */ false">
    <p>結果を閲覧する権限がありません</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ResultTab from '/@/components/Results/ResultTab.vue'
import apis, {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails
} from '/@/lib/apis'

export default defineComponent({
  name: 'Results',
  components: {
    ResultTab
  },
  setup() {
    const route = useRoute()
    const questionnaire = ref<QuestionnaireByID | null>(null)
    const results = ref<ResponseResult[]>([])
    const questions = ref<QuestionDetails[]>([])
    const hasResponded = ref<boolean>(false)

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      if (isNaN(questionnaireId)) return
      const [qres, rres, qsres] = await Promise.all([
        apis.getQuestionnaire(questionnaireId, ''),
        apis.getResults(questionnaireId, ''),
        apis.getQuestions(questionnaireId, '')
      ])

      questionnaire.value = qres.data
      results.value = rres.data
      questions.value = qsres.data
    })

    return {
      questionnaire,
      results,
      questions,
      hasResponded
    }
  }
})
</script>
