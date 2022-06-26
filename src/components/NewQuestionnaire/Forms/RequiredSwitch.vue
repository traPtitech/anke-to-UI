<template>
  <label :class="$style.label">
    <div :class="$style.word">必答</div>
    <toggle-switch :is-checked="isChecked" @toggle="updateChecked" />
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
    'update:checked': (isChecked: boolean) => true
  },
  setup(props, context) {
    const updateChecked = () => {
      context.emit('update:checked', !props.isChecked)
    }
    return { updateChecked }
  }
})
</script>

<style lang="scss" module>
.label {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  gap: 8px;
}
.word {
  font-size: 14px;
  line-height: 21px;
}
</style>
