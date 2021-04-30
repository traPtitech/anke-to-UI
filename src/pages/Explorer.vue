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
    const questionnaires = ref<QuestionnaireForList[]>([])
    const searchQuery = ref('')

    const getQuestionnaires = async (
      sort: string,
      page: number,
      nontargeted: boolean
    ) => {
      try {
        const { data } = await apis.getQuestionnaires(sort, page, nontargeted)
        questionnaires.value = data.questionnaires
      } catch (e) {
        // 今のところ質問がない時404が帰ってくる
        // TODO: 後で消す
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    const changeOption = (option: Option) => {
      getQuestionnaires(option.sort, option.page, option.nontargeted === 'true')
    }

    onMounted(() => {
      getQuestionnaires('-modified_at', 1, false)
    })

    return { questionnaires, searchQuery, changeOption }
  }
})
</script>

<style lang="scss" module>
.tool_wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
