<template>
  <div>
    <Tab />
    <ScrollView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tab from './Spreadsheet/Tab.vue'
import ScrollView from './Spreadsheet/ScrollView.vue'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    ScrollView
  }
})
</script>
