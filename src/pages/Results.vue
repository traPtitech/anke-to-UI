<template>
  <div>
    <div v-if="canViewResults" class="details is-fullheight">
      <ResultTab
        :questionnaire-id="questionnaireId"
        :query="query"
        :information="information"
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
import {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails,
  QuestionnaireByIDResSharedToEnum
} from '/@/lib/apis'
import ResultTab from '/@/components/Results/ResultTab.vue'
import * as dummyData from '/@/components/Results/use/dummyData'

// TODO 型
type State = {
  information: QuestionnaireByID
  hasResponded: boolean
  canViewResults: boolean
  results: ResponseResult[]
  questions: string[]
  questionData: QuestionDetails[]
  detailTabs: string[]
}

export default defineComponent({
  name: 'Results',
  components: {
    ResultTab
  },
  setup() {
    const state = reactive<State>({
      information: {
        administrators: ['Fogrex'],
        created_at: '1990/01/01 12:00',
        description: 'テスト質問です。ダミー',
        modified_at: '1990/01/01 12:00',
        questionnaireID: 1,
        res_shared_to: QuestionnaireByIDResSharedToEnum.Public,
        res_time_limit: 'NULL',
        respondents: ['Fogrex', 'Ogrex', 'Xergof'],
        targets: [],
        title: 'テスト質問'
      },
      hasResponded: false,
      canViewResults: false,
      results: [],
      questions: [],
      questionData: [],
      detailTabs: ['Statistics', 'Spreadsheet', 'Individual']
    })

    const route = useRoute()
    const questionnaireId = computed(() => <string>route.params.id)
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
      detailTabs: ['Statistics', 'Spreadsheet', 'Individual'],
      getResults,
      canViewResults
    }
  }
})

const getResults = (query: string): ResponseResult[] => {
  return dummyData.results
}

const dummy = (state: any, id: string, query: string) => {
  setTimeout(() => {
    dummyData._dummy(state, id, query)
  }, 0.2)
}
</script>
