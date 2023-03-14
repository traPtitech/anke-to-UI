<template>
  <ManipulationBase :title="'回答期限を設定する'">
    <template #title>
      <ToggleSwitch :is-checked="isChecked" @toggle="isChecked = !isChecked" />
    </template>
    <template #content>
      <div :class="$style.form">
        <DropdownDate
          v-model="date"
          :class="$style.date"
          :is-date="true"
          :disabled="!isChecked"
        />
        <DropdownDate
          v-model="time"
          :class="$style.time"
          :is-date="false"
          :disabled="!isChecked"
        />
      </div>
    </template>
  </ManipulationBase>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import ManipulationBase from './ManipulationBase.vue'
import ToggleSwitch from '../UI/ToggleSwitch.vue'
import DropdownDate from '../UI/DropdownDate.vue'

export default defineComponent({
  name: 'Deadline',
  components: {
    ManipulationBase,
    ToggleSwitch,
    DropdownDate
  },
  props: {
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
    const isChecked = ref(Boolean(props.modelValue))
    const date = ref(props.modelValue.substring(0, 10))
    const time = ref(props.modelValue.substring(11, 16))
    watchEffect(() => {
      if (isChecked.value) {
        context.emit('update:modelValue', `${date.value}T${time.value}:00.000Z`)
      } else {
        context.emit('update:modelValue', '')
      }
    })
    return { isChecked, date, time }
  }
})
</script>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: row;
}
.date {
  flex-grow: 3;
  margin-right: 0;
}
.time {
  flex-grow: 1;
}
</style>
