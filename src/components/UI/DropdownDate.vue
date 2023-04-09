<template>
  <div :class="$style.dropdown">
    <input
      :class="[disabled ? $style.disabled : '', $style.date]"
      :type="isDate ? 'date' : 'time'"
      :value="modelValue"
      :min="isDate ? minDate : ''"
      :disabled="disabled"
      @input="change"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownDate',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    isDate: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(props, context) {
    const minDate = new Date().toISOString().substring(0, 10)
    const change = (e: Event) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return { minDate, change }
  }
})
</script>

<style lang="scss" module>
.date {
  display: block;
  margin-right: 0;
  margin-left: auto;
  @include size-body;
  text-align: left;
  background-color: $bg-secondary;
  outline: none;
  border: solid 0.1rem $border;
  border-radius: 0.25rem;
  padding: 0;
  cursor: pointer;
  padding: 0.25rem 0.5rem 0.25rem 1rem;
  &:hover {
    background-color: $bg-secondary-highlight;
  }
}
.disabled {
  background-color: $bg-secondary-highlight;
  pointer-events: none;
}
</style>
