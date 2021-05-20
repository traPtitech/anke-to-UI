<template>
  <div :class="$style.tabWrapper">
    <div
      v-for="(content, index) in contents"
      :key="index"
      :ref="setTabRef"
      :class="$style.tab"
      @click="changeTab(content)"
    >
      {{ content }}
    </div>
    <span :class="$style.tabLine" :style="lineStyle" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  PropType,
  Ref,
  ref
} from 'vue'

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
    let tabRefs: Ref<HTMLElement[]> = ref([])
    const setTabRef = (el: HTMLElement) => {
      if (el) tabRefs.value.push(el)
    }
    onBeforeUpdate(() => {
      tabRefs.value = []
    })

    const lineStyle = ref({
      left: '',
      width: '',
      transition: '0.3s'
    })
    const updateStyle = (el: HTMLElement, shouldTransition = true) => {
      lineStyle.value.left = `${el.offsetLeft}px`
      lineStyle.value.width = `${el.offsetWidth}px`
      if (shouldTransition) {
        lineStyle.value.transition = '0.3s'
      } else {
        lineStyle.value.transition = ''
      }
    }

    const selected = ref(props.modelValue)
    const selectedIndex = computed(() => {
      const index = props.contents.findIndex(v => v === selected.value)
      if (index < 0) return 0
      else return index
    })

    const changeTab = (content: string) => {
      selected.value = content
      updateStyle(tabRefs.value[selectedIndex.value])
      context.emit('update:modelValue', props.contents[selectedIndex.value])
    }

    const handleResize = () => {
      updateStyle(tabRefs.value[selectedIndex.value], false)
    }
    onMounted(() => {
      updateStyle(tabRefs.value[selectedIndex.value])
      window.addEventListener('resize', handleResize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return { setTabRef, lineStyle, changeTab }
  }
})
</script>

<style lang="scss" module>
.tabWrapper {
  position: relative;
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
  .tabLine {
    position: absolute;
    bottom: -1px;
    height: 2px;
    background-color: #92413b;
  }
}
</style>
