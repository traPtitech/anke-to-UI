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
import { defineComponent, reactive, ref } from 'vue'
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
    const state = reactive({
      isOpenSort: false,
      isOpenOption: false
    })
    const option = ref({
      sort: '-modified_at',
      page: 1,
      nontargeted: false
    })

    const openSort = () => {
      state.isOpenSort = !state.isOpenSort
      state.isOpenOption = false
    }
    const openOption = () => {
      state.isOpenOption = !state.isOpenOption
      state.isOpenSort = false
    }
    const closeMenus = () => {
      state.isOpenSort = false
      state.isOpenOption = false
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
