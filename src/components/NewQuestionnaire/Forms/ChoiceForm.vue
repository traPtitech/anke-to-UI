<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <div v-for="(label, i) in choiceQuestions" :key="i">
        <QuestionUpdown
          :index="i"
          :max="choiceQuestions.length"
          @swap="swapChoice"
        />
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
      <span :class="$style.newchoice" @click="addChoice">
        <Icon name="plus-circle-outline" />新しい選択肢を追加
      </span>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import QuestionForm from './QuestionForm.vue'
import ChoiceElement from './ChoiceElement.vue'
import Icon from '../../UI/Icon.vue'
import QuestionUpdown from './QuestionUpdown.vue'
import { CheckboxQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    ChoiceElement,
    QuestionUpdown,
    Icon
  },
  props: {
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
    update: (question: CheckboxQuestion) => true
  },
  setup(props, context) {
    const choiceQuestions = computed(() => props.questionData.options)
    const updateChoiceQuestionData = updateQuestionData<CheckboxQuestion>(
      props,
      context
    )
    const updateQuestionName = (name: string) => {
      updateChoiceQuestionData('body', name)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateChoiceQuestionData('is_required', required)
    }

    const updateChoice = (label: string, index: number) => {
      const tmp = [...ChoiceQuestions.value]
      tmp[index] = label
      updateChoiceQuestionData('options', tmp)
    }

    const deleteChoice = (index: number) => {
      const tmp = [...ChoiceQuestions.value]
      tmp.splice(index, 1)
      updateChoiceQuestionData('options', tmp)
    }

    const addChoice = () => {
      const tmp = [...ChoiceQuestions.value]
      tmp.push('')
      updateChoiceQuestionData('options', tmp)
    }

    const swapChoice = (index1: number, index2: number) => {
      const tmp = [...ChoiceQuestions.value]
      const mom = tmp[index1]
      tmp[index1] = tmp[index2]
      tmp[index2] = mom
      updateChoiceQuestionData('options', tmp)
    }

    return {
      choiceQuestions,
      updateQuestionName,
      updateQuestionRequired,
      updateChoice,
      deleteChoice,
      addChoice,
      swapChoice
    }
  }
})
</script>

<style lang="scss" module>
.newchoice {
  cursor: pointer;
}
</style>
