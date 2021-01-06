<template>
  <div>
    <router-link to="/results/200">
      <Icon name="arrow-left" />
    </router-link>
    <ul>
      <li v-for="(tab, index) in detailTabs" :key="index">
        <router-link :to="index + ''">{{ tab }}</router-link>
      </li>
    </ul>
  </div>
  <!-- <information-summary :information="summaryProps"></information-summary> -->
  <component :is="currentTabComponent" :name="currentTabComponent"></component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Routes from '/@/components/Routes.vue'
import Individual from './Individual.vue'
import Statistics from './Statistics.vue'
import Spreadsheet from './Spreadsheet.vue'
import Icon from '/@/components/UI/Icon.vue'
import { detailTabs, selectedTab } from './use/utils'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Routes,
    Individual,
    Statistics,
    Spreadsheet,
    Icon
  },
  setup() {
    const currentTabComponent = computed(() => {
      switch (selectedTab) {
        case 'Statistics':
        case 'Spreadsheet':
        case 'Individual':
          return selectedTab
        default:
          console.error('unexpected selectedTab')
          return ''
      }
    })
    return {
      selectedTab,
      currentTabComponent,
      detailTabs
    }
  }
})
</script>
