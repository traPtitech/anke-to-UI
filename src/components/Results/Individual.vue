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
  }
})
</script>
