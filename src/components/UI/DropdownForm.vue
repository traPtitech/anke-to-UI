<template>
  <div :class="$style.dropdown">
    <button :id="dropdownId" :class="$style.button" @click="isOpen = !isOpen">
      <div :class="$style.dropdownTrigger">
        <p :class="$style.title" :style="`width : ${titleWidth}px`">
          {{ modelValue }}
        </p>
        <icon
          name="chevron-down"
          :class="[$style.icon, isOpen ? $style.rotate : '']"
        />
      </div>
    </button>
    <dropdown-contents
      :is-open="isOpen"
      :contents="contents"
      @close="isOpen = !isOpen"
      @change-option="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { dropdownId } from '/@/components/UI/use/hideOnClickOutside'
import DropdownContents from '/@/components/UI/DropdownContents.vue'

export default defineComponent({
  name: 'DropdownForm',
  components: {
    Icon,
    DropdownContents
  },
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
    const isOpen = ref(false)
    const change = (newOption: string) => {
      context.emit('update:modelValue', newOption)
    }
    const titleWidth = computed(() => {
      const contentsLength = props.contents.map(value => {
        let len = 0
        for (let i = 0; i < value.length; i++) {
          //半角全角数える
          value[i].match(/[ -~]/) ? (len += 1) : (len += 2)
        }
        return 16 + len * 8
      })
      contentsLength.sort((a, b) => b - a)
      return contentsLength[0]
    })

    return { change, isOpen, dropdownId, titleWidth }
  }
})
</script>

<style lang="scss" module>
.dropdown {
  position: relative;
}
.dropdownTrigger {
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
}
.title {
  margin: 0;
  @include size-body;
  text-align: left;
}
.button {
  padding: 0;
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  @include colors($ui-primary, $bg-secondary);
}
.icon {
  transition: 0.3s;
}
.rotate {
  transform: rotate(-180deg);
}
</style>
