<template>
  <QuestionCheckbox v-model="checkedContents" :contents="[content]" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
    const checkedContents = computed({
      get: () => {
        if (props.modelValue) {
          return [props.content]
        } else {
          return []
        }
      },
      set: value => {
        context.emit('update:modelValue', value.length > 0)
      }
    })

    return { checkedContents }
  }
})
</script>
