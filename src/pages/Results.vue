<template>
  <div v-if="questionnaire">
    <ResultTab
      :questionnaire="questionnaire"
      :results="results"
      :questions="questions"
      :results-per-question="resultsPerQuestion"
    />
  </div>
  <div v-if="/* information.administrators && !canViewResults */ false">
    <p>結果を閲覧する権限がありません</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from './use/title'
import ResultTab from '/@/components/Results/ResultTab.vue'
import apis, {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails,
  getResultsPerQuestion
} from '/@/lib/apis'

import { ResultsPerQuestion } from '/@/lib/util/statistics'

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
    const resultsPerQuestion = ref<ResultsPerQuestion | null>(null)

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      if (isNaN(questionnaireId)) return
      const [qres, rres, qsres] = await Promise.all([
        apis.getQuestionnaire(questionnaireId, ''),
        apis.getResults(questionnaireId),
        apis.getQuestions(questionnaireId, '')
      ])
      questionnaire.value = qres.data
      results.value = rres.data
      questions.value = qsres.data
      resultsPerQuestion.value = await getResultsPerQuestion(questionnaireId)

      useTitle(ref(`${questionnaire.value?.title}`))
    })

    return {
      questionnaire,
      results,
      questions,
      hasResponded,
      resultsPerQuestion
    }
  }
})
</script>
