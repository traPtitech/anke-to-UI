<template>
  <div id="app">
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
import Icon from '/@/components/UI/Icon.vue'
import DropdownMenu from '/@/components/DropdownMenu.vue'
import QuestionnairesTable from '/@/components/QuestionnairesTable.vue'

export default {
  name: 'Explorer',
  components: {
    icon: Icon,
    'dropdown-menu': DropdownMenu,
    'questionnaires-table': QuestionnairesTable
  }
}
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
