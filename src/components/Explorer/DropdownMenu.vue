<template>
  <div :class="$style.dropdown">
    <button :class="$style.button" @click="open">
      <div :class="$style.dropdown_trigger">
        <p :class="$style.title">{{ title }}</p>
        <icon name="chevron-down" :class="$style.icon" />
      </div>
    </button>
    <dropdown-contents :is-open="isOpen" :contents="contents" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DropdownSortOrders, DropdownTargetedOptions } from './use/useOptions'
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
    }
  },
  emits: ['open'],
  setup(props, context) {
    const open = () => {
      context.emit('open')
    }

    return {
      open
    }
  }
})
</script>

<style lang="scss" module>
.dropdown_trigger {
  display: flex;
  padding: 0.3em 1em 0.3em 1.4em;
  align-items: center;
  .title {
    margin: 0 0.3em 0 0;
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
