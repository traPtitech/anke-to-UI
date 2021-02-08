<template>
  <PageTemplate>
    <template #header>
      <ResultHeader />
    </template>
    <template #content>
      <div>
        <Tab />
        <ScrollView />
      </div>
    </template>
  </PageTemplate>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTemplate from './PageTemplate.vue'
import ResultHeader from './ResultHeader.vue'
import Tab from './Spreadsheet/Tab.vue'
import ScrollView from './Spreadsheet/ScrollView.vue'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    PageTemplate,
    ResultHeader,
    Tab,
    ScrollView
  }
})
</script>
