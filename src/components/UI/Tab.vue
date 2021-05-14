<template>
  <div :class="$style.tab_wrapper">
    <div
      v-for="(content, index) in contents"
      :key="index"
      :ref="content === modelValue ? 'initRef' : ''"
      :class="$style.tab"
      @click="changeTab($event, content)"
    >
      {{ content }}
    </div>
    <span :style="lineStyle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'

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
    const lineStyle = ref({
      position: 'absolute',
      top: '',
      left: '',
      width: '',
      height: '2px',
      backgroundColor: '#92413b',
      transition: '0.3s'
    })
    const updateStyle = (el: HTMLElement) => {
      lineStyle.value.top = `${el.offsetTop + el.offsetHeight - 1}px`
      lineStyle.value.left = `${el.offsetLeft}px`
      lineStyle.value.width = `${el.offsetWidth}px`
    }

    const initRef = ref()
    onMounted(() => {
      updateStyle(initRef.value as HTMLElement)
    })

    const changeTab = (event: Event, newTab: string) => {
      updateStyle(event.target as HTMLElement)
      context.emit('update:modelValue', newTab)
    }

    return { lineStyle, initRef, changeTab }
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
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    &:hover {
      color: #cfb998;
      transition: color 0.2s;
    }
  }
}
</style>
