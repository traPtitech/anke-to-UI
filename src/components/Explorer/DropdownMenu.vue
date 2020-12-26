<template>
  <div :class="$style.dropdown">
    <button :class="$style.button" @click="open">
      <div :class="$style.dropdown_trigger">
        <p :class="$style.title">{{ title }}</p>
        <div v-if="isOpen">
          <icon name="chevron-up" :class="$style.icon" />
        </div>
        <div v-else>
          <icon name="chevron-down" :class="$style.icon" />
        </div>
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
</style>
