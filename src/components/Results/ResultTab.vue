<template>
  <PageTemplate>
    <template #header>
      <ResultHeader />
    </template>
    <div>
      {{ questionnaire.title }}
    </div>
    <template #content>
      <Individual
        v-if="currentTabComponent === 'individual'"
        :questionnaire="questionnaire"
        :results="results"
        :questions="questions"
      />
      <Statistics
        v-if="currentTabComponent === 'statistics'"
        :questionnaire="questionnaire"
        :results="results"
        :questions="questions"
      />
      <Spreadsheet
        v-if="currentTabComponent === 'spreadsheet'"
        :questionnaire="questionnaire"
        :results="results"
        :questions="questions"
      />
    </template>
  </PageTemplate>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType, onMounted } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import { useRoute } from 'vue-router'
import PageTemplate from './PageTemplate.vue'
import ResultHeader from './ResultHeader.vue'
import Individual from './Individual.vue'
import Statistics from './Statistics.vue'
import Spreadsheet from './Spreadsheet.vue'
import { detailTabs, DetailTabTypes } from './use/utils'

export default defineComponent({
  name: 'ResultTab',
  components: {
    PageTemplate,
    ResultHeader,
    Individual,
    Statistics,
    Spreadsheet
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Object as PropType<ResponseResult[]>,
      required: true
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      required: true
    }
  },
  setup() {
    const selectedTab = ref<DetailTabTypes>('statistics')
    const route = useRoute()

    onMounted(() => {
      selectedTab.value = <DetailTabTypes>route.query.tab || 'statistics'
    })

    const currentTabComponent = computed(() => {
      if (detailTabs.includes(selectedTab.value)) return selectedTab.value
      // eslint-disable-next-line no-console
      console.error('unexpected selectedTab')
      return ''
    })

    watch(
      () => route.query,
      newQuery => {
        selectedTab.value = <DetailTabTypes>newQuery.tab
      }
    )
    return {
      selectedTab,
      currentTabComponent
    }
  }
})
</script>
