<template>
  <div><Tab v-model="selectedTab" :tabs="detailTabsQuestionnaire" /></div>
  <div>
    <Informations
      v-if="currentTabComponent === InformationTabName"
      :questionnaire="questionnaire"
      :myresponses="myresponses"
    />
    <Questions
      v-if="currentTabComponent === QuestionsTabName"
      :questionnaire="questionnaire"
      :questioncontents="questioncontents"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import {
  QuestionDetails,
  QuestionnaireByID,
  ResponseSummary
} from '/@/lib/apis'
import Informations from './Informations.vue'
import Questions from './Questions/Questions.vue'
import Tab from '../UI/Tab.vue'
import {
  InformationTabName,
  QuestionsTabName,
  DetailTabTypesQuestionnaire,
  detailTabsQuestionnaire
} from './usequestonnaire'

export default defineComponent({
  name: 'QuestionnaireTab',
  components: {
    Informations,
    Questions,
    Tab
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
    const selectedTab = ref<DetailTabTypesQuestionnaire>(InformationTabName)

    const currentTabComponent = computed(() => {
      if (detailTabsQuestionnaire.includes(selectedTab.value))
        return selectedTab.value
      // eslint-disable-next-line no-console
      console.error('unespected selectedTab')
      return ''
    })
    return {
      InformationTabName,
      QuestionsTabName,
      selectedTab,
      currentTabComponent,
      detailTabsQuestionnaire
    }
  }
})
</script>
