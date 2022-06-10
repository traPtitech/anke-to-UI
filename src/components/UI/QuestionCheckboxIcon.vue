<template>
  <span :class="[disabled ? $style.disabledcheck : '', $style.check]">
    <icon
      v-if="!disabled"
      name="check"
      :class="[isChecked ? $style.checked : '', $style.icon]"
    />
  </span>
  <input type="checkbox" :class="$style.checkbox" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'Checkbox',
  components: {
    Icon
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      default: false
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
.check {
  display: inline-block;
  cursor: pointer;
  content: '';
  height: 1rem;
  width: 1rem;
  border: 1px solid $ui-primary;
  border-radius: 0.2rem;
}
.icon {
  opacity: 0;
  color: $ui-primary;
  height: 100%;
  width: 100%;
  transition: 0.2s;
}
.checked {
  opacity: 1;
}
.disabledcheck {
  cursor: not-allowed;
  background-color: rgb(239, 239, 239, 0.5);
}
.checkbox {
  appearance: none;
}
</style>
