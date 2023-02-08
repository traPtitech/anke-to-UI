<template>
  <div
    v-for="(questionnaire, index) in questionnaires"
    :key="index"
    :class="$style.container"
  >
    <router-link
      :class="$style.table_item"
      :to="
        isResponseType(questionnaire)
          ? `/questionnaires/responses/${questionnaire.responseID}`
          : `/questionnaires/${questionnaire.questionnaireID}`
      "
    >
      <div :class="$style.questionnaire">
        <div :class="$style.content">
          <div v-if="!isResponseType(questionnaire)" :class="$style.title">
            {{ questionnaire.title }}
          </div>
          <div v-else :class="$style.title">
            {{ questionnaire.questionnaire_title }}
          </div>
          <div :class="$style.column">
            <div :class="$style.res_time_limit">
              回答期限: {{ getTimeLimit(questionnaire.res_time_limit) }}
            </div>
            <div
              v-if="isResponseType(questionnaire)"
              :class="$style.modified_answered_at"
            >
              回答日: {{ getRelativeTime(questionnaire.modified_at) }}
            </div>
            <div v-else :class="$style.modified_answered_at">
              更新日: {{ getRelativeTime(questionnaire.modified_at) }}
            </div>
          </div>
          <div :class="$style.description">
            {{ questionnaire.description }}
          </div>
        </div>
        <Icon :name="'chevron-right'" />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import type {
  QuestionnaireForList,
  QuestionnaireMyAdministrates,
  QuestionnaireMyTargeted,
  ResponseSummary
} from '/@/lib/apis'
import { getTimeLimit, getRelativeTime } from './use/useOptions'
type Questionnaire =
  | QuestionnaireForList
  | QuestionnaireMyAdministrates
  | QuestionnaireMyTargeted
  | ResponseSummary

export default defineComponent({
  name: 'CardContentDetail',
  components: {
    Icon
  },
  props: {
    questionnaires: {
      type: Array as PropType<Questionnaire[]>,
      required: true
    }
  },
  setup() {
    const isResponded = (questionnaire: Questionnaire) => {
      if ('has_response' in questionnaire) {
        return questionnaire.has_response
      }
      if ('all_responded' in questionnaire) {
        return questionnaire.all_responded
      }
    }
    const isResponseType = (
      questionnaire: Questionnaire
    ): questionnaire is ResponseSummary => {
      return 'responseID' in questionnaire
    }

    return {
      getTimeLimit,
      getRelativeTime,
      isResponded,
      isResponseType
    }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
  position: relative;
  transition: 0.2s;
  padding: 1rem;
  border-bottom: solid 1px $border;
  &:hover {
    background-color: $bg-secondary-highlight;
  }
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  &:last-child {
    border: none;
  }
  &:only-child {
    border-radius: 8px;
  }
}
.table_item {
  text-decoration: none;
  color: inherit;
}
.column {
  margin: 0.5rem 0;
  align-items: center;
  display: grid;
  @include size-body-small-3;
  grid-template-columns: 50%;
}
.title {
  @include weight-bold;
  @include size-head-small;
}
.res_time_limit {
  grid-row: 1/2;
  grid-column: 1/2;
  text-align: left;
}
.modified_answered_at {
  grid-row: 1/2;
  grid-column: 2/3;
  text-align: left;
}
.description {
  @include size-body-small-4;
}
.questionnaire {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content {
  flex-grow: 1;
}
</style>
