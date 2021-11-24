<template>
  <Tab v-model="selectedTab" :tabs="tabs" :class="$style.tab" />
  <Information v-if="selectedTab === 'Information'" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Information from '/@/components/NewQuestionnaire/Information.vue'
import Tab from '/@/components/UI/Tab.vue'
import { useTitle } from './use/title'

export default defineComponent({
  name: 'NewQuestionnaire',
  components: {
    Information,
    Tab
  },
  setup() {
    useTitle(ref('新規アンケート作成'))

    const tabs = ['Information', 'Questions']
    const selectedTab = ref(tabs[0])

    return { tabs, selectedTab }
  }
})
</script>

<style lang="scss" module>
.tab {
  margin-bottom: 1rem;
}
</style>
