<template>
  <div>
    <div>
      <Icon name="chevron-up" />
      <Icon name="chevron-down" />
      <Icon name="delete" />
    </div>
    <div>
      <div>
        <QuestionInput v-model="questionName" />
        <QuestionCheckbox
          v-model="questionIsRequired"
          :contents="questionRequiredContent"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import QuestionInput from '../../UI/QuestionInput.vue'
import QuestionCheckbox from '../../UI/QuestionCheckbox.vue'
import Icon from '../../UI/Icon.vue'

const REQUIRED_LABEL = '必須'

export default defineComponent({
  name: 'QuestionForm',
  components: {
    QuestionInput,
    QuestionCheckbox,
    Icon
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
    const questionName = ref(props.name)
    const questionIsRequired = ref(props.isRequired ? [REQUIRED_LABEL] : [])

    watch(questionName, newName => context.emit('update:name', newName))
    watch(questionIsRequired, newIsRequired =>
      context.emit(
        'update:required',
        newIsRequired.length > 0 && newIsRequired[0] == REQUIRED_LABEL
      )
    )

    return {
      questionName,
      questionIsRequired,
      questionRequiredContent: [REQUIRED_LABEL]
    }
  }
})
</script>
