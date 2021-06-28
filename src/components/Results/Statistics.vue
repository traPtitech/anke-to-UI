<template>
  <div>
    <Tab v-model="tableForm" :tabs="tableFormTabs" />
    <div>
      <!-- table view -->
      <div v-if="tableForm === 'view'">
        <view-tab
          v-if="tableForm === 'view'"
          :results="results"
          :questions="questions"
        />
      </div>

      <!-- markdown view -->
      <markdown-tab
        v-else-if="tableForm === 'markdown'"
        :value="markdownTable"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Tab from '/@/components/UI/Tab.vue'
import ViewTab from './Statistics/ViewTab.vue'
import MarkdownTab from './Statistics/MarkdownTab.vue'
import { TableFormTypes, tableFormTabs } from './use/utils'

export default defineComponent({
  name: 'Statistics',
  components: {
    Tab,
    ViewTab,
    MarkdownTab
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Array as PropType<ResponseResult[]>,
      default: []
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      default: []
    }
  },
  setup() {
    const markdownTable = computed(() => {
      // マークダウン生成
      return ''
    })

    const tableForm = ref<TableFormTypes>('view')

    return {
      tableForm,
      tableFormTabs,
      markdownTable
    }
  }
})
</script>
