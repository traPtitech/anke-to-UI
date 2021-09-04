<template>
  <div :class="$style.container">
    <QuestionCheckbox
      v-model="checked"
      :contents="checkboxContents"
      :class="$style.checkbox"
    />
    <div :class="[$style.timeLimit, !shouldSetTimeLimit ? $style.hidden : '']">
      <span>回答期限</span>
      <DatePicker v-model="date">
        <template #default="{ inputValue, inputEvents }">
          <input
            :value="inputValue"
            :class="$style.input"
            :readonly="!shouldSetTimeLimit ? 'readonly' : ''"
            v-on="shouldSetTimeLimit ? inputEvents : ''"
          />
        </template>
      </DatePicker>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { DatePicker } from 'v-calendar'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'

export default defineComponent({
  name: 'TimeLimit',
  components: {
    DatePicker,
    QuestionCheckbox
  },
  setup() {
    const checked = ref<string[]>([])
    const checkboxContents = ['期限なし']
    const shouldSetTimeLimit = computed(() => {
      return !checked.value.includes('期限なし')
    })

    const date = new Date()

    return {
      checked,
      checkboxContents,
      shouldSetTimeLimit,
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
