<template>
  <div :class="$style.tool_wrapper">
    <menus @change="changeOption" />
    <search-input
      v-model="searchQuery"
      :class="$style.search"
      @search="search"
    />
  </div>
  <div :class="$style.container">
    <ATable>
      <template #tableheader>
        <th
          v-for="(header, index) in HEADERS"
          :key="index"
          :class="$style.header"
        >
          {{ header }}
        </th>
      </template>
      <template #tablecontent>
        <table-row
          v-for="questionnaire in questionnaires"
          :key="questionnaire.questionnaireID"
        >
          <questionnaires-table-row
            v-if="isFetched"
            :questionnaire="questionnaire"
          />
          <questionnaires-table-row-mock
            v-else
            :questionnaire="questionnaire"
          />
        </table-row>
      </template>
    </ATable>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import Menus from '/@/components/Explorer/Menus.vue'
import SearchInput from '/@/components/Explorer/SearchInput.vue'
import QuestionnairesTableRow from '/@/components/Explorer/QuestionnairesTableRow.vue'
import QuestionnairesTableRowMock from '/@/components/Explorer/QuestionnairesTableRowMock.vue'
import apis, { QuestionnaireForList } from '/@/lib/apis'
import { Option } from '../components/Explorer/use/useOptions'
import ATable from '/@/components/UI/ATable.vue'
import TableRow from '/@/components/UI/TableRow.vue'

const HEADERS = ['', '回答期限', '更新日時', '作成日時', '結果']

export default defineComponent({
  name: 'Explorer',
  components: {
    ATable,
    Menus,
    QuestionnairesTableRow,
    QuestionnairesTableRowMock,
    SearchInput,
    TableRow
  },
  setup() {
    useTitle(ref('アンケート一覧'))

    const questionnaires = ref<QuestionnaireForList[]>([])

    const option = ref<Option>({
      sort: '-modified_at',
      page: 1,
      nontargeted: 'true'
    })
    const searchQuery = ref('')
    const isFetched = ref(true)
    const getQuestionnaires = async () => {
      try {
        const { data } = await apis.getQuestionnaires(
          option.value.sort,
          option.value.page,
          option.value.nontargeted === 'true',
          searchQuery.value
        )
        questionnaires.value = data.questionnaires
        isFetched.value = true
      } catch (e) {
        // 今のところ質問がない時404が帰ってくる
        // TODO: 後で消す
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    const changeOption = (newOption: Option) => {
      option.value = newOption
      getQuestionnaires()
    }
    const search = () => {
      getQuestionnaires()
    }

    onMounted(() => {
      getQuestionnaires()
    })

    return {
      HEADERS,
      questionnaires,
      searchQuery,
      changeOption,
      search,
      isFetched
    }
  }
})
</script>

<style lang="scss" module>
.tool_wrapper {
  padding: 1rem 0rem;
  display: flex;
  flex-wrap: wrap;
}
.container {
  max-width: 1280px;
  padding: 1rem;
  border: solid 1.5px #d9d9d9;
  overflow: auto;
}
.header {
  text-align: center;
  padding: 0.8rem;
}
</style>
