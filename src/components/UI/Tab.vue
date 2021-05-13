<template>
  <div :class="$style.tab_wrapper">
    <div
      v-for="(content, index) in contents"
      :key="index"
      :class="[content === modelValue ? $style.selected : '', $style.tab]"
      @click="changeTab(content)"
    >
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(props, context) {
    const changeTab = (newTab: string) => {
      context.emit('update:modelValue', newTab)
    }

    return { changeTab }
  }
})
</script>

<style lang="scss" module>
.tab_wrapper {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: solid 1px;
  .tab {
    padding: 0 0.5rem;
    cursor: pointer;
    margin: -1px 0;
    &:hover:not(.selected) {
      border-bottom: solid 1px #cfb998;
      color: #cfb998;
      transition: border-bottom, color 0.2s;
    }
  }
  .selected {
    border-bottom: solid 2px #92413b;
  }
}
</style>
