<template>
  <Tab
    :tabs="detailTabs"
    :modelValue="currentTabComponent"
    @update:modelValue="changeTab"
  />
  <Questions v-if="currentTabComponent === 'questions'" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DetailTabTypes,
  detailTabs
} from '/@/components/QuestionnaireDetails/use/utils'
import Tab from '/@/components/UI/Tab.vue'
import Questions from '/@/components/QuestionnaireDetails/Questions.vue'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Questions,
    Tab
  },
  props: {},
  setup() {
    const route = useRoute()
    const router = useRouter();
    const selectedTab = ref<DetailTabTypes>('information')

    const getTabLink = (tab: string) => ({
      path: route.path,
      query: {
        tab
      }
    })

    onMounted(() => {
      selectedTab.value = <DetailTabTypes>route.query.tab || 'information'
    })

    const currentTabComponent = computed(() => {
      return detailTabs.includes(<DetailTabTypes>route.query.tab)
        ? route.query.tab
        : 'information'
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
        selectedTab.value = <DetailTabTypes>newQuery.tab
      }
    )

    return {
      detailTabs,
      getTabLink,
      currentTabComponent,
      changeTab
    }
  }
})
</script>
