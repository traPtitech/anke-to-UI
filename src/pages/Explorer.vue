<template>
  <div :class="$style.page_wrapper">
    <div :class="$style.tool_wrapper">
      <search-input
        v-model="searchQuery"
        :class="$style.search"
        @search="search"
      />
      <menus @change="changeOption" />
    </div>
    <Card :has-padding="false">
      <template #content>
        <FadeTransition>
          <div v-if="isFetched">
            <CardContentDetail :questionnaires="questionnaires" />
          </div>
          <div v-else>
            <CardContentDetailMock />
          </div>
        </FadeTransition>
      </template>
    </Card>
    <div :class="$style.pagination_wrapper">
      <Pagination
        v-if="isFetched"
        :current="option.page"
        :total-page="pagemax"
        @update-page="updatePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import Menus from '../components/UI/Menus.vue'
import SearchInput from '/@/components/Explorer/SearchInput.vue'
import apis, { SortType, QuestionnaireForList } from '/@/lib/apis'
import { Option } from '/@/components/UI/use/useOptions'
import Card from '/@/components/UI/Card.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import CardContentDetailMock from '/@/components/UI/CardContentDetailMock.vue'
import Pagination from '/@/components/UI/Pagination.vue'
import FadeTransition from '/@/components/UI/FadeTransition.vue'

export default defineComponent({
  name: 'Explorer',
  components: {
    Menus,
    SearchInput,
    Card,
    CardContentDetail,
    CardContentDetailMock,
    Pagination,
    FadeTransition
  },
  setup() {
    useTitle(ref('アンケート一覧'))

    const questionnaires = ref<QuestionnaireForList[]>([])

    const option = ref<Option>({
      sort: SortType.ModifiedAtDESC,
      page: 1,
      nontargeted: true
    })
    const searchQuery = ref('')
    const isFetched = ref(false)
    const pagemax = ref(1)
    const getQuestionnaires = async () => {
      try {
        const { data } = await apis.getQuestionnaires(
          option.value.sort,
          searchQuery.value,
          option.value.page,
          option.value.nontargeted
        )
        questionnaires.value = data.questionnaires
        pagemax.value = data.page_max - 1
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
      option.value.page = 1
      getQuestionnaires()
    }
    const search = () => {
      option.value.page = 1
      getQuestionnaires()
    }

    const updatePage = (page: number) => {
      option.value.page = page
      getQuestionnaires()
    }

    onMounted(() => {
      getQuestionnaires()
    })

    return {
      questionnaires,
      searchQuery,
      changeOption,
      search,
      isFetched,
      option,
      updatePage,
      pagemax
    }
  }
})
</script>

<style lang="scss" module>
.page_wrapper {
  max-width: 720px;
  margin-right: auto;
  margin-left: auto;
}
.tool_wrapper {
  padding: 1rem 0rem 2rem 0rem;
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  row-gap: 1rem;
}
.search {
  flex-grow: 1;
}
.pagination_wrapper {
  display: flex;
  justify-content: center;
}
</style>
