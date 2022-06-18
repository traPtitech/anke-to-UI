<template>
  <label :class="$style.label">
    <div :class="$style.word">必答</div>
    <toggle-switch :is-checked="isChecked" @input="updateChecked" />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToggleSwitch from '/@/components/UI/ToggleSwitch.vue'

export default defineComponent({
  name: 'RequiredSwitch',
  components: {
    ToggleSwitch
  },
  props: {
    isChecked: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:checked': (checked: boolean) => true
  },
  setup(props, context) {
    const updateChecked = (checked: boolean) => {
      context.emit('update:checked', checked)
    }
    return { updateChecked }
  }
})
</script>

<style lang="scss" module>
.label {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
</style>
