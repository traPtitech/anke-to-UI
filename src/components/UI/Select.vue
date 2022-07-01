<template>
  <div :class="$style.container">
    <select
      :class="$style.select"
      :value="modelValue"
      @change="update($event.target.value)"
    >
      <option
        v-for="(content, index) in contents"
        :key="index"
        :value="content"
      >
        {{ content }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'QuestionRadio',
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
    'update:modelValue': (v: string) => true
  },
  setup(props, context) {
    const selectedIndex = computed(() => {
      return props.contents.indexOf(props.modelValue)
    })
    const update = (value: string) => {
      context.emit('update:modelValue', value)
    }

    return { selectedIndex, update }
  }
})
</script>

<style lang="scss" module>
.select {
  appearance: none;
  width: 200px;
  height: 40px;
  border-radius: 6px;
  background-color: $ui-white;
  border-color: $ui-secondary;
  padding: 8px 16px;
  cursor: pointer;
}
.container {
  position: relative;
  width: 200px;
  height: 40px;
}
.container::after {
  content: '';
  position: absolute;
  right: 12px;
  top: 50%;
  width: 10px;
  height: 10px;
  border-top: 3px solid $ui-primary;
  border-left: 3px solid $ui-primary;
  transform: translateY(-50%) rotate(-135deg);
  pointer-events: none;
}
</style>
