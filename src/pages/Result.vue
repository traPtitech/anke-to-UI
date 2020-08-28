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
      <information-summary :information="summaryProps"></information-summary>
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
import {
  defineComponent,
  reactive,
  computed,
  UnwrapNestedRefs,
  ComputedRef
} from 'vue'
import { useRouter } from 'vue-router'
import common from '@/bin/common'
import {
  getQuestionnaire,
  getMyResponses,
  getResults,
  getQuestions
} from '@/lib/api'
import Routes from '/@/components/Routes.vue'
import Individual from '@/components/Results/Individual'
import Statistics from '@/components/Results/Statistics'
import Spreadsheet from '@/components/Results/Spreadsheet'

export default defineComponent({
  name: 'Result',
  components: {
    Routes
  },
  setup(props, context) {
    const state: UnwrapNestedRefs<any> = reactive({
      information: {},
      hasResponded: false,
      canViewResults: false,
      results: [],
      questions: [],
      questionData: [],
      responseData: {}
    })

    const questionnaireId: ComputedRef<number> = computed(
      () => context.root.$route.path
    )
    const query: ComputedRef<string> = computed(
      () => context.root.$route.query.tab
    )
    // nanikashokikakansu(state, questionnaireId.value)
    dummy(state, questionnaireId.value, query.value)

    return {
      state,
      detailTabs: ['Statistics', 'Spreadsheet', 'Individual']
    }
  }
})

const dummy = (state: any, id: number, query: string) => {
  setTimeout(() => {
    _dummy(state, id, query)
  }, 0.2)
}

const _dummy = (state: any, id: number, query: string) => {
  state.information = {
    administrators: ['Fogrex'],
    created_at: new Date('1990-01-01T12:00:00+09:00'),
    description: 'テスト質問です。ダミー',
    modified_at: new Date('1990-01-01T12:00:00+09:00'),
    questionnaireID: 001,
    res_shared_to: 'public',
    res_time_limit: 'NULL',
    respondents: ['Fogrex', 'Ogrex', 'Xergof'],
    targets: [],
    title: 'テスト質問'
  }
  state.hasResponded = true
  state.canViewResults = false
  state.results = [
    {
      modifiedAt: '1990/01/01 12:00',
      responseId: 0001,
      responseBody: [
        {
          option_response: [],
          questionID: 0001,
          question_type: 'TextArea',
          response: 'これはテストですか？'
        },
        {
          option_response: [],
          questionID: 0002,
          question_type: 'TextArea',
          response: 'これはテストです'
        }
      ],
      submittedAt: '1990/01/01 12:00',
      traqId: 'Fogrex'
    },
    {
      modifiedAt: '1990/01/01 12:00',
      responseId: 0002,
      responseBody: [
        {
          option_response: [],
          questionID: 0001,
          question_type: 'TextArea',
          response: 'これはテストですか？'
        },
        {
          option_response: [],
          questionID: 0002,
          question_type: 'TextArea',
          response: 'これはテストです'
        }
      ],
      submittedAt: '1990/01/01 12:00',
      traqId: 'Ogrex'
    },
    {
      modifiedAt: '1990/01/01 12:00',
      responseId: 0003,
      responseBody: [
        {
          option_response: [],
          questionID: 0001,
          question_type: 'TextArea',
          response: 'これはテストですか？'
        },
        {
          option_response: [],
          questionID: 0002,
          question_type: 'TextArea',
          response: 'これはテストです'
        }
      ],
      submittedAt: '1990/01/01 12:00',
      traqId: 'Xergof'
    }
  ]
  state.questions = ['質問', '言いたいこと']
  state.questionData = [
    {
      questionId: 0001,
      type: 'TextArea',
      component: 'short-answer',
      questionBody: '質問',
      isRequired: true,
      pageNum: 1,
      responseBody: ''
    },
    {
      questionId: 0002,
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
