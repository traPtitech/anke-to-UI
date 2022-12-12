<template>
  <div
    v-for="(questionnaire, index) in questionnaires"
    :key="index"
    :class="$style.container"
  >
    <router-link
      :class="$style.table_item"
      :to="`/questionnaires/${questionnaire.questionnaireID}`"
    >
      <div :class="$style.questionnaire">
        <div :class="$style.content">
          <LinkIconQuestion
            :id="questionnaire.questionnaireID"
            :title="questionnaire.title"
            :iconsize="24"
            :is-responded="isResponded(questionnaire)"
            :with-icon="!!isResponded(questionnaire)"
          />
          <div :class="$style.column">
            <div :class="$style.res_time_limit">
              回答期限: {{ getTimeLimit(questionnaire.res_time_limit) }}
            </div>
            <div :class="$style.modified_at">
              更新日: {{ getRelativeTime(questionnaire.modified_at) }}
            </div>
            <div>
              {{ questionnaire.description }}
            </div>
          </div>
        </div>
        <Icon :name="'chevron-right'" />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LinkIconQuestion from '/@/components/UI/LinkIconQuestion.vue'
import Icon from '/@/components/UI/Icon.vue'
import type {
  QuestionnaireForList,
  QuestionnaireMyAdministrates,
  QuestionnaireMyTargeted
} from '/@/lib/apis'
import { getTimeLimit, getRelativeTime } from './use/useOptions'

type Questionnaire =
  | QuestionnaireForList
  | QuestionnaireMyAdministrates
  | QuestionnaireMyTargeted

export default defineComponent({
  name: 'CardContentDetail',
  components: {
    LinkIconQuestion,
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
    return { getTimeLimit, getRelativeTime, isResponded }
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
}
.table_item {
  text-decoration: none;
  color: inherit;
}
.column {
  margin: 0.5rem 0;
  align-items: center;
  display: grid;
  @include size-body-small;
  grid-template-columns: 50%;
}
.res_time_limit {
  grid-row: 1/2;
  grid-column: 1/2;
  text-align: left;
}
.questionnaire {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content {
  flex-grow: 1;
}
.modified_at {
  grid-row: 1/2;
  grid-column: 2/3;
  text-align: left;
}
</style>
