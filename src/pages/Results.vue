<template>
  <div v-if="resultsPerQuestion">
    <ResultTab :results-per-question="resultsPerQuestion" />
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
import { getResultsPerQuestion } from '/@/lib/apis'
import { ResultsPerQuestion } from '/@/components/Results/use/statistics'

export default defineComponent({
  name: 'Results',
  components: {
    ResultTab
  },
  setup() {
    const route = useRoute()
    const hasResponded = ref<boolean>(false)
    const resultsPerQuestion = ref<ResultsPerQuestion | null>(null)

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      if (isNaN(questionnaireId)) return
      resultsPerQuestion.value = await getResultsPerQuestion(questionnaireId)

      useTitle(ref(`${resultsPerQuestion.value.questionnaire?.title}`))
    })

    return {
      hasResponded,
      resultsPerQuestion
    }
  }
})
</script>
