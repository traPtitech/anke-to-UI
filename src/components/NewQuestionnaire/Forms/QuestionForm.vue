<template>
  <div>
    <QuestionTitle
      :model-value="questionName"
      @update:model-value="updateQuestionName"
    />
    <QuestionCheckbox
      :model-value="questionIsRequired"
      :contents="[REQUIRED_LABEL]"
      @update:model-value="updateQuestionIsRequired"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import QuestionTitle from '/@/components/UI/QuestionTitle.vue'
import QuestionCheckbox from '../../UI/QuestionCheckbox.vue'

export default defineComponent({
  name: 'QuestionForm',
  components: {
    QuestionTitle,
    QuestionCheckbox
  },
  props: {
    name: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:name': (v: string) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:required': (v: boolean) => true
  },
  setup(props, context) {
    const REQUIRED_LABEL = '必須'
    const questionName = computed(() => props.name)
    // todo: ここでQuestionのCheckboxを使っていいか考える
    const questionIsRequired = computed(() => {
      if (props.isRequired) {
        return [REQUIRED_LABEL]
      } else {
        return []
      }
    })

    const updateQuestionName = (newName: string) => {
      context.emit('update:name', newName)
    }
    const updateQuestionIsRequired = (newIsRequired: string[]) => {
      context.emit('update:required', newIsRequired.length === 1)
    }

    return {
      REQUIRED_LABEL,
      questionName,
      questionIsRequired,
      updateQuestionName,
      updateQuestionIsRequired
    }
  }
})
</script>

<style lang="scss" module></style>
