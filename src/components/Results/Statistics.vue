<template>
  <div class="wrapper">
    <div class="card">
      <Tab
        :table-form="tableForm"
        :table-form-tabs="tableFormTabs"
        :can-download="canDownload"
        @change-tab="changeTab"
        @download-table="downloadTable"
      />
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
import { defineComponent, reactive, computed, toRefs } from 'vue'
import { Responce, Question } from '/@/lib/apis'
import { useRoute } from 'vue-router'

type Props = {
  results: Responce[]
  questions: Question[]
}

type State = {
  tableForm: string
}

export type CountedData = {
  title: string
  type: string
  total: {
    average: number
    standardDeviation: number
    median: number
    mode: number
  }
  data: {
    choice: string | number
    ids: string
  }[]
}

const isSelectType = (type: string): boolean =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)
const isNumberType = (type: string): boolean =>
  ['LinearScale', 'Number'].includes(type)
const countData = (
  questions: Question[],
  results: Responce[]
): CountedData[] => {
  return []
}

export default defineComponent({
  name: 'Statistics',
  components: {},
  setup(props: Props, context) {
    const state = reactive<State>({
      tableForm: 'view'
    })

    const downloadTable = (): void => {
      if (!canDownload.value) return
      let form = {
        type: 'text/markdown',
        ext: '.md',
        data: markdownTable.value
      }
      const blob = new Blob([form.data], { type: form.type })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Result' + form.ext
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const route = useRoute()
    const questionnaireId = computed((): number => +route.params.id)
    const countedData = computed((): CountedData[] | null => {
      if (props.questions.length <= 0 || props.results.length <= 0) return null
      return countData(props.questions, props.results)
    })
    // TODO markdownのテーブル生成
    const markdownTable = computed((): string => '')
    const canDownload = computed((): boolean => state.tableForm === 'markdown')

    return {
      ...toRefs(state),
      tableFormTabs: ['view', 'markdown'],
      canDownload,
      downloadTable,
      countedData,
      markdownTable
    }
  }
})
</script>
