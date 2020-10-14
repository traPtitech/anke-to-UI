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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Tab',
  components: {},
  props: {
    tableForm: {
      type: String,
      required: true
    },
    tableFormTabs: {
      type: Array as PropType<string[]>,
      required: true
    },
    canDownload: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const changeTab = (tab: string) => context.emit('change-tab', tab)
    return {
      changeTab
    }
  }
})
</script>
