<template>
  <input
    :type="isNumber ? 'number' : 'text'"
    :class="$style.input"
    :placeholder="placeholder"
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
    placeholder: {
      type: String,
      required: true
    },
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
$underline-margin: -1px;
.input {
  padding: 4px;
  width: 100%;
  height: 26px;
  font-size: 16px;
  line-height: 18px;
  color: $ui-primary;
  box-sizing: border-box;
  border: none;
  outline: none;
  &::placeholder {
    padding: 6px 4px;
    width: 100%;
    height: 26px;
    font-size: 12px;
    line-height: 14px;
    color: $ui-secondary;
  }
}
.underline {
  margin-top: $underline-margin;
}
</style>
