<template>
  <div>
    <router-link to="/results/200">
      <Icon name="arrow-left" />
    </router-link>
    <div>
      <div v-for="(tab, index) in detailTabs" :key="index">
        <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
      </div>
    </div>
  </div>
  <!-- <information-summary :information="summaryProps"></information-summary> -->
  <Individual v-if="currentTabComponent === 'individual'" />
  <Statistics v-if="currentTabComponent === 'statistics'" />
  <Spreadsheet v-if="currentTabComponent === 'spreadsheet'" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Individual from './Individual.vue'
import Statistics from './Statistics.vue'
import Spreadsheet from './Spreadsheet.vue'
import Icon from '/@/components/UI/Icon.vue'
import { detailTabs } from './use/utils'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Individual,
    Statistics,
    Spreadsheet,
    Icon
  },
  setup() {
    const selectedTab = ref('Statistics')
    const route = useRoute()

    selectedTab.value = <string>route.query.tab || 'statistics'

    const currentTabComponent = computed(() => {
      if (detailTabs.includes(selectedTab.value)) return selectedTab.value
      console.error('unexpected selectedTab')
      return ''
    })

    // link用のoption
    const getTabLink = (tab: string) => ({
      name: 'results',
      params: { id: route.params.id },
      query: {
        tab: tab
      }
    })

    watch(
      () => route.query,
      async newQuery => {
        selectedTab.value = <string>newQuery.tab
      }
    )
    return {
      selectedTab,
      currentTabComponent,
      getTabLink,
      detailTabs
    }
  }
})
</script>
