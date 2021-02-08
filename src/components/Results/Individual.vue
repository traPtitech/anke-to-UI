<template>
  <PageTemplate>
    <template #header>
      <ResultHeader />
    </template>
    <template #content>
      <div class="has-navbar-fixed-bottom">
        <!-- TODO あとからどうにかする -->
        <!-- <questions :questions-props="questionData"></questions>
        <pagination
          :range="range"
          :current-page="currentPage"
          :default-page-link="defaultPageLink"
        ></pagination> -->
      </div>
    </template>
  </PageTemplate>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTemplate from './PageTemplate.vue'
import ResultHeader from './ResultHeader.vue'
// TODO あとからどうにかする
// import Questions from '/@/components/Questions/Questions.vue'
// import Pagination from '/@/components/Utils/Pagination.vue'

export default defineComponent({
  name: 'Individual',
  components: {
    PageTemplate,
    ResultHeader
    // questions: Questions,
    // pagination: Pagination
  }
})
</script>
