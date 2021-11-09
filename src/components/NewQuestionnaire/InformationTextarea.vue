<template>
  <textarea
    type="text"
    placeholder="説明"
    :class="$style.textarea"
    :value="modelValue"
    @keydown="resize"
    @input="update"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resize } from '/@/components/UI/use/question'

export default defineComponent({
  name: 'InformationTextarea',
  props: {
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
    const update = (e: InputEvent) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return { resize, update }
  }
})
</script>

<style lang="scss" module>
@import '/@/index.scss';

$textarea-margin: 2rem;

.textarea {
  box-sizing: border-box;
  width: calc(100% - #{$textarea-margin} * 2);
  font-size: 1rem;
  border: 0.1rem solid $color-input-border;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.1rem 0.1rem $color-input-box-shadow;
  outline: none;
  resize: none;
  padding: 0.5rem;
  margin: 1rem $textarea-margin;
  transition: 0.2s;
  &:focus {
    box-shadow: 0 0 0.1rem 0.1rem $color-input-focus;
  }
}
</style>
