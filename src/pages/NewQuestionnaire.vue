<template>
  <div :class="$style.container">
    <div :class="$style.title">新規アンケートの作成</div>
    <Tab v-model="selectedTab" :tabs="detailTabs" />
    <Questions v-if="selectedTab === NewQuestionsTabName" />
  </div>
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
  name: 'NewQuestionnaire',
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

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.title {
  @include size-head;
  @include weight-bold;
  text-align: left;
}
</style>
