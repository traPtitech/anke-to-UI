<template>
  <label :class="$style.label">
    <div>
      <div :class="[isChecked ? $style.checkedcircle : '', $style.circle]" />
      <div
        :class="[isChecked ? $style.checkedbackground : '', $style.background]"
      />
      <input type="Checkbox" :class="$style.input" @click="onInput" />
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToggleSwitch',
  props: {
    isChecked: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggle: () => true
  },
  setup(props, context) {
    const onInput = () => {
      context.emit('toggle')
    }
    return { onInput }
  }
})
</script>

<style lang="scss" module>
.label {
  position: relative;
  width: 34px;
  height: 20px;
  cursor: pointer;
}
.input {
  display: none;
}
.background {
  width: 34px;
  height: 20px;
  border-radius: 10px;
  background-color: $ui-primary;
  opacity: 0.5;
  z-index: 0;
  transition: 0.1s;
}
.checkedbackground {
  background-color: $accent-primary;
  opacity: 1;
}
.circle {
  position: absolute;
  width: 16px;
  height: 16px;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  z-index: 1;
  background-color: $ui-white;
  transition: 0.1s;
}
.checkedcircle {
  transform: translateX(14px);
}
</style>
