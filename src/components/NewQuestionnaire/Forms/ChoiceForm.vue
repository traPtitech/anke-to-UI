<template>
  <QuestionForm
    :name="questionData.title"
    :is-required="questionData.isRequired"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div :class="$style.container">
      <div
        v-for="(label, i) in choiceQuestions"
        :key="i"
        :class="$style.element"
      >
        <QuestionUpdown
          :up-disable="i === 0"
          :down-disable="i === choiceQuestions.length - 1"
          @up="swapChoices(i, i - 1)"
          @down="swapChoices(i, i + 1)"
        />
        <ChoiceElement
          :label="label"
          :index="i"
          :is-radio="isRadio"
          :class="$style.choiceelement"
          @focusout="deletefocusout(i)"
          @update:label="text => updateChoice(text, i)"
          @delete="deleteChoice(i)"
        />
      </div>
    </div>
    <InputText
      :placeholder="'質問を追加'"
      :model-value="''"
      :class="$style.newchoice"
      @focusin="addChoice"
    />
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import QuestionForm from './QuestionForm.vue'
import ChoiceElement from './ChoiceElement.vue'
import QuestionUpdown from './QuestionUpdown.vue'
import { NewCheckboxQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'
import InputText from '/@/components/UI/InputText.vue'

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    ChoiceElement,
    QuestionUpdown,
    InputText
  },
  props: {
    questionData: {
      type: Object as PropType<NewCheckboxQuestion>,
      required: true
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: NewCheckboxQuestion) => true
  },
  setup(props, context) {
    const choiceQuestions = computed(() => props.questionData.options)
    const updateChoiceQuestionData = updateQuestionData<NewCheckboxQuestion>(
      props,
      context
    )
    const updateQuestionName = (name: string) => {
      updateChoiceQuestionData('title', name)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateChoiceQuestionData('isRequired', required)
    }
    const updateChoice = (label: string, index: number) => {
      const tmp = [...choiceQuestions.value]
      tmp[index] = label
      updateChoiceQuestionData('options', tmp)
    }

    const deleteChoice = (index: number) => {
      const tmp = [...choiceQuestions.value]
      tmp.splice(index, 1)
      updateChoiceQuestionData('options', tmp)
    }
    const addChoice = () => {
      const tmp = [...choiceQuestions.value]
      tmp.push('')
      updateChoiceQuestionData('options', tmp)
    }
    const swapChoices = (index1: number, index2: number) => {
      const tmp = [...choiceQuestions.value]
      const mom = tmp[index1]
      tmp[index1] = tmp[index2]
      tmp[index2] = mom
      updateChoiceQuestionData('options', tmp)
    }
    const deletefocusout = (index: number) => {
      if (props.questionData.options[index] === '') {
        deleteChoice(index)
      }
    }

    return {
      choiceQuestions,
      updateQuestionName,
      updateQuestionRequired,
      updateChoice,
      deleteChoice,
      addChoice,
      swapChoices,
      deletefocusout
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.element {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.choiceelement {
  flex-grow: 1;
}
.newchoice {
  cursor: pointer;
  padding: 0px 32px 0px 48px;
}
</style>
