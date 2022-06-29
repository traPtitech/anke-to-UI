<template>
  <InputNumber
    v-if="isNumber"
    :disabled="disabled"
    :model-value="modelValue"
    :placeholder="'0'"
    @update:model-value="updateValue"
  />
  <InputText
    v-else
    :disabled="disabled"
    :placeholder="'回答を入力'"
    :model-value="modelValue"
    @update:model-value="updateValue"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputNumber from './InputNumber.vue'
import InputText from './InputText.vue'

export default defineComponent({
  name: 'InputTextBase',
  components: {
    InputNumber,
    InputText
  },
  props: {
    isNumber: {
      type: Boolean,
      default: false
    },
    isLong: {
      type: Boolean,
      default: false
    },
    disabled: {
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
    const updateValue = (value: string) => {
      context.emit('update:modelValue', value)
    }
    return { updateValue }
  }
})
</script>

<style lang="scss" module></style>
