<template>
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
import { detailTabs } from './use/utils'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Individual,
    Statistics,
    Spreadsheet
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

    watch(
      () => route.query,
      newQuery => {
        selectedTab.value = <string>newQuery.tab
      }
    )
    return {
      selectedTab,
      currentTabComponent
    }
  }
})
</script>
