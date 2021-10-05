<template>
  <div>
    <div v-for="(tab, index) in detailTabsQuestionnaire" :key="index">
      <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
    </div>
  </div>
  <!-- <information-summary :information="summaryProps"></information-summary> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { detailTabsQuestionnaire } from './usequestonnaire'

export default defineComponent({
  name: 'PageTemplateQuestionnaire',
  setup() {
    const route = useRoute()
    // link用のoption
    const getTabLink = (tab: string) => ({
      name: 'questionnaires',
      params: { id: route.params.id },
      query: {
        tab: tab
      }
    })

    return {
      detailTabsQuestionnaire,
      getTabLink
    }
  }
})
</script>
