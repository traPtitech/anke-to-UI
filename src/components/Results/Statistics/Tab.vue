<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tab in tableFormTabs"
        :key="tab"
        class="tab"
        :class="{ 'is-active': tableForm === tab }"
      >
        <a @click="() => changeTab(tab)">{{ tab }}</a>
      </li>
    </ul>
    <button v-if="canDownload" class="button download" @click="downloadTable">
      <Icon name="download" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { tableForm, tableFormTabs } from '/@/components/Results/use/utils'
import { canDownload } from '/@/components/Results/use/dummyData'

export default defineComponent({
  name: 'Tab',
  components: {
    Icon
  },
  setup() {
    const changeTab = (tab: string) => console.log(`change tab to: ${tab}`)
    const downloadTable = () => console.log('download-table')

    return {
      tableForm,
      tableFormTabs,
      canDownload,
      changeTab,
      downloadTable
    }
  }
})
</script>
