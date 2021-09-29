<template>
  <div :class="$style.tool_wrapper">
    <menus @change="changeOption" />
    <search-input
      v-model="searchQuery"
      :class="$style.search"
      @search="search"
    />
  </div>
  <questionnaires-table :questionnaires="questionnaires" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import Menus from '/@/components/Explorer/Menus.vue'
import SearchInput from '/@/components/Explorer/SearchInput.vue'
import QuestionnairesTable from '/@/components/Explorer/QuestionnairesTable.vue'
import apis, { QuestionnaireForList } from '/@/lib/apis'
import { Option } from '../components/Explorer/use/useOptions'

export default defineComponent({
  name: 'Explorer',
  components: {
    Menus,
    QuestionnairesTable,
    SearchInput
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

    const getQuestionnaires = async () => {
      try {
        const { data } = await apis.getQuestionnaires(
          option.value.sort,
          option.value.page,
          option.value.nontargeted === 'true',
          searchQuery.value
        )
        questionnaires.value = data.questionnaires
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

    return { questionnaires, searchQuery, changeOption, search }
  }
})
</script>

<style lang="scss" module>
.tool_wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
