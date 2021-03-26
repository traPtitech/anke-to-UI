<template>
  <div :class="$style.dropdown">
    <button :class="$style.button" @click="open">
      <div :class="$style.dropdown_trigger">
        <p :class="$style.title">{{ title }}</p>
        <icon
          name="chevron-down"
          :class="[$style.icon, isOpen ? $style.rotate : '']"
        />
      </div>
    </button>
    <dropdown-contents
      :is-open="isOpen"
      :contents="contents"
      @close="close"
      @change-option="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  DropdownSortOrders,
  DropdownTargetedOptions,
  SortOrder,
  TargetedOption,
  Option,
  changeOption
} from './use/useOptions'
import Icon from '/@/components/UI/Icon.vue'
import DropdownContents from '/@/components/Explorer/DropdownContents.vue'

export default defineComponent({
  name: 'DropdownMenu',
  components: {
    Icon,
    DropdownContents
  },
  props: {
    title: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    contents: {
      type: Array as PropType<DropdownSortOrders[] | DropdownTargetedOptions[]>,
      required: true
    },
    modelValue: {
      type: Object as PropType<Option>,
      required: true
    }
  },
  emits: {
    open: () => true,
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: Option) => true
  },
  setup(props, context) {
    const open = () => {
      context.emit('open')
    }
    const close = () => {
      context.emit('close')
    }
    const change = (newOption: SortOrder | TargetedOption) => {
      const option = changeOption(props.modelValue, newOption)
      context.emit('update:modelValue', option)
    }

    return { open, close, change }
  }
})
</script>

<style lang="scss" module>
.dropdown_trigger {
  display: flex;
  padding: 0.3rem 1rem 0.3rem 1.4rem;
  align-items: center;
  .title {
    margin: 0 0.3rem 0 0;
    font-size: 1rem;
  }
}
.button {
  background-color: #ffffff;
  border: solid 0.1rem #cfb998;
  border-radius: 0.3rem;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f4ecec;
  }
}
.icon {
  transition: 0.3s;
}
.rotate {
  transform: rotate(-180deg);
}
</style>
