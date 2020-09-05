<template>
  <div class="has-navbar-fixed-bottom">
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
// import Questions from '/@/components/Questions/Questions.vue'
// import Pagination from '/@/components/Utils/Pagination.vue'

export default defineComponent({
  name: 'Individual',
  components: {
    // questions: Questions,
    // pagination: Pagination
  },
  prop: {
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
  setup(props, context) {
    const range = computed(() => {})
    const currentPage = computed(() =>{})
    const defaultPageLink = computed(() => {})
    return {
      currentPage,
      defaultPageLink
    }
  }
})
</script>
