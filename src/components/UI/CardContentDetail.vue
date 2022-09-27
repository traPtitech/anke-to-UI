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
      <LinkIconQuestion
        :id="questionnaire.questionnaireID"
        :title="questionnaire.title"
        :iconsize="24"
        :textsize="20"
        :is-responded="
          questionnaire.has_response || questionnaire.all_responded
        "
      ></LinkIconQuestion>
      <div :class="$style.column">
        <div :class="$style.res_time_limit">
          回答期限: {{ getTimeLimit(questionnaire.res_time_limit) }}
        </div>
        <div :class="$style.modified_at">
          更新日: {{ getRelativeTime(questionnaire.modified_at) }}
        </div>
      </div>
      <div :class="$style.description">
        {{ questionnaire.description }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LinkIconQuestion from '/@/components/UI/LinkIconQuestion.vue'
import { Questionnaire } from '/@/lib/apis'
import { getTimeLimit, getRelativeTime } from './use/useOptions'

export default defineComponent({
  name: 'CardContentDetail',
  components: {
    LinkIconQuestion
  },
  props: {
    questionnaires: {
      type: Array as PropType<
        (Questionnaire & {
          has_response?: boolean
          all_responded?: boolean
        })[]
      >,
      required: true
    }
  },
  setup() {
    return { getTimeLimit, getRelativeTime }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: left;
  padding: 1rem;
  border-bottom: solid 1px $border;
  position: relative;
  transition: 0.2s;
  &:hover {
    background-color: $bg-secondary-highlight;
    &:first-child {
      border-radius: 8px 8px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
  &:last-child {
    border: none;
  }
}
.table_item {
  text-decoration: none;
  color: inherit;
}
.description {
  word-break: break-all;
}
.column {
  margin: 0.5rem 0;
  align-items: center;
  display: grid;
  grid-template-columns: 50%;
}
.res_time_limit {
  grid-row: 1/2;
  grid-column: 1/2;
  text-align: left;
}
.modified_at {
  grid-row: 1/2;
  grid-column: 2/3;
  text-align: left;
}
</style>
