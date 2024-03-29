<template>
  <template v-if="questionnaire">
    <div :class="$style.container">
      <Card>
        <template #content>
          <div :class="[$style.card, $style.right]">
            <div :class="$style.title">{{ questionnaire.title }}</div>
            <div :class="$style.discription">
              {{ questionnaire.description }}
            </div>
          </div>
        </template>
      </Card>
      <div v-for="(question, i) in questioncontents" :key="i">
        <InputQuestionCard
          v-if="
            question.question_type === QuestionType.Text ||
            question.question_type === QuestionType.TextArea ||
            question.question_type === QuestionType.Number
          "
          :title="question.body"
          :is-required="question.is_required"
          :question-type="question.question_type"
          :model-value="newResponses[i].response"
          @update="value => updateInput(i, value)"
        />
        <LinearScaleQuestionCard
          v-else-if="question.question_type === QuestionType.LinearScale"
          :title="question.body"
          :is-required="question.is_required"
          :left-label="question.scale_label_left"
          :right-label="question.scale_label_right"
          :scale-min="question.scale_min"
          :scale-max="question.scale_max"
          :model-value="newResponses[i].response"
          @update="value => updateLinearScale(i, value)"
        />
        <ChoiceQuestionCard
          v-else
          :title="question.body"
          :is-required="question.is_required"
          :question-type="question.question_type"
          :options="question.options"
          :model-value="newResponses[i].option_response"
          @update="choice => updateChoice(i, choice)"
        />
      </div>
    </div>
  </template>
  <template v-else> 読み込み中</template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import {
  QuestionDetails,
  QuestionnaireByID,
  QuestionType,
  ResponseBody
} from '/@/lib/apis'
import Card from '/@/components/UI/Card.vue'
import InputQuestionCard from './InputQuestionCard.vue'
import ChoiceQuestionCard from './ChoiceQuestionCard.vue'
import LinearScaleQuestionCard from './LinearScaleQuestionCard.vue'
import { createResponses } from './use/util'

export default defineComponent({
  name: 'NewResponses',
  components: {
    Card,
    InputQuestionCard,
    ChoiceQuestionCard,
    LinearScaleQuestionCard
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    questioncontents: {
      type: Array as PropType<QuestionDetails[]>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:responsebody': (value: ResponseBody[]) => true
  },
  setup(props, context) {
    const newResponses = ref(createResponses(props.questioncontents))
    const updateInput = (i: number, value: string) => {
      newResponses.value[i].response = value
    }
    const updateChoice = (i: number, option: string[]) => {
      newResponses.value[i].option_response = option
    }
    const updateLinearScale = (i: number, value: string) => {
      newResponses.value[i].response = value
    }
    watch(newResponses.value, () => {
      context.emit('update:responsebody', newResponses.value)
    })
    return {
      QuestionType,
      newResponses,
      updateInput,
      updateLinearScale,
      updateChoice
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card {
  display: flex;
  flex-direction: column;
}
.right {
  align-items: flex-start;
  gap: 8px;
}
.title {
  @include weight-bold;
  @include size-head;
  color: $ui-primary;
}
.description {
  @include size-body;
}
</style>
