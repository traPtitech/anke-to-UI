<template>
  <Select
    :contents="questionType"
    :model-value="modelValuetype"
    @update:model-value="update"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import Select from '/@/components/UI/Select.vue'
import { questionTypes, findQuestionTypes } from '../use/utils'
import { QuestionType } from '/@/lib/apis'

export default defineComponent({
  name: 'QuestionTypeSelect',
  components: {
    Select
  },
  props: {
    modelValue: {
      type: String as PropType<QuestionType>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:type': (type: QuestionType) => true
  },
  setup(props, context) {
    const questionType = [
      'テキスト',
      '数値',
      'チェックボックス',
      'ラジオボタン'
    ]
    const modelValuetype = computed(() => questionTypes[props.modelValue].label)
    const update = (type: string) => {
      context.emit('update:type', findQuestionTypes(type))
    }
    return { modelValuetype, questionType, update }
  }
})
</script>
