<template>
  <div>
    <div v-for="(tab, index) in detailTabs" :key="index">
      <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
    </div>
  </div>
  <Questions v-if="currentTabComponent === 'questions'" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DetailTabTypes, detailTabs } from './use/utils'
import Questions from './Questions.vue'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Questions
  },
  props: {},
  setup() {
    const route = useRoute()
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

    watch(
      () => route.query,
      newQuery => {
        selectedTab.value = <DetailTabTypes>newQuery.tab
      }
    )

    return {
      detailTabs,
      getTabLink,
      currentTabComponent
    }
  }
})
</script>
