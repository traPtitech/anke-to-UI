<template>
  <div :class="$style.container">
    <dropdown-menu
      title="並べ替え"
      :contents="sortOrders"
      :class="$style.dropdown"
      :isOpen="state.isOpenSort"
      @open="openSort"
    />
    <dropdown-menu
      title="フィルター"
      :contents="targetedOptions"
      :class="$style.dropdown"
      :isOpen="state.isOpenOption"
      @open="openOption"
    />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import DropdownMenu from '/@/components/Explorer/DropdownMenu.vue'
import useOptions from './use/useOptions'

export default {
  name: 'Menus',
  components: {
    DropdownMenu
  },
  setup() {
    const state = reactive({
      isOpenSort: false,
      isOpenOption: false
    })

    const sortOrders = useOptions.sortOrders
    const targetedOptions = useOptions.targetedOptions

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
.container {
  display: flex;
  .dropdown {
    padding-right: 0.5em;
  }
}
</style>
