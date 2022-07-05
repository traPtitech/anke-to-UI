<template>
  <div>
    <input
      v-if="isFocus"
      v-focus
      type="text"
      :class="$style.input"
      :placeholder="placeholder"
      :value="model"
      @input="update"
    />
    <input
      v-else
      type="text"
      :class="$style.input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="update"
    />
    <input-focus-underline :class="$style.focusunderline" />
    <div :class="$style.underline" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import InputFocusUnderline from './InputFocusUnderline.vue'

export default defineComponent({
  name: 'InputText',
  components: {
    InputFocusUnderline
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    isFocus: {
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
    const model = computed(() => props.modelValue)

    return { update, model }
  }
})
</script>

<style lang="scss" module>
$input-border: 1px;
$underline-margin: -1 * $input-border;
.input {
  padding: 4px 8px;
  width: 100%;
  height: 32px;
  @include size-body;
  color: $ui-primary;
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 0.1s;
  &::placeholder {
    padding: 4px 8px;
    width: 100%;
    height: 24px;
    @include size-body-small;
    color: $ui-secondary;
  }
  &:focus {
    background-color: $bg-secondary-highlight;
  }
}
.underline {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 1px;
  background-color: $ui-secondary;
  transform: scaleX(0);
  input:hover + .focusunderline + & {
    transform: scaleX(1);
  }
  margin-top: $underline-margin;
}

.focusunderline {
  position: relative;
  z-index: 1;
  margin-top: $underline-margin;
}
</style>
