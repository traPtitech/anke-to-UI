<template>
  <PageTemplate>
    <template #header>
      <ResultHeader />
    </template>
    <template #content>
      <div>
        <Tab />
        <div>
          <!-- table view -->
          <div v-if="tableForm === 'view'">
            <Data />
          </div>

          <!-- markdown view -->
          <textarea
            v-if="tableForm === 'markdown'"
            :value="markdownTable"
            :rows="markdownTable.split('\n').length + 3"
            readonly
          ></textarea>
        </div>
      </div>
    </template>
  </PageTemplate>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTemplate from './PageTemplate.vue'
import ResultHeader from './ResultHeader.vue'
import Tab from './Statistics/Tab.vue'
import Data from './Statistics/Data.vue'
import { tableForm } from './use/utils'
import { markdownTable } from './use/dummyData'

export default defineComponent({
  name: 'Statistics',
  components: {
    PageTemplate,
    ResultHeader,
    Tab,
    Data
  },
  setup() {
    return {
      tableForm,
      markdownTable
    }
  }
})
</script>
