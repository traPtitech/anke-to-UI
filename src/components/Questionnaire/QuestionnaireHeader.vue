<template>
  <div>
    <div v-for="(tab, index) in detailTabsQuestionnaire" :key="index">
      <router-link :to="getTabLink(tab)">{{ tab }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { detailTabsQuestionnaire } from './usequestonnaire'
// import Tab from 'src/components/UI/Tab.vue'

export default defineComponent({
  name: 'PageTemplateQuestionnaire',
  components: {},
  setup() {
    const route = useRoute()
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
