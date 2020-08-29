<template>
  <div id="app">
    <div class="tool-wrapper">
      <dropdown-menu menuName="並び替え" :contents="sortOrders" />
      <dropdown-menu menuName="フィルター" :contents="targetedOptions" />
      <div class="search">
        <input type="text" placeholder="検索" />
        <button class="search-icon">
          <span class="ti-search"></span>
        </button>
      </div>
    </div>
    <questionnaires-table />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import router from '/@/router'
import { reactive } from 'vue'
import DropdownMenu from '/@/components/DropdownMenu.vue'
import QuestionnairesTable from '/@/components/QuestionnairesTable.vue'

export default {
  name: 'Explorer',
  components: {
    'dropdown-menu': DropdownMenu,
    'questionnaires-table': QuestionnairesTable
  },
  setup() {
    const data = reactive({})

    const sortOrders = [
      {
        str: '最近更新された',
        opt: '-modified_at'
      },
      {
        str: '最近更新されていない',
        opt: 'modified_at'
      },
      {
        str: 'タイトル順',
        opt: 'title'
      },
      {
        str: 'タイトル逆順',
        opt: '-title'
      },
      {
        str: '最新',
        opt: '-created_at'
      },
      {
        str: '最も古い',
        opt: 'created_at'
      }
    ]
    const targetedOptions = [
      {
        str: '全て',
        opt: false
      },
      {
        str: '対象外のもののみ',
        opt: true
      }
    ]

    return {
      sortOrders,
      targetedOptions
    }
  }
}
</script>

<style lang="scss">
.tool-wrapper {
  display: flex;
  flex-wrap: wrap;
}
button {
  display: flex;
  background-color: #ffffff;
  border: solid 0.1em #cfb998;
  border-radius: 0.3em;
  padding: 0;
  &:hover {
    background-color: #f4ecec;
  }
}
.search {
  display: inherit;
  margin-left: 1.5em;
  input {
    border: solid 0.1em #dbdbdb;
    border-radius: 0.3em 0 0 0.3em;
    padding-left: 0.8em;
    &::placeholder {
      color: #dbdbdb;
    }
  }
  .search-icon {
    border-radius: 0 0.3em 0.3em 0;
    span {
      padding: 10px;
    }
  }
}
</style>
