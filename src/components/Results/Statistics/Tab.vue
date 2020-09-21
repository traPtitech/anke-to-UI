<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tab in tableFormTabs"
        :key="tab"
        class="tab"
        :class="{ 'is-active': tableForm === tab }"
      >
        <a @click="changeTab">{{ tab }}</a>
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

type Props = {
  tableForm: string
  tableFormTabs: string[]
  canDownload: boolean
}

export default defineComponent({
  name: 'Tab',
  components: {
    Icon
  },
  setup(props: Props, context) {
    const changeTab = (tab: string) => context.emit('change-tab', tab)
    const downloadTable = () => context.emit('download-table')
    return {
      changeTab,
      downloadTable
    }
  }
})
</script>
