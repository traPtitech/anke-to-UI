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
$input-border: 1px;
$underline-margin: -1 * $input-border;
.input {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px;
  gap: 10px;
  width: 277px;
  height: 26px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: $ui-primary;
  box-sizing: border-box;
  border: none;
  outline: 0;
  border-bottom: $input-border solid $ui-secondary;
  &::placeholder {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 4px;
    gap: 10px;
    width: 277px;
    height: 26px;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: $ui-secondary;
  }
}
.underline {
  margin-top: $underline-margin;
}
</style>
