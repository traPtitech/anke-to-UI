<template>
  <div :class="$style.tool_wrapper">
    <dropdown-menu @get="getQuestionnairesForOption" />
    <div :class="$style.search">
      <input type="text" placeholder="検索" :class="$style.input" />
      <button :class="[$style.button, $style.search_icon]">
        <icon name="magnify" :class="$style.icon" />
      </button>
    </div>
  </div>
  <questionnaires-table :questionnaires="questionnaires" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import DropdownMenu from '/@/components/Explorer/Menus.vue'
import QuestionnairesTable from '/@/components/Explorer/QuestionnairesTable.vue'
import apis, { QuestionnaireForList } from '/@/lib/apis'
import {
  SortOrder,
  TargetedOption,
  targetedOptions
} from '../components/Explorer/use/useOptions'

export default defineComponent({
  name: 'Explorer',
  components: {
    Icon,
    DropdownMenu,
    QuestionnairesTable
  },
  setup() {
    const option = {
      sort: '-modified_at',
      page: 1,
      nontargeted: false
    }

    const questionnaires = ref<QuestionnaireForList[]>([])
    const getQuestionnaires = async () => {
      try {
        const { data } = await apis.getQuestionnaires(
          option.sort,
          option.page,
          option.nontargeted
        )
        questionnaires.value = data.questionnaires
      } catch (e) {
        // 今のところ質問がない時404が帰ってくる
        // TODO: 後で消す
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    const getQuestionnairesForOption = (
      newOption: SortOrder | TargetedOption
    ) => {
      if (targetedOptions.some(param => param.opt === newOption)) {
        option.nontargeted = newOption === 'true'
      } else {
        option.sort = newOption
      }
      getQuestionnaires()
    }

    onMounted(getQuestionnaires)

    return { questionnaires, getQuestionnairesForOption }
  }
})
</script>

<style lang="scss" module>
.tool_wrapper {
  display: flex;
  flex-wrap: wrap;
}
.search {
  display: inherit;
  margin-left: 1.5rem;
  .input {
    border: solid 0.1rem #dbdbdb;
    border-radius: 0.3rem 0 0 0.3rem;
    padding-left: 0.8rem;
    &::placeholder {
      color: #dbdbdb;
    }
  }
  .search_icon {
    border-radius: 0 0.3rem 0.3rem 0;
    .icon {
      height: 1.5rem;
      width: 1.5rem;
      padding: 0.3rem;
    }
  }
}
.button {
  background-color: #ffffff;
  border: solid 0.1rem #cfb998;
  border-radius: 0.3rem;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f4ecec;
  }
}
</style>
