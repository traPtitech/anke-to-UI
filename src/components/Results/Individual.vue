<template>
  <div class="has-navbar-fixed-bottom">
    <questions :questions-props="questionData"></questions>
    <pagination
      :range="range"
      :current-page="currentPage"
      :default-page-link="defaultPageLink"
    ></pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Questions from '@/components/Questions/Questions'
import Pagination from '@/components/Utils/Pagination'

type Props = {
  results: any[]
  responseData: any
  questionData: any[]
  information: any
}

type Context = {}

export default defineComponent({
  name: 'Individual',
  components: {
    questions: Questions,
    pagination: Pagination
  },
  setup(props: Props, context: Context) {
    const range = computed(() => {})
    const currentPage = computed(() =>{})
    const defaultPageLink = computed(() => {})
    return {
      questionData: props.questionData,
      currentPage,
      defaultPageLink
    }
  }
})
</script>
