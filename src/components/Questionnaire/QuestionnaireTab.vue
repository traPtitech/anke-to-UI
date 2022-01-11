<template>
  <div><PageTemplateQuestionnaire /></div>
  <div>
    <Informations
      v-if="currentTabComponent === 'information'"
      :questionnaire="questionnaire"
      :myresponses="myresponses"
    />
    <Questions
      v-if="currentTabComponent === 'questions'"
      :questionnaire="questionnaire"
      :questioncontents="questioncontents"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType, onMounted } from 'vue'
import {
  QuestionDetails,
  QuestionnaireByID,
  ResponseSummary
} from '/@/lib/apis'
import { useRoute } from 'vue-router'
import PageTemplateQuestionnaire from './QuestionnaireHeader.vue'
import Informations from './Informations.vue'
import Questions from './Questions/Questions.vue'
import {
  detailTabsQuestionnaire,
  DetailTabTypesQuestionnaire
} from './usequestonnaire'

export default defineComponent({
  name: 'QuestionnaireTab',
  components: {
    PageTemplateQuestionnaire,
    Informations,
    Questions
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    myresponses: {
      type: Array as PropType<ResponseSummary[]>,
      required: true
    },
    questioncontents: {
      type: Array as PropType<QuestionDetails[]>,
      required: true
    }
  },
  setup() {
    const selectedTab = ref<DetailTabTypesQuestionnaire>('information')
    const route = useRoute()

    onMounted(() => {
      selectedTab.value =
        <DetailTabTypesQuestionnaire>route.query.tab || 'information'
    })

    const currentTabComponent = computed(() => {
      if (detailTabsQuestionnaire.includes(selectedTab.value))
        return selectedTab.value
      // eslint-disable-next-line no-console
      console.error('unespected selectedTab')
      return ''
    })

    watch(
      () => route.query,
      newQuery => {
        selectedTab.value = <DetailTabTypesQuestionnaire>newQuery.tab
      }
    )
    return {
      selectedTab,
      currentTabComponent
    }
  }
})
</script>
