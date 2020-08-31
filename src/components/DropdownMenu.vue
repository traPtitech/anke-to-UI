<template>
  <div :class="$style.dropdowns">
    <div :class="$style.dropdown">
      <button :class="$style.button" @click="openSort">
        <div :class="$style.dropdown_trigger">
          <p :class="$style.title">並び替え</p>
          <icon name="chevron-down" :class="$style.icon" />
        </div>
      </button>
      <div v-if="state.isOpenSort" :class="$style.dropdown_menu">
        <p
          v-for="(sortOrder, index) in sortOrders"
          :key="index"
          :class="$style.contents"
        >
          {{ sortOrder.str }}
        </p>
      </div>
    </div>
    <div :class="$style.dropdown">
      <button :class="$style.button" @click="openOption">
        <div :class="$style.dropdown_trigger">
          <p :class="$style.title">フィルター</p>
          <icon name="chevron-down" :class="$style.icon" />
        </div>
      </button>
      <div v-if="state.isOpenOption" :class="$style.dropdown_menu">
        <p
          v-for="(targetedOption, index) in targetedOptions"
          :key="index"
          :class="$style.contents"
        >
          {{ targetedOption.str }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default {
  name: 'DropdownMenu',
  components: {
    icon: Icon
  },
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
      state.isOpenOption = false
    }
    const openOption = () => {
      state.isOpenOption = !state.isOpenOption
      state.isOpenSort = false
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

<style lang="scss" module>
.dropdowns {
  display: flex;
  .dropdown {
    padding-right: 0.5em;
  }
}
.dropdown_trigger {
  position: relative;
  display: flex;
  padding: 0.3em 1em 0.3em 1.4em;
  .title {
    padding-top: 0.2em;
    margin: 0 0.3em 0 0;
  }
}
.dropdown_menu {
  position: absolute;
  .contents {
    background-color: #ffffff;
    box-shadow: 0.5em 0 1em -0.3em rgba(10, 10, 10, 0.1);
    box-sizing: inherit;
    border: solid 0.01em #e7e7e7;
    border-radius: 0.3em;
    margin: 0;
    padding: 0.5em 1em;
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f4ecec;
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
