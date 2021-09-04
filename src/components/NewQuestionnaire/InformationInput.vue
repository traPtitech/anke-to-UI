<template>
  <input
    type="text"
    placeholder="タイトル"
    :class="$style.input"
    @input="update"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InformationInput',
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

    return { update }
  }
})
</script>

<style lang="scss" module>
$input-margin: 0.1rem;

.input {
  box-sizing: border-box;
  width: calc(100% - 2 * #{$input-margin});
  font-size: 2rem;
  outline: none;
  border: 0.1rem solid #aaaaaa;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.1rem 0.1rem #00000010;
  padding: 1rem;
  margin: $input-margin;
  transition: 0.2s;
  &:focus {
    box-shadow: 0 0 0.1rem 0.1rem #7c6c4d;
  }
}
</style>
