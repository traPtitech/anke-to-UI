<template>
  <div :class="$style.dropdown">
    <button :class="$style.button" @click="isOpen = !isOpen">
      <div :class="$style.dropdownTrigger">
        <p :class="$style.title">{{ modelValue }}</p>
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
import { defineComponent, PropType, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import DropdownContents from '/@/components/Explorer/DropdownContents.vue'

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

    return { change, isOpen }
  }
})
</script>

<style lang="scss" module>
.dropdown {
  position: relative;
}
.dropdownTrigger {
  display: flex;
  padding: 0.25rem 0.5rem 0.25rem 1rem;
  align-items: center;
  .title {
    margin: 0;
    @include size-body;
    width: 5rem;
    text-align: left;
  }
}
.button {
  background-color: $bg-secondary;
  border: solid 1px #e2e8f0;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
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
