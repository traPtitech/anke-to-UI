<template>
  <div>
    <div v-if="canViewResults" class="details is-fullheight">
      <ResultTab
        :questionnaire-id="questionnaireId"
        :query="query"
        :information="information"
        :response-data="responseData"
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
import { Questionnaire, Response } from '/@/lib/api'
import ResultTab from '/@/components/Results/ResultTab.vue'

// TODO 型
type State = {
  information: Questionnaire
  hasResponded: boolean
  canViewResults: boolean
  results: Response[]
  questions: string[]
  questionData: any[]
  responseData: any
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
      responseData: {}
    })

    const route = useRoute()

    const questionnaireId = computed(() => Number(route.params.id))
    const query = computed(() => route.query.tab)

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
      detailTabs: ['Statistics', 'Spreadsheet', 'Individual'],
      getResults,
      canViewResults
    }
  }
})

const getResults = (query: string) => {
  return [
    {
      modifiedAt: '1990/01/01 12:00',
      responseId: 1,
      responseBody: [
        {
          option_response: [],
          questionID: 1,
          question_type: 'TextArea',
          response: 'これはテストですか？'
        },
        {
          option_response: [],
          questionID: 2,
          question_type: 'TextArea',
          response: 'これはテストです'
        }
      ],
      submittedAt: '1990/01/01 12:00',
      traqId: 'Fogrex'
    },
    {
      modifiedAt: '1990/01/01 12:00',
      responseId: 2,
      responseBody: [
        {
          option_response: [],
          questionID: 1,
          question_type: 'TextArea',
          response: 'これはテストですか？'
        },
        {
          option_response: [],
          questionID: 2,
          question_type: 'TextArea',
          response: 'これはテストです'
        }
      ],
      submittedAt: '1990/01/01 12:00',
      traqId: 'Ogrex'
    },
    {
      modifiedAt: '1990/01/01 12:00',
      responseId: 3,
      responseBody: [
        {
          option_response: [],
          questionID: 1,
          question_type: 'TextArea',
          response: 'これはテストですか？'
        },
        {
          option_response: [],
          questionID: 2,
          question_type: 'TextArea',
          response: 'これはテストです'
        }
      ],
      submittedAt: '1990/01/01 12:00',
      traqId: 'Xergof'
    }
  ]
}

const dummy = (state: any, id: number, query: string) => {
  setTimeout(() => {
    _dummy(state, id, query)
  }, 0.2)
}

const _dummy = (state: any, id: number, query: string) => {
  state.information = {
    administrators: ['Fogrex'],
    created_at: '1990/01/01 12:00',
    description: 'テスト質問です。ダミー',
    modified_at: '1990/01/01 12:00',
    questionnaireID: 1,
    res_shared_to: 'public',
    res_time_limit: 'NULL',
    respondents: ['Fogrex', 'Ogrex', 'Xergof'],
    targets: [],
    title: 'テスト質問'
  }
  state.hasResponded = true
  state.canViewResults = false
  state.results = getResults(query)
  state.questions = ['質問', '言いたいこと']
  state.questionData = [
    {
      questionId: 1,
      type: 'TextArea',
      component: 'short-answer',
      questionBody: '質問',
      isRequired: true,
      pageNum: 1,
      responseBody: ''
    },
    {
      questionId: 2,
      type: 'TextArea',
      component: 'short-answer',
      questionBody: '言いたいこと',
      isRequired: true,
      pageNum: 1,
      responseBody: ''
    }
  ]
  state.responseData = state.results[0]
  let newBody: any = {}
  state.responseData.responseBody.forEach((data: any) => {
    newBody[data.questionID] = data
  })
  state.responseData.body = newBody
}
</script>
