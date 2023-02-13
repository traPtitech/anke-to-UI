<template>
  <div :class="$style.container">
    <DropdownForm
      v-model="optionStr.sort"
      :contents="sortOrders"
      @update:model-value="change"
    />
    <div :class="$style.checkbox">
      <label :class="$style.label">
        <Checkbox :is-checked="optionStr.nontargeted" @input="changecheck" />
        <div :class="$style.content">対象外のみ</div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Checkbox from './QuestionCheckboxIcon.vue'
import DropdownForm from './DropdownForm.vue'
import { Option, sortOrderMap, stringToOption } from './use/useOptions'

export default defineComponent({
  name: 'Menus',
  components: {
    DropdownForm,
    Checkbox
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change: (value: Option) => true
  },
  setup(props, context) {
    const optionStr = ref({
      sort: '最近更新された',
      page: 1,
      nontargeted: false
    })

    const sortOrders = sortOrderMap.map(v => v[0])

    const change = () => {
      const option = {
        sort: stringToOption(optionStr.value.sort, new Map(sortOrderMap)),
        page: optionStr.value.page,
        nontargeted: optionStr.value.nontargeted
      }
      context.emit('change', option)
    }
    const changecheck = () => {
      optionStr.value.nontargeted = !optionStr.value.nontargeted
      change()
    }

    return {
      sortOrders,
      optionStr,
      change,
      changecheck
    }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  gap: 24px;
}
.checkbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.label {
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
.content {
  @include size-body-small-3;
  margin-left: 8px;
}
</style>
