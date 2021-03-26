<template>
  <transition name="drop-down-content-fade" mode="out-in">
    <div v-if="isOpen" :class="$style.dropdown_menu">
      <p
        v-for="(content, index) in contents"
        :key="index"
        :class="$style.contents"
        @click="onClick(content.opt)"
      >
        {{ content.str }}
      </p>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  DropdownSortOrders,
  DropdownTargetedOptions,
  SortOrder,
  TargetedOption
} from './use/useOptions'

export default defineComponent({
  name: 'DropdownContents',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    contents: {
      type: Array as PropType<DropdownSortOrders[] | DropdownTargetedOptions[]>,
      required: true
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeOption: (value: SortOrder | TargetedOption) => true
  },
  setup(props, context) {
    const close = () => {
      context.emit('close')
    }
    const changeOption = (newOption: SortOrder | TargetedOption) => {
      context.emit('changeOption', newOption)
    }

    const onClick = (newOption: SortOrder | TargetedOption) => {
      close()
      changeOption(newOption)
    }

    return { onClick }
  }
})
</script>

<style lang="scss" module>
:global {
  .drop-down-content-fade-enter-active,
  .drop-down-content-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .drop-down-content-fade-enter-from,
  .drop-down-content-fade-leave-to {
    opacity: 0;
  }
}
.dropdown_menu {
  position: absolute;
  margin-top: 0.5rem;
  .contents {
    background-color: #ffffff;
    box-shadow: 0.5rem 0rem 1rem -0.3rem rgba(10, 10, 10, 0.1);
    border: solid 0.01rem #e7e7e7;
    border-radius: 0.3;
    margin: 0;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f4ecec;
    }
  }
}
</style>
