<template>
  <div :id="dropdownId">
    <icon :name="name" :class="$style.icon" @click="isOpen = !isOpen" />
    <dropdown-contents
      :contents="contents"
      :is-open="isOpen"
      :class="isPopoutRight ? '' : $style.popoutleft"
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
    isPopoutRight: {
      type: Boolean,
      default: true
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

<style lang="scss" module>
.icon {
  cursor: pointer;
  padding: 0.25rem;
  @include colors($ui-secondary, #00000000);
}
.popoutleft {
  position: absolute;
  right: 0px;
}
</style>
