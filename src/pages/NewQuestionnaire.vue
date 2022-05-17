<template>
  <Tab v-model="selectedTab" :tabs="detailTabs" />
  <Questions v-if="selectedTab === NewQuestionsTabName" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NewInformationTabName,
  NewQuestionsTabName,
  NewQuestionnaireTabTypes,
  detailTabs
} from '/@/components/NewQuestionnaire/use/utils'
import Tab from '/@/components/UI/Tab.vue'
import Questions from '/@/components/NewQuestionnaire/Questions.vue'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Questions,
    Tab
  },
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const selectedTab = ref<NewQuestionnaireTabTypes>(NewInformationTabName)

    const getTabLink = (tab: string) => ({
      path: route.path,
      query: {
        tab
      }
    })

    onMounted(() => {
      selectedTab.value =
        <NewQuestionnaireTabTypes>route.query.tab || NewInformationTabName
    })

    const changeTab = (tab: string) => {
      router.push({
        path: '/questionnaires/new',
        query: {
          tab
        }
      })
    }

    watch(
      () => route.query,
      newQuery => {
        selectedTab.value = detailTabs.includes(
          <NewQuestionnaireTabTypes>newQuery.tab
        )
          ? <NewQuestionnaireTabTypes>newQuery.tab
          : NewInformationTabName
      }
    )

    return {
      NewInformationTabName,
      NewQuestionsTabName,
      detailTabs,
      getTabLink,
      selectedTab,
      changeTab
    }
  }
})
</script>
