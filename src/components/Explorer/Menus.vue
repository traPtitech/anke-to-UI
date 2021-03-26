<template>
  <div :class="$style.container">
    <dropdown-menu
      v-model="option"
      title="並べ替え"
      :contents="sortOrders"
      :class="$style.dropdown"
      :is-open="state.isOpenSort"
      @open="openSort"
      @close="closeMenus"
    />
    <dropdown-menu
      v-model="option"
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
import { defineComponent, PropType, reactive, ref } from 'vue'
import DropdownMenu from '/@/components/Explorer/DropdownMenu.vue'
import { sortOrders, targetedOptions, Option } from './use/useOptions'

export default defineComponent({
  name: 'Menus',
  components: {
    DropdownMenu
  },
  props: {
    modelValue: {
      type: Object as PropType<Option>,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      isOpenSort: false,
      isOpenOption: false
    })
    const option = ref(props.modelValue)

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

    return {
      state,
      sortOrders,
      targetedOptions,
      openSort,
      openOption,
      closeMenus,
      option
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
