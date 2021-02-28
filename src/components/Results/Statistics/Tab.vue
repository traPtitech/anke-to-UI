<template>
  <div>
    <ul>
      <li v-for="tab in tableFormTabs" :key="tab">
        <a @click="() => changeTab(tab)">{{ tab }}</a>
      </li>
    </ul>
    <button v-if="canDownload" @click="downloadTable">
      <Icon name="download" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { tableForm, tableFormTabs } from '../use/utils'
import { canDownload } from '../use/dummyData'

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
