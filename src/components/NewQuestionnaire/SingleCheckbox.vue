<template>
  <QuestionCheckbox v-model="checked" :contents="[content]" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'

export default defineComponent({
  name: 'SingleCheckbox',
  components: {
    QuestionCheckbox
  },
  props: {
    content: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: boolean) => true
  },
  setup(props, context) {
    const checked = ref<string[]>([])
    watch(checked.value, () => {
      context.emit('update:modelValue', checked.value.length > 0)
    })

    return { checked }
  }
})
</script>
