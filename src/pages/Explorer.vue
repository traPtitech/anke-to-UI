<template>
  <div>
    <div :class="$style.tool_wrapper">
      <dropdown-menu />
      <div :class="$style.search">
        <input type="text" placeholder="検索" :class="$style.input" />
        <button :class="[$style.button, $style.search_icon]">
          <icon name="magnify" :class="$style.icon" />
        </button>
      </div>
    </div>
    <questionnaires-table />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import DropdownMenu from '/@/components/Explorer/Menus.vue'
import QuestionnairesTable from '/@/components/Explorer/QuestionnairesTable.vue'
import apis, { QuestionnaireForList } from '/@/lib/apis'

export default defineComponent({
  name: 'Explorer',
  components: {
    Icon,
    DropdownMenu,
    QuestionnairesTable
  },
  setup() {
    const questionnaires = ref<QuestionnaireForList[]>([])
    onMounted(async () => {
      try {
        const { data } = await apis.getQuestionnaires('modified_at', 1, false)
        questionnaires.value = data
      } catch (e) {
        // 今のところ質問がない時404が帰ってくる
        // TODO: 後で消す
        // eslint-disable-next-line no-console
        console.error(e)
      }
    })
    return { questionnaires }
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
  margin-left: 1.5em;
  .input {
    border: solid 0.1em #dbdbdb;
    border-radius: 0.3em 0 0 0.3em;
    padding-left: 0.8em;
    &::placeholder {
      color: #dbdbdb;
    }
  }
  .search_icon {
    border-radius: 0 0.3em 0.3em 0;
    .icon {
      height: 1.5em;
      width: 1.5em;
      padding: 0.3em;
    }
  }
}
.button {
  background-color: #ffffff;
  border: solid 0.1em #cfb998;
  border-radius: 0.3em;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f4ecec;
  }
}
</style>
