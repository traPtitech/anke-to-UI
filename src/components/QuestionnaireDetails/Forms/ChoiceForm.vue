<template>
  <QuestionForm
    :name="questionData.name"
    :is-required="questionData.required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <div v-for="(label, i) in questionData.contents" :key="i">
        <ChoiceElement
          :label="label"
          :index="i"
          :is-radio="isRadio"
          @update:label="updateChoice"
          @delete="deleteChoice"
        />
      </div>
    </div>
    <div>
      <span @click="addChoice">
        <Icon name="plus-circle-outline" />新しい選択肢を追加
      </span>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionForm from './QuestionForm.vue'
import ChoiceElement from './ChoiceElement.vue'
import Icon from '../../UI/Icon.vue'
import { CheckboxQuestion } from '../use/utils'

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    ChoiceElement,
    Icon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    questionData: {
      type: Object as PropType<CheckboxQuestion>,
      required: true
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: CheckboxQuestion, index: number) => true
  },
  setup(props, context) {
    const updateQuestionName = (name: string) => {
      const newData = { ...props.questionData, name }
      context.emit('update', newData, props.index)
    }
    const updateQuestionRequired = (required: boolean) => {
      const newData = { ...props.questionData, required }
      context.emit('update', newData, props.index)
    }

    const updateChoice = (label: string, index: number) => {
      const newData = { ...props.questionData }
      newData.contents = [...props.questionData.contents]
      newData.contents[index] = label
      context.emit('update', newData, props.index)
    }

    const deleteChoice = (label: string, index: number) => {
      const newData = { ...props.questionData }
      newData.contents = [...props.questionData.contents]
      newData.contents.splice(index, 1)
      context.emit('update', newData, props.index)
    }

    const addChoice = () => {
      const newData = { ...props.questionData }
      newData.contents = [...props.questionData.contents]
      newData.contents.push('')
      context.emit('update', newData, props.index)
    }

    return {
      updateQuestionName,
      updateQuestionRequired,
      updateChoice,
      deleteChoice,
      addChoice
    }
  }
})
</script>
