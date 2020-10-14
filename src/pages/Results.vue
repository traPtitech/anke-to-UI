<template>
  <div>
    <div v-if="canViewResults" class="details is-fullheight">
      <ResultTab
        :questionnaire-id="questionnaireId"
        :query="query"
        :information="information"
        :response-data="responseData"
        :results="results"
        :questions="questions"
        :question-data="questionData"
        :detail-tabs="detailTabs"
        :get-results="getResults"
      />
    </div>
    <div
      v-if="information.administrators && !canViewResults"
      class="message is-danger"
    >
      <p class="message-body error-message">結果を閲覧する権限がありません</p>
    </div>
  </div>
</template>

<script lang="ts">
// import InformationSummary from '@/components/Information/InformationSummary'
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
// import common from '@/bin/common'
import { Questionnaire, Response, QuestionData, ResponseData } from '/@/lib/api'
import ResultTab from '/@/components/Results/ResultTab.vue'
import * as dummyData from '/@/components/Results/use/dummyData'

// TODO 型
type State = {
  information: Questionnaire
  hasResponded: boolean
  canViewResults: boolean
  results: Response[]
  questions: string[]
  questionData: QuestionData[]
  responseData: ResponseData
  detailTabs: string[]
}

export default defineComponent({
  name: 'Results',
  components: {
    ResultTab
  },
  setup() {
    const state = reactive<State>({
      information: {},
      hasResponded: false,
      canViewResults: false,
      results: [],
      questions: [],
      questionData: [],
      responseData: {},
      detailTabs: ['Statistics', 'Spreadsheet', 'Individual']
    })

    const route = useRoute()
    const questionnaireId = computed(() => <string>route.params.id || '')
    const query = computed(() => route.query.tab || '')

    // nanikashokikakansu(state, questionnaireId.value)
    dummy(state, questionnaireId.value, <string>query.value)

    const canViewResults = computed(() => {
      // return common.canViewResults(
      //   state.information,
      //   state.administrates,
      //   state.hasResponded
      // )
      return true
    })

    return {
      ...toRefs(state),
      questionnaireId,
      query,
      getResults,
      canViewResults
    }
  }
})

const getResults = (query: string): Response[] => {
  return dummyData.results
}

const dummy = (state: any, id: string, query: string) => {
  setTimeout(() => {
    dummyData._dummy(state, id, query)
  }, 0.2)
}
</script>
