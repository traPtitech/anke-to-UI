<template>
  <div>
    <div v-if="canViewResults" class="details is-fullheight">
      <div class="tabs is-centered">
        <router-link id="return-button" :to="summaryProps.titleLink">
          <span class="ti-arrow-left"></span>
        </router-link>
        <ul>
          <li
            v-for="(tab, index) in detailTabs"
            :key="index"
            class="tab"
            :class="{ 'is-active': selectedTab === tab }"
          >
            <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
          </li>
        </ul>
      </div>
      <information-summary :information="summaryProps"></information-summary>
      <component
        :is="currentTabComponent"
        class="details-child is-fullheight"
        :name="currentTabComponent"
        :results="results"
        :information="information"
        :questions="questions"
        :question-data="questionData"
        :response-data="responseData"
        @get-results="getResults"
      ></component>
    </div>

    <div
      v-if="information.administrators && !canViewResults"
      class="message is-danger"
    >
      <p class="message-body error-message">結果を閲覧する権限がありません</p>
    </div>
  </div>
</template>

<script lang="ts">
import Routes from '/@/components/Routes.vue'
import Individual from '@/components/Results/Individual'
import Statistics from '@/components/Results/Statistics'
import Spreadsheet from '@/components/Results/Spreadsheet'
// import InformationSummary from '@/components/Information/InformationSummary'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'Result',
  components: {
    Routes
  },
  setup(props) {
    const state = reactive({
      information: {}
    })

    return {
      state
    }
  }
})
</script>
