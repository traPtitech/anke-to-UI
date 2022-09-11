<template>
  <input-base-with-underline>
    <input-base
      :disabled="disabled"
      :is-focus="isFocus"
      :is-textarea="isTextarea"
      :placeholder="placeholder"
      :model-value="modelValue"
      @update:model-value="update"
    />
  </input-base-with-underline>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputBase from './InputBase.vue'
import InputBaseWithUnderline from './InputBaseWithUnderline.vue'

export default defineComponent({
  name: 'InputText',
  components: {
    InputBaseWithUnderline,
    InputBase
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    isHover: {
      type: Boolean,
      default: true
    },
    isTextarea: {
      type: Boolean,
      default: false
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
    const update = (value: string) => {
      context.emit('update:modelValue', value)
    }
    return { update }
  }
})
</script>
