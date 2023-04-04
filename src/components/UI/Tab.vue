<template>
  <div :class="$style.tabWrapper">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      :ref="setTabRef"
      :class="[$style.tab, selectedTab === tab && $style.selectedTab]"
      @click="changeTab(tab)"
    >
      {{ tab }}
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
    tabs: {
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
      const index = props.tabs.findIndex(v => v === selected.value)
      if (index < 0) return 0
      else return index
    })

    const changeTab = (content: string) => {
      selected.value = content
      updateStyle(tabRefs.value[selectedIndex.value])
      context.emit('update:modelValue', props.tabs[selectedIndex.value])
    }

    const handleResize = () => {
      updateStyle(tabRefs.value[selectedIndex.value], false)
    }
    const selectedTab = computed(() => {
      return props.tabs.includes(props.modelValue) ? props.modelValue : ''
    })
    onMounted(() => {
      updateStyle(tabRefs.value[selectedIndex.value])
      window.addEventListener('resize', handleResize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return { setTabRef, lineStyle, changeTab, selectedTab }
  }
})
</script>

<style lang="scss" module>
.tabWrapper {
  position: sticky;
  top: -1.5em;
  color: $ui-secondary;
  display: flex;
  justify-content: left;
  border-bottom: solid 1px $ui-secondary;
  @include size-head-small;
  .tab {
    padding: 0.25rem 1.5rem;
    margin: 0.125rem 0;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      color: $ui-white;
      background: $bg-primary-highlight;
    }
  }
  .selectedTab {
    color: $accent-primary;
    &:hover {
      color: $accent-primary;
      background: none;
    }
  }
  .tabLine {
    position: absolute;
    bottom: -1px;
    height: 0.25rem;
    border-radius: 1rem;
    background-color: $accent-primary;
  }
}
</style>
