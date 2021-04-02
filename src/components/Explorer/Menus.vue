<template>
  <div :class="$style.container">
    <dropdown-menu
      v-model="option.sort"
      title="並べ替え"
      :contents="sortOrders"
      :class="$style.dropdown"
      :is-open="state.isOpenSort"
      @open="openSort"
      @close="closeMenus"
      @update:modelValue="change"
    />
    <dropdown-menu
      v-model="option.nontargeted"
      title="フィルター"
      :contents="targetedOptions"
      :class="$style.dropdown"
      :is-open="state.isOpenOption"
      @open="openOption"
      @close="closeMenus"
      @update:modelValue="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DropdownMenu from '/@/components/Explorer/DropdownMenu.vue'
import { Option, sortOrders, targetedOptions } from './use/useOptions'

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
    const option = ref({
      sort: '-modified_at',
      page: 1,
      nontargeted: false
    })

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
      context.emit('change', option.value)
    }

    return {
      state,
      sortOrders,
      targetedOptions,
      openSort,
      openOption,
      closeMenus,
      option,
      change
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
