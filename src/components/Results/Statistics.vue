<template>
  <div>
    <div>
      <Tab />
      <div>
        <!-- table view -->
        <div v-show="tableForm === 'view'">
          <Data />
        </div>

        <!-- markdown view -->
        <textarea
          v-show="tableForm === 'markdown'"
          :value="markdownTable"
          :rows="markdownTable.split('\n').length + 3"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tab from './Statistics/Tab.vue'
import Data from './Statistics/Data.vue'
import { tableForm } from './use/utils'
import { markdownTable } from './use/dummyData'

export default defineComponent({
  name: 'Statistics',
  components: {
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
