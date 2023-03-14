<template>
  <div :class="$style.container">
    <div :class="$style.title">新規アンケートの作成</div>
    <div>{{ newQuestionnaire }}</div>
    <Tab v-model="selectedTab" :tabs="detailTabs" />
    <NewInformation
      v-if="selectedTab === NewInformationTabName"
      :key="reset"
      v-model:data="newQuestionnaire"
      @clear="clear"
    />
    <Questions
      v-if="selectedTab === NewQuestionsTabName"
      v-model="newQuestions"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NewInformationTabName,
  NewQuestionsTabName,
  NewQuestionnaireTabTypes,
  detailTabs,
  prenewQuestionnaire
} from '/@/components/NewQuestionnaire/use/utils'
import apis, { NewQuestionnaire } from '/@/lib/apis'
import { NewQuestionData } from '/@/components/NewQuestionnaire/use/utils'
import Tab from '/@/components/UI/Tab.vue'
import Questions from '/@/components/NewQuestionnaire/Questions.vue'
import NewInformation from '/@/components/NewInformation/NewInformationTab.vue'

export default defineComponent({
  name: 'NewQuestionnaire',
  components: {
    Questions,
    NewInformation,
    Tab
  },
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const selectedTab = ref<NewQuestionnaireTabTypes>(NewInformationTabName)
    const newQuestionnaire = ref<NewQuestionnaire>(prenewQuestionnaire())
    const newQuestions = ref<NewQuestionData[]>([])
    const reset = ref(0)
    const me = ref('')
    const clear = () => {
      newQuestionnaire.value = prenewQuestionnaire()
      newQuestions.value = []
      newQuestionnaire.value.administrators.push(me.value)
      reset.value++
    }

    const getTabLink = (tab: string) => ({
      path: route.path,
      query: {
        tab
      }
    })

    onMounted(async () => {
      selectedTab.value =
        <NewQuestionnaireTabTypes>route.query.tab || NewInformationTabName
      const user = await apis.getUsersMe()

      me.value = user.data.traqID
      newQuestionnaire.value.administrators.push(me.value)
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
      changeTab,
      newQuestionnaire,
      newQuestions,
      reset,
      clear
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 720px;
  margin-right: auto;
  margin-left: auto;
}
.title {
  @include size-head;
  @include weight-bold;
  text-align: left;
}
</style>
