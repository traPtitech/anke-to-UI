<template>
  <div :class="$style.container">
    <dropdown-menu
      title="並べ替え"
      :contents="sortOrders"
      :class="$style.dropdown"
      :is-open="state.isOpenSort"
      @open="openSort"
      @close="closeMenus"
    />
    <dropdown-menu
      title="フィルター"
      :contents="targetedOptions"
      :class="$style.dropdown"
      :is-open="state.isOpenOption"
      @open="openOption"
      @close="closeMenus"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import DropdownMenu from '/@/components/Explorer/DropdownMenu.vue'
import {
  SortOrder,
  sortOrders,
  TargetedOption,
  targetedOptions
} from './use/useOptions'

export default defineComponent({
  name: 'Menus',
  components: {
    DropdownMenu
  },
  emits: ['get'],
  setup(props, context) {
    const state = reactive({
      isOpenSort: false,
      isOpenOption: false
    })

    const openSort = () => {
      state.isOpenSort = !state.isOpenSort
      state.isOpenOption = false
    }
    const openOption = () => {
      state.isOpenOption = !state.isOpenOption
      state.isOpenSort = false
    }
    const closeMenus = (newOption: SortOrder | TargetedOption) => {
      state.isOpenSort = false
      state.isOpenOption = false
      context.emit('get', newOption)
    }

    return {
      state,
      sortOrders,
      targetedOptions,
      openSort,
      openOption,
      closeMenus
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  .dropdown {
    margin-right: 0.5rem;
  }
}
</style>
