<template>
  <label :class="$style.label">
    <div>
      <div
        :class="[isChecked ? $style.checkedcircle : '', $style.circle]"
      ></div>
      <div
        :class="[isChecked ? $style.checkedbackground : '', $style.background]"
      ></div>
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
    input: () => true
  },
  setup(props, context) {
    const onInput = () => {
      context.emit('input')
    }
    return { onInput }
  }
})
</script>

<style lang="scss" module>
.label {
  position: relative;
  width: 44px;
  height: 24px;
}
.input {
  position: absolute;
  display: none;
}
.background {
  width: 44px;
  height: 24px;
  border-radius: 160px;
  background-color: $ui-primary;
}
.checkedbackground {
  background-color: $accent-primary;
}
.circle {
  position: absolute;
  width: 16px;
  height: 16px;
  left: 6px;
  top: 4px;
  border-radius: 50%;
  background-color: $ui-white;
}
.checkedcircle {
  transform: translateX(16px);
}
</style>
