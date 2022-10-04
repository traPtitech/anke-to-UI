<template>
  <transition name="drop-down-content-fade" mode="out-in">
    <div v-if="isOpen" :class="$style.dropdownMenu">
      <p
        v-for="(content, index) in contents"
        :key="index"
        :class="$style.contents"
        @click="onClick(content)"
      >
        {{ content }}
      </p>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'DropdownContents',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    contents: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeOption: (value: string) => true
  },
  setup(props, context) {
    const close = () => {
      context.emit('close')
    }
    const changeOption = (newOption: string) => {
      context.emit('changeOption', newOption)
    }

    const onClick = (newOption: string) => {
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
.dropdownMenu {
  position: absolute;
  margin-top: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(33, 63, 99, 0.3);
  z-index: 1;
  background-color: #ffffff;
  .contents {
    margin: 0;
    padding: 0.5rem 1rem;
    &:first-child {
      padding: 1rem 1rem 0.5rem;
    }
    &:last-child {
      padding: 0.5rem 1rem 1rem;
    }
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f4ecec;
    }
  }
}
</style>
