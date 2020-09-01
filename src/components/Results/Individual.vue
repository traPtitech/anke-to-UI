<template>
  <div class="has-navbar-fixed-bottom">
    <questions :questions-props="questionData"></questions>
    <pagination
      :range="range"
      :current-page="currentPage.value"
      :default-page-link="defaultPageLink.value"
    ></pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Questions from '@/components/Questions/Questions'
import Pagination from '@/components/Utils/Pagination'

type ResponseBodyData = {
  option_response: any[]
  questionID: number
  question_type: string
  response: string
}

type ResultData = {
  modifiedAt: string
  responseId: number
  responseBody: ResponseBodyData[]
  submittedAt: string
  traqId: string
}
type ResponseData = {
  modifiedAt: string
  responseId: number
  responseBody: ResponseBodyData[]
  submittedAt: string
  traqId: string
  body: { [key: string]: ResponseBodyData }
}

type QuestionData = {
  questionId: number
  type: string
  component: string
  questionBody: string
  isRequired: boolean
  pageNum: number
  responseBody: string
}

type Information = {
  administrators: string[]
  created_at: string
  description: string
  modified_at: string
  questionnaireID: number
  res_shared_to: string
  res_time_limit: string
  respondents: string[]
  targets: string[]
  title: string
}

type Props = {
  results: ResultData[]
  responseData: ResponseData
  questionData: QuestionData[]
  information: Information
}

type Context = {
  root: {
    $route: {
      query: {
        page: string
      }
      params: {
        id: string
      }
    }
  }
}

export default defineComponent({
  name: 'Individual',
  components: {
    questions: Questions,
    pagination: Pagination
  },
  setup(props: Props, context: Context) {
    const range = computed(() => ({
      first: 1,
      last: props.results.length
    }))
    const currentPage = computed(() =>
      context.root.$route.query.page
        ? Number(context.root.$route.query.page)
        : range.value.first
    )
    const defaultPageLink = computed(() => ({
      name: 'Results',
      params: { id: context.root.$route.params.id },
      query: { tab: 'individual' }
    }))
    return {
      questionData: props.questionData,
      currentPage,
      defaultPageLink
    }
  }
})
</script>
