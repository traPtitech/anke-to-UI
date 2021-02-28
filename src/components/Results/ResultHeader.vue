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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '/@/components/UI/Icon.vue'
import { detailTabs } from './use/utils'

export default defineComponent({
  name: 'PageTemplate',
  components: {
    Icon
  },
  setup() {
    const route = useRoute()
    // link用のoption
    const getTabLink = (tab: string) => ({
      name: 'results',
      params: { id: route.params.id },
      query: {
        tab: tab
      }
    })

    return {
      detailTabs,
      getTabLink
    }
  }
})
</script>
