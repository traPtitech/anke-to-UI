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
        :rows="markdownTable.split('\n').length + TEXTAREA_ADDITIONAL_LINE_NUM"
        class="textarea"
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
import {
  ResultsPerQuestion,
  modifiedCountData,
  CountedDataNumber,
  CountedDataNotNumber,
  //isNumberQuestion,
  isSelectTypeData_m,
  isCountedNumber
} from '/@/lib/util/statistics'
import {
  TableFormTypes,
  tableFormTabs,
  isNumberType,
  //isSelectTypeData,
  //countData,
  //CountedData,
  TEXTAREA_ADDITIONAL_LINE_NUM
} from './use/utils'

//export default class Data implements CountedData {}
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
    },
    resultsPerQuestion: {
      type: Object as PropType<ResultsPerQuestion>,
      required: true
    }
  },

  setup(props) {
    const countedData = computed(() => {
      if (props.questions.length <= 0 || props.results.length <= 0) {
        return null
      }
      //return countData(props.questions, props.results)
      return modifiedCountData(props.resultsPerQuestion)
    })
    const markdownTable = computed(() => {
      // マークダウン生成
      if (!countedData.value) return ''
      return countedData.value
        ?.map((question: CountedDataNumber | CountedDataNotNumber) => {
          let res = [`# ${question.title}`]
          if (isCountedNumber(question)) {
            const { total } = question
            res = res.concat([
              `**平均値**: ${total.average}`,
              `**標準偏差**: ${total.standardDeviation}`,
              `**中央値**: ${total.median}`,
              `**最頻値**: ${total.mode}`,
              ''
            ])
          }
          const { data } = question
          if (typeof data !== 'undefined') {
            if (isSelectTypeData_m(question)) {
              res = res.concat(
                [
                  '| 回答 | 回答数 | 選択率 | その回答をした人 |',
                  '| - | - | - | - |'
                ],
                data.map(
                  ([choice, ids]) =>
                    `| ${choice ? choice : ''} | ${ids.length} | ${(
                      (ids.length / question.length) *
                      100
                    ).toFixed(2)}% | ${ids.join(', ')} |`
                )
              )
            } else {
              res = res.concat(
                ['| 回答 | 回答数 | その回答をした人 |', '| - | - | - |'],
                data.map(([choice, ids]) => {
                  const c = choice ? choice : ''
                  return `| ${
                    isNumberType(question.type) ? c : c.replace(/\n/g, '<br>')
                  } | ${ids.length} | ${ids.join(', ')} |`
                })
              )
            }
          } else {
            res = res.concat([
              '| 回答 | 回答数 | 選択率 | その回答をした人 |',
              '| - | - | - | - |'
            ])
          }
          res.concat([''])
          return res.join('\n')
          //↓元々あったけどコメントアウトしないとエラーになっちゃったやつです
          //return res.concat([''])
        })
        .join('\n')
    })

    const tableForm = ref<TableFormTypes>('view')

    return {
      tableForm,
      tableFormTabs,
      markdownTable,
      TEXTAREA_ADDITIONAL_LINE_NUM
    }
  }
})
</script>
