<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <div v-for="(label, i) in ChoiceQuestions" :key="i">
        <QuestionUpdown
          :index="i"
          :max="ChoiceQuestions.length"
          @swap="swapChoice"
        />
        <ChoiceElement
          :label="label"
          :index="i"
          :is-radio="isRadio"
          :model-value="questionData.options"
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
import { defineComponent, PropType, ref } from 'vue'
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
    const ChoiceQuestions = ref(props.questionData.options)
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
      ChoiceQuestions.value[index] = label
      updateChoiceQuestionData('options', ChoiceQuestions.value)
    }

    const deleteChoice = (index: number) => {
      ChoiceQuestions.value.splice(index, 1)
      updateChoiceQuestionData('options', ChoiceQuestions.value)
    }

    const addChoice = () => {
      ChoiceQuestions.value.push('')
      updateChoiceQuestionData('options', ChoiceQuestions.value)
    }

    const swapChoice = (index: number, parameter: number) => {
      const tmp = ChoiceQuestions.value[index]
      ChoiceQuestions.value[index] = ChoiceQuestions.value[index + parameter]
      ChoiceQuestions.value[index + parameter] = tmp
      updateChoiceQuestionData('options', ChoiceQuestions.value)
    }

    return {
      ChoiceQuestions,
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
