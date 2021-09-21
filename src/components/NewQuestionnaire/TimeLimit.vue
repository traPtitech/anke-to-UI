<template>
  <div :class="$style.container">
    <QuestionCheckbox
      v-model="checked"
      :contents="checkboxContents"
      :class="$style.checkbox"
    />
    <div :class="[$style.timeLimit, !hasTimeLimit ? $style.hidden : '']">
      <span>回答期限</span>
      <DatePicker v-model="date" mode="dateTime">
        <template #default="{ inputValue, inputEvents }">
          <input
            v-if="hasTimeLimit"
            :value="inputValue"
            :class="$style.input"
            v-on="inputEvents"
          />
          <input v-else :value="inputValue" :class="$style.input" readonly />
        </template>
      </DatePicker>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { DatePicker } from 'v-calendar'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'

export default defineComponent({
  name: 'TimeLimit',
  components: {
    DatePicker,
    QuestionCheckbox
  },
  props: {
    modelValue: {
      type: Object as PropType<Date>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (v: Date) => true
  },
  setup(props, context) {
    const checked = ref<string[]>([])
    const checkboxContents = ['期限なし']
    const hasTimeLimit = computed(() => {
      return !checked.value.includes('期限なし')
    })

    const date = computed({
      get: () => props.modelValue,
      set: (v: Date) => context.emit('update:modelValue', v)
    })

    return {
      checked,
      checkboxContents,
      hasTimeLimit,
      date
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.checkbox {
  padding-right: 9rem;
}
.timeLimit {
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 0.2s;
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;
}
.hidden {
  opacity: 0.5;
}
.input {
  outline: none;
  border: 0.1rem solid #d9d9d9;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
}
</style>
