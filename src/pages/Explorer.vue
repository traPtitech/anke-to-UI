<template>
  <div id="app">
    <div class="tool-wrapper">
      <div class="dropdown">
        <button @click="openSort">
          <div class="dropdown-trigger">
            <p>並び替え</p>
            <span class="ti-angle-down"></span>
          </div>
        </button>
        <div v-if="state.isOpenSort" class="dropdown-menu">
          <p v-for="(sortOrder, key) in sortOrders" :key="key">
            {{ sortOrder.str }}
          </p>
        </div>
      </div>
      <div class="dropdown">
        <button @click="openOption">
          <div class="dropdown-trigger">
            <p>フィルター</p>
            <span class="ti-angle-down"></span>
          </div>
        </button>
        <div v-if="state.isOpenOption" class="dropdown-menu">
          <p v-for="(targetedOption, key) in targetedOptions" :key="key">
            {{ targetedOption.str }}
          </p>
        </div>
      </div>
      <div class="search">
        <input type="text" placeholder="検索" />
        <button class="search-icon">
          <span class="ti-search"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '/@/router'
import { reactive } from 'vue'

export default {
  name: 'Explorer',
  setup() {
    const state = reactive({
      isOpenSort: false,
      isOpenOption: false
    })
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

    const openSort = () => {
      state.isOpenSort = !state.isOpenSort
      if (state.isOpenOption) {
        state.isOpenOption = false
      }
    }
    const openOption = () => {
      state.isOpenOption = !state.isOpenOption
      if (state.isOpenSort) {
        state.isOpenSort = false
      }
    }

    return {
      state,
      sortOrders,
      targetedOptions,
      openSort,
      openOption
    }
  }
}
</script>

<style lang="scss">
.tool-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.dropdown-trigger {
  position: relative;
  display: inherit;
  padding: 0.5em 1.5em;
  span {
    padding: 0.2em;
  }
  p {
    margin: 0 8px 0 0;
  }
}
.dropdown-menu {
  position: absolute;
  p {
    box-shadow: 0.5em 0 1em -0.3em rgba(10, 10, 10, 0.1);
    box-sizing: inherit;
    border: solid 0.01em #e7e7e7;
    border-radius: 0.3em;
    margin: 0;
    padding: 0.5em 1em;
    text-align: left;
  }
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
