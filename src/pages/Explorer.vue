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
    <CardWithHeader :header-visible="false">
      <template #content>
        <transition name="fadeExplore">
          <div v-if="isFetched">
            <CardContentDetail :questionnaires="questionnaires" />
          </div>
          <div v-else>
            <CardContentDetailMock />
          </div>
        </transition>
      </template>
    </CardWithHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import Menus from '/@/components/Explorer/Menus.vue'
import SearchInput from '/@/components/Explorer/SearchInput.vue'
import apis, { SortType, QuestionnaireForList } from '/@/lib/apis'
import { Option } from '/@/components/Explorer/use/useOptions'
import CardWithHeader from '/@/components/UI/CardWithHeader.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import CardContentDetailMock from '/@/components/UI/CardContentDetailMock.vue'

export default defineComponent({
  name: 'Explorer',
  components: {
    Menus,
    SearchInput,
    CardWithHeader,
    CardContentDetail,
    CardContentDetailMock
  },
  setup() {
    useTitle(ref('アンケート一覧'))

    const questionnaires = ref<QuestionnaireForList[]>([])

    const option = ref<Option>({
      sort: SortType.ModifiedAtDESC,
      page: 1,
      nontargeted: 'true'
    })
    const searchQuery = ref('')
    const isFetched = ref(false)
    const getQuestionnaires = async () => {
      try {
        const { data } = await apis.getQuestionnaires(
          option.value.sort,
          searchQuery.value,
          option.value.page,
          option.value.nontargeted === 'true'
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
.page_wrapper {
  max-width: 1280px;
}
.tool_wrapper {
  padding: 1rem 0rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
}
:global {
  .fadeExplore-enter-active,
  .fadeExplore-leave-active {
    transition: opacity 0.2s;
  }
  .fadeExplore-enter-from,
  .fadeExplore-leave-to {
    opacity: 0;
  }
}
</style>
