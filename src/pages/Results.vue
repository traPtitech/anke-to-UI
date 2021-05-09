<template>
  <div>
    <div v-if="true">
      <ResultTab
        :questionnaire="questionnaire"
        :results="results"
        :questions="questions"
      />
    </div>
    <div v-if="/* information.administrators && !canViewResults */ false">
      <p>結果を閲覧する権限がありません</p>
    </div>
  </div>
</template>

<script lang="ts">
// import InformationSummary from '@/components/Information/InformationSummary'
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
    const questionnaire = ref<QuestionnaireByID>()
    const results = ref<ResponseResult[]>([])
    const questions = ref<QuestionDetails[]>([])
    const hasResponded = ref<boolean>(false)

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      const { data: qdata } = await apis.getQuestionnaire(questionnaireId, '')
      const { data: rdata } = await apis.getResults(questionnaireId, '')
      const { data: qsdata } = await apis.getQuestions(questionnaireId, '')

      questionnaire.value = qdata
      results.value = rdata
      questions.value = qsdata
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
