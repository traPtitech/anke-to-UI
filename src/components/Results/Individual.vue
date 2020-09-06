<template>
  <div class="has-navbar-fixed-bottom">
    <!-- TODO QuestionsとPagenationをどうにかする -->
    <!-- <questions :questions-props="questionData"></questions>
    <pagination
      :range="range"
      :current-page="currentPage"
      :default-page-link="defaultPageLink"
    ></pagination> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
// TODO QuestionsとPagenationをどうにかする
// import Questions from '/@/components/Questions/Questions.vue'
// import Pagination from '/@/components/Utils/Pagination.vue'

export default defineComponent({
  name: 'Individual',
  components: {
    // questions: Questions,
    // pagination: Pagination
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    responseData: {
      type: Object,
      required: true
    },
    questionData: {
      type: Array,
      required: true
    },
    information: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const range = computed(() => ({
      first: 1,
      last: props.results.length
    }))

    const route = useRoute()
    const currentPage = computed(() => {
      return route.query.page ? Number(route.query.page) : range.value.first
    })
    const defaultPageLink = computed(() => ({
      name: 'Results',
      params: { id: route.params.id },
      query: { tab: 'individual' }
    }))
    return {
      currentPage,
      defaultPageLink
    }
  }
})
</script>
