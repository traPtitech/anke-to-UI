<template>
  <InputText
    :is-focus="true"
    :is-hover="false"
    :model-value="modelValue"
    @update:model-value="update"
  >
    <input-focus-underline :class="$style.focusunderline" />
    <div :class="$style.underline" />
    <div :class="$style.hideunderline" />
  </InputText>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import InputFocusUnderline from './InputFocusUnderline.vue'
import InputText from './InputText.vue'

export default defineComponent({
  name: 'InputTextNoBorder',
  components: {
    InputFocusUnderline,
    InputText
  },
  props: {
    placeholder: {
      type: String,
      required: true
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
    const model = computed(() => props.modelValue)

    return { update, model }
  }
})
</script>

<style lang="scss" module>
$input-border: 1px;
$underline-margin: -1 * $input-border;
.underline {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 1px;
  background-color: $ui-secondary;
  transition: 0.1s;
  transform: scaleX(0);
  input:hover + .focusunderline + & {
    transform: scaleX(1);
  }
  margin-top: $underline-margin;
}
.focusunderline {
  position: relative;
  z-index: 2;
  margin-top: $underline-margin;
}
.hideunderline {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 1px;
  background-color: $bg-secondary;
  margin-top: $underline-margin;
}
</style>
