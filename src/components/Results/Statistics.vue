<template>
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

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
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
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Object as PropType<ResponseResult[]>,
      required: true
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      required: true
    }
  },
  setup() {
    return {
      tableForm,
      markdownTable
    }
  }
})
</script>
