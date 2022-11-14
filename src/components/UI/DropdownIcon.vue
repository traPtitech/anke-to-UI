<template>
  <div :id="dropdownId">
    <icon :name="name" @click="isOpen = !isOpen" />
    <dropdown-contents
      :contents="contents"
      :is-open="isOpen"
      :style="`right:${right}`"
      @change-option="changeOption"
      @close="isOpen = !isOpen"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { dropdownId } from '/@/components/UI/use/hideOnClickOutside'
import DropdownContents from '/@/components/UI/DropdownContents.vue'

export default defineComponent({
  name: 'DropdownIcon',
  components: {
    Icon,
    DropdownContents
  },
  props: {
    name: {
      type: String,
      required: true
    },
    contents: {
      type: Array as PropType<string[]>,
      required: true
    },
    right: {
      type: String,
      default: 'auto'
    }
  },
  emits: {
    close: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeOption: (value: string) => true
  },
  setup(props, context) {
    const changeOption = (newOption: string) => {
      context.emit('changeOption', newOption)
    }
    const isOpen = ref(false)

    return {
      changeOption,
      dropdownId,
      isOpen
    }
  }
})
</script>

<style lang="scss" module></style>
