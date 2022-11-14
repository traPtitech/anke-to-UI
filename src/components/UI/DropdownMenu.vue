<template>
  <div :id="dropdownId" :class="$style.dropdown">
    <button :class="$style.button" @click="open">
      <div :class="$style.dropdownTrigger">
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
import Icon from '/@/components/UI/Icon.vue'
import { dropdownId } from '/@/components/UI/use/hideOnClickOutside'
import DropdownContents from '../UI/DropdownContents.vue'

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
      type: Array as PropType<string[]>,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    open: () => true,
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(props, context) {
    const open = () => {
      context.emit('open')
    }
    const close = () => {
      context.emit('close')
    }
    const change = (newOption: string) => {
      context.emit('update:modelValue', newOption)
    }

    return { open, close, change, dropdownId }
  }
})
</script>

<style lang="scss" module>
.dropdownTrigger {
  display: flex;
  padding: 0.25rem 0.5rem 0.25rem 1rem;
  align-items: center;
  .title {
    margin: 0;
    font-size: 1rem;
    width: 5rem;
    text-align: left;
  }
}
.button {
  background-color: $bg-secondary;
  border: solid 0.1rem $border;
  border-radius: 0.25rem;
  padding: 0;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: $bg-secondary-highlight;
  }
}
.icon {
  transition: 0.3s;
}
.rotate {
  transform: rotate(-180deg);
}
</style>
