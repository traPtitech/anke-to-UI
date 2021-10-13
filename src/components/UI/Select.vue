<template>
  <select :value="modelValue" @change="update($event.target.value)">
    <option v-for="(content, index) in contents" :key="index" :value="content">
      {{ content }}
    </option>
  </select>
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
