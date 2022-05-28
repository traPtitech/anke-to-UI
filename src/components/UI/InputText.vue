<template>
  <input
    :type="isNumber ? 'number' : 'text'"
    :class="$style.input"
    :placeholder="isNumber ? '数値を入力' : '回答'"
    :disabled="disabled"
    @input="update"
  />
  <input-underline :class="$style.underline" :is-blue="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputUnderline from '/@/components/UI/InputUnderline.vue'

export default defineComponent({
  name: 'InputText',
  components: {
    InputUnderline
  },
  props: {
    isNumber: {
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
    const update = (e: InputEvent) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return { update }
  }
})
</script>

<style lang="scss" module>
$input-border: 1px;
$underline-margin: -1 * $input-border;

.input {
  font-family: 'Arial';
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  border: none;
  outline: 0;
  padding: 0.4rem;
  border-bottom: $input-border solid #665558;
}
.underline {
  margin-top: $underline-margin;
}
</style>
