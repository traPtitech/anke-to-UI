<template>
  <div class="wrapper">
    <div class="card">
      <Tab />
      <div class="scroll-view">
        <!-- table view -->
        <div v-show="tableForm === 'view'">
          <Data />
        </div>

        <!-- markdown view -->
        <textarea
          v-show="tableForm === 'markdown'"
          class="textarea"
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
import Tab from '/@/components/Results/Statistics/Tab.vue'
import Data from '/@/components/Results/Statistics/Data.vue'
import { tableForm } from '/@/components/Results/use/utils'
import { markdownTable } from '/@/components/Results/use/dummyData'

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
