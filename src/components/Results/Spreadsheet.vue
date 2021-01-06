<template>
  <div>
    <Tab />
    <ScrollView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tab from '/@/components/Results/Spreadsheet/Tab.vue'
import ScrollView from '/@/components/Results/Spreadsheet/ScrollView.vue'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    ScrollView
  }
})
</script>
