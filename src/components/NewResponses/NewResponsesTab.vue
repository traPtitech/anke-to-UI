<template>
  <template v-if="questionnaire">
    <div :class="$style.container">
      <Card :header-visible="false">
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
import { defineComponent, PropType, ref } from 'vue'
import { QuestionDetails, QuestionnaireByID, QuestionType } from '/@/lib/apis'
import Card from '/@/components/UI/Card.vue'
import InputQuestionCard from './InputQuestionCard.vue'
import ChoiceQuestionCard from './ChoiceQuestionCard.vue'
import { createResponses } from './use/util'

export default defineComponent({
  name: 'NewResponses',
  components: { Card, InputQuestionCard, ChoiceQuestionCard },
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
  setup(props) {
    const newResponses = ref(createResponses(props.questioncontents))
    const updateInput = (i: number, value: string) => {
      newResponses.value[i].response = value
    }
    const updateChoice = (i: number, option: string[]) => {
      newResponses.value[i].option_response = option
    }
    return { QuestionType, newResponses, updateInput, updateChoice }
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
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.right {
  align-items: flex-start;
  gap: 8px;
}
.title {
  @include font-head;
  color: $ui-primary;
}
.description {
  @include size-body;
}
</style>
