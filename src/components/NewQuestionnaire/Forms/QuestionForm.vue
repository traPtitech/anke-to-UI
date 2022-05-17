<template>
  <div>
    <QuestionTitle v-model="questionName" />
    <QuestionCheckbox
      v-model="questionIsRequired"
      :contents="[REQUIRED_LABEL]"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import QuestionTitle from './QuestionTitle.vue'
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
    const questionName = ref(props.name)
    // todo: ここでQuestionのCheckboxを使っていいか考える
    const questionIsRequired = ref<string[]>([])
    if (props.isRequired) {
      questionIsRequired.value.push(REQUIRED_LABEL)
    }

    watch(questionName, newName => {
      questionName.value = newName
      context.emit('update:name', newName)
    })
    watch(
      () => [...questionIsRequired.value],
      newIsRequired => {
        context.emit('update:required', newIsRequired.length === 1)
      }
    )

    return {
      questionName,
      questionIsRequired,
      REQUIRED_LABEL
    }
  }
})
</script>

<style lang="scss" module></style>
