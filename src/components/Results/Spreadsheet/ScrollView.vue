<template>
  <div>
    <!-- table view -->
    <table v-if="tableForm === 'view'">
      <TableHeader :table-headers="tableHeaders" :toggle-show-column="toggleShowColumn" :showColumns="showColumns" />
      <TableBody :results="results" />
    </table>

    <!-- markdown, csv view -->
    <button v-if="isTextTable" @click="copyTable">
      <Icon name="clipboard" />
    </button>
    <button v-if="isTextTable" @click="downloadTable">
      <Icon name="download" />
    </button>
    <textarea
      v-for="(table, name) in textTables"
      v-show="tableForm === name"
      :key="name"
      :value="table"
      :rows="table.split('\n').length + 3"
      readonly
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import { tableForm, isTextTable, textTables, DEFAULT_COLUMNS_NUM, defaultColumns } from '../use/utils'

export default defineComponent({
  name: 'ScrollView',
  components: {
    Icon,
    TableHeader,
    TableBody
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
  setup({ questions }) {
    const copyTable = () => undefined
    const downloadTable = () => undefined
    const questionLabels = computed(() => questions.map(question => question.body));
    const tableHeaders = computed(() => defaultColumns.map((data) => data.label).concat(questionLabels.value));
    
    console.log(questions);
    // カラムの表示非表示
    let showColumns = ref(new Array(questions.length + DEFAULT_COLUMNS_NUM).fill(true));
    watch(questions, () => {
      console.log(questions);
      showColumns.value = new Array(questions.length + DEFAULT_COLUMNS_NUM).fill(true);
      console.log(showColumns.value);
    });
    const toggleShowColumn = (index) => {
      if(index < 0 || index >= showColumns.value.length) return;
      showColumns.value[index] = !showColumns[index];
    }

    return {
      tableForm,
      copyTable,
      downloadTable,
      tableHeaders,
      showColumns,
      isTextTable,
      textTables,
      toggleShowColumn
    }
  }
})
</script>
