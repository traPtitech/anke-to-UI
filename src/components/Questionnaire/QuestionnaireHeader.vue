<template>
  <Tab
    :tabs="detailTabsQuestionnaire"
    @update:modelValue="updateQuestionnaire"
    @click="$router.push(getTabLink(newmodelValue))"
  ></Tab>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { detailTabsQuestionnaire } from './usequestonnaire'
import Tab from '../UI/Tab.vue'

export default defineComponent({
  name: 'PageTemplateQuestionnaire',
  components: { Tab },
  setup() {
    const route = useRoute()
    const newmodelValue = ref('information')
    const updateQuestionnaire = (data: string) => (newmodelValue.value = data)
    const getTabLink = (newmodelValue: string) => ({
      name: 'questionnaires',
      params: { id: route.params.id },
      query: {
        tab: newmodelValue
      }
    })

    return {
      detailTabsQuestionnaire,
      newmodelValue,
      updateQuestionnaire,
      getTabLink
    }
  }
})
</script>
