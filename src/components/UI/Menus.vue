<template>
  <div :class="$style.container">
    <dropdown-menu
      v-model="optionStr.sort"
      title="並べ替え"
      :contents="sortOrders"
      :is-open="state.isOpenSort"
      @open="openSort"
      @close="closeMenus"
      @update:modelValue="change"
    />
    <dropdown-menu
      v-model="optionStr.nontargeted"
      title="フィルター"
      :contents="targetedOptions"
      :is-open="state.isOpenOption"
      @open="openOption"
      @close="closeMenus"
      @update:modelValue="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DropdownMenu from '../UI/DropdownMenu.vue'
import {
  Option,
  sortOrderMap,
  targetedOptionMap,
  stringToOption
} from './use/useOptions'

export default defineComponent({
  name: 'Menus',
  components: {
    DropdownMenu
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change: (value: Option) => true
  },
  setup(props, context) {
    const state = ref({
      isOpenSort: false,
      isOpenOption: false
    })
    const optionStr = ref({
      sort: '最近更新された',
      page: 1,
      nontargeted: '全て'
    })

    const sortOrders = sortOrderMap.map(v => v[0])
    const targetedOptions = targetedOptionMap.map(v => v[0])

    const openSort = () => {
      state.value.isOpenSort = !state.value.isOpenSort
      state.value.isOpenOption = false
    }
    const openOption = () => {
      state.value.isOpenOption = !state.value.isOpenOption
      state.value.isOpenSort = false
    }
    const closeMenus = () => {
      state.value.isOpenSort = false
      state.value.isOpenOption = false
    }

    const change = () => {
      const option = {
        sort: stringToOption(optionStr.value.sort, new Map(sortOrderMap)),
        page: optionStr.value.page,
        nontargeted: stringToOption(
          optionStr.value.nontargeted,
          new Map(targetedOptionMap)
        )
      }
      context.emit('change', option)
    }

    return {
      state,
      sortOrders,
      targetedOptions,
      openSort,
      openOption,
      closeMenus,
      optionStr,
      change
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  column-gap: 1rem;
}
</style>
