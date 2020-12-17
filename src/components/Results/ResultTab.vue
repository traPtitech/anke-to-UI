<template>
  <div class="tabs is-centered">
    <router-link id="return-button" to="/results/200">
      <Icon name="arrow-left" />
    </router-link>
    <ul>
      <li
        v-for="(tab, index) in detailTabs"
        :key="index"
        class="tab"
        :class="{ 'is-active': selectedTab === tab }"
      >
        <router-link :to="index + ''">{{ tab }}</router-link>
      </li>
    </ul>
  </div>
  <!-- <information-summary :information="summaryProps"></information-summary> -->
  <component
    :is="currentTabComponent"
    class="details-child is-fullheight"
    :name="currentTabComponent"
  ></component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Routes from '/@/components/Routes.vue'
import Individual from '/@/components/Results/Individual.vue'
import Statistics from '/@/components/Results/Statistics.vue'
import Spreadsheet from '/@/components/Results/Spreadsheet.vue'
import Icon from '/@/components/UI/Icon.vue'
import { detailTabs, selectedTab } from '/@/components/Results/use/utils'

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
          return selectedTab.toLowerCase()
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
