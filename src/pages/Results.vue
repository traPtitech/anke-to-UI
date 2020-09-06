<template>
  <div>
    <div v-if="canViewResults" class="details is-fullheight">
      <div class="tabs is-centered">
        <router-link id="return-button" :to="summaryProps.titleLink">
          <span class="ti-arrow-left"></span>
        </router-link>
        <ul>
          <li
            v-for="(tab, index) in detailTabs"
            :key="index"
            class="tab"
            :class="{ 'is-active': selectedTab === tab }"
          >
            <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
          </li>
        </ul>
      </div>
      <!-- <information-summary :information="summaryProps"></information-summary> -->
      <component
        :is="currentTabComponent"
        class="details-child is-fullheight"
        :name="currentTabComponent"
        :results="results"
        :information="information"
        :questions="questions"
        :question-data="questionData"
        :response-data="responseData"
        @get-results="getResults"
      ></component>
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
// import {
//   getQuestionnaire,
//   getMyResponses,
//   getResults,
//   getQuestions
// } from '@/lib/api'
import Routes from '/@/components/Routes.vue'
import Individual from '/@/components/Results/Individual.vue'
import Statistics from '/@/components/Results/Statistics.vue'
import Spreadsheet from '/@/components/Results/Spreadsheet.vue'

// TODO 型
type State = {
  information: any
  hasResponded: boolean
  canViewResults: boolean
  results: any[]
  questions: any[]
  questionData: any[]
  responseData: any
}

export default defineComponent({
  name: 'Results',
  components: {
    Routes,
    individual: Individual,
    statistics: Statistics,
    spreadsheet: Spreadsheet
  },
  setup(props) {
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

    const questionnaireId = computed((): number => Number(route.params.id))
    const query = computed((): string => route.query.tab)

    // nanikashokikakansu(state, questionnaireId.value)
    dummy(state, questionnaireId.value, query.value)

    const selectedTab = computed(() => {
      if (!query.value) {
        return 'Statistics'
      }
      return query.value.replace(/^[a-z]/, (ch: string) => ch.toUpperCase())
    })

    const summaryProps = computed(() => {
      let ret = {
        title: state.information.title,
        // TODO questionnairesに書き換え
        titleLink: '/results/' + questionnaireId.value,
        responseDetails: {}
      }
      if (selectedTab.value === 'Individual') {
        ret.responseDetails = {
          timeLabel: '回答日時',
          time: state.responseData.submittedAt,
          respondent: state.responseData.traqId
        }
      }
      return ret
    })

    const canViewResults = computed(() => {
      // return common.canViewResults(
      //   state.information,
      //   state.administrates,
      //   state.hasResponded
      // )
      return true
    })

    const getTabLink = (tab: string) => {
      let ret = {
        name: 'results',
        params: { id: questionnaireId.value },
        query: {
          tab: ''
        }
      }
      if (['Individual', 'Statistics', 'Spreadsheet'].includes(tab)) {
        ret.query.tab = tab.toLowerCase()
      } else {
        ret.query.tab = 'statistics'
      }
      return ret
    }

    const currentTabComponent = computed(() => {
      switch (selectedTab.value) {
        case 'Statistics':
        case 'Spreadsheet':
        case 'Individual':
          return selectedTab.value.toLowerCase()
        default:
          console.error('unexpected selectedTab')
          return ''
      }
    })

    return {
      ...toRefs(state),
      summaryProps,
      detailTabs: ['Statistics', 'Spreadsheet', 'Individual'],
      selectedTab,
      getTabLink,
      currentTabComponent,
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
