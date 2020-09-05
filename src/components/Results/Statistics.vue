<template>
  <div class="wrapper">
    <div class="card">
      <div class="tabs">
        <ul>
          <li
            v-for="tab in tableFormTabs"
            :key="tab"
            class="tab"
            :class="{ 'is-active': tableForm === tab }"
          >
            <a @click="tableForm = tab">{{ tab }}</a>
          </li>
        </ul>
        <button
          v-if="canDownload"
          class="button download"
          @click="downloadTable"
        >
          <span class="ti-download"></span>
        </button>
      </div>
      <div class="scroll-view">
        <!-- table view -->
        <div v-show="tableForm === 'view'">
          <div
            v-for="question in countedData"
            :key="question.title"
            class="card"
          >
            <header class="card-header">
              <p class="card-header-title">{{ question.title }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div v-if="isNumberType(question.type)" class="content">
                  <ul>
                    <li>平均値: {{ question.total.average }}</li>
                    <li>標準偏差: {{ question.total.standardDeviation }}</li>
                    <li>中央値: {{ question.total.median }}</li>
                    <li>最頻値: {{ question.total.mode }}</li>
                  </ul>
                </div>
                <div class="table-container">
                  <table class="table is-striped">
                    <thead>
                      <td>回答</td>
                      <td>回答数</td>
                      <td v-if="isSelectType(question.type)">
                        選択率
                      </td>
                      <td>その回答をした人</td>
                    </thead>
                    <tbody>
                      <tr v-for="[choice, ids] of question.data" :key="choice">
                        <td>{{ choice }}</td>
                        <td>{{ ids.length }}</td>
                        <td v-if="isSelectType(question.type)">
                          {{
                            `${((ids.length / question.length) * 100).toFixed(
                              2
                            )}%`
                          }}
                        </td>
                        <td>{{ ids.join(', ') }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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

export default defineComponent({
  name: 'Statistics',
  components: {},
  props: {
    results: {
      type: Array,
      required: true
    },
    questions: {
      type: Array,
      required: true
    }
  },
  setup() {
    const state = reactive({
      tableForm: 'view'
    })

    const downloadTable = () => {}
    const isSelectType = () => {}
    const isNumberType = () => {}

    const questionnaireId = computed(() => {})
    const countedData = computed(() => {})
    const markdownTable = computed(() => {})
    const canDownload = computed(() => {})

    return {
      ...toRefs(state),
      tableFormtabs: ['view', 'markdown'],
      canDownload,
      downloadTable,
      countedData
    }
  }
})
</script>
