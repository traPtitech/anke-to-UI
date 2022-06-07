<template>
  <ExplorerDropdownMenu
    v-model="selected"
    :title="title"
    :contents="contents"
    :is-open="isOpen"
    :show-option="showOption"
    @open="toggle"
    @close="toggle"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import ExplorerDropdownMenu from '../Explorer/DropdownMenu.vue'

export default defineComponent({
  name: 'DropdownMenu',
  components: {
    ExplorerDropdownMenu
  },
  props: {
    title: {
      type: String,
      required: true
    },
    contents: {
      type: Array as PropType<string[]>,
      required: true
    },
    showOption: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (v: string) => true
  },
  setup(props, context) {
    const isOpen = ref(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }
    const selected = computed({
      get: () => props.modelValue,
      set: (value: string) => context.emit('update:modelValue', value)
    })

    return { isOpen, toggle, selected }
  }
})
</script>
