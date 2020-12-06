<template>
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
        <router-link :to="index">{{ tab }}</router-link>
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
import { defineComponent, computed, PropType } from 'vue'
import Routes from '/@/components/Routes.vue'
import Individual from '/@/components/Results/Individual.vue'
import Statistics from '/@/components/Results/Statistics.vue'
import Spreadsheet from '/@/components/Results/Spreadsheet.vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import * as dummyData from '/@/components/Results/use/dummyData'

export default defineComponent({
  name: 'ResultTab',
  components: {
    Routes,
    Individual,
    Statistics,
    Spreadsheet
  },
  setup(props) {
    const selectedTab = computed(() => {
      // if (!props.query) {
      //   return 'Statistics'
      // }
      // return props.query.replace(/^[a-z]/, (ch: string) => ch.toUpperCase())
      return 'Statistics'
    })

    // const summaryProps = computed(() => {
    //   let ret = {
    //     title: props.information.title,
    //     // TODO questionnairesに書き換え
    //     titleLink: '/results/' + props.questionnaireId,
    //     responseDetails: {}
    //   }
    //   // if (selectedTab.value === 'Individual') {
    //   //   ret.responseDetails = {
    //   //     timeLabel: '回答日時',
    //   //     time: props.responseData.submittedAt,
    //   //     respondent: props.responseData.traqId
    //   //   }
    //   // }
    //   return ret
    // })

    // const getTabLink = (tab: string) => {
    //   let ret = {
    //     name: 'results',
    //     params: { id: props.questionnaireId },
    //     query: {
    //       tab: ''
    //     }
    //   }
    //   if (['Individual', 'Statistics', 'Spreadsheet'].includes(tab)) {
    //     ret.query.tab = tab.toLowerCase()
    //   } else {
    //     ret.query.tab = 'statistics'
    //   }
    //   return ret
    // }

    const currentTabComponent = computed(() => {
      switch (selectedTab.value) {
        case 'Statistics':
        case 'Spreadsheet':
        case 'Individual':
          return selectedTab.value.toLowerCase()
        default:
          console.error('unexpected selectedTab')
          return ''
      }
    })
    return {
      selectedTab,
      currentTabComponent
    }
  }
})
</script>
