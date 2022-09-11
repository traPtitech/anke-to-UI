<template>
  <input-base-with-underline>
    <input-base
      :is-focus="true"
      :is-hover="false"
      :model-value="modelValue"
      @update:model-value="update"
    />
    <div :class="$style.underline" />
    <div :class="$style.hideunderline" />
  </input-base-with-underline>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputBaseWithUnderline from './InputBaseWithUnderline.vue'
import InputBase from './InputBase.vue'

export default defineComponent({
  name: 'InputTextNoBorder', //hoverでunderlineがでる
  components: {
    InputBaseWithUnderline,
    InputBase
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

    return { update }
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
  margin-top: $underline-margin;
  input:hover ~ & {
    transform: scaleX(1);
  }
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
