<template>
  <div
    v-for="(questionnaire, index) in questionnaires"
    :key="index"
    :class="$style.container"
    :href="'/questionnaires/' + questionnaire.questionnaireID"
  >
    <LinkIconQuestion
      :id="questionnaire.questionnaireID"
      :title="questionnaire.title"
      :iconsize="24"
      :textsize="20"
      :is-responded="questionnaire.has_response || questionnaire.all_responded"
    ></LinkIconQuestion>
    <div :class="$style.tableItemDescription">
      <p>{{ questionnaire.description }}</p>
    </div>
    <div :class="$style.column">
      <div :class="$style.resTimeLimit">
        回答期限: {{ getTimeLimit(questionnaire.res_time_limit) }}
      </div>
      <div :class="$style.modifiedAt">
        更新日: {{ getRelativeTime(questionnaire.modified_at) }}
      </div>
      <div :class="$style.tableItemDescription">
        {{ questionnaire.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LinkIconQuestion from '/@/components/UI/LinkIconQuestion.vue'
import { Questionnaire } from '/@/lib/apis'
import {
  getTimeLimit,
  getRelativeTime
} from '/@/components/Explorer/use/useOptions'

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
  padding: 1rem 1rem 0;
  &:hover {
    background-color: #f8f4f4;
    padding: -1rem;
    &:first-child {
      border-radius: 1rem 1rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 1rem 1rem;
    }
  }
}
.tableItemDescription {
  word-break: break-all;
}
.cardRow {
  border-bottom: solid 1px #b65e5e;
  padding-bottom: 1rem;
}
.column {
  margin: 0.5rem 0;
  align-items: center;
  display: grid;
  grid-template-columns: 50%;
}
.resTimeLimit {
  grid-row: 1/2;
  grid-column: 1/2;
  text-align: left;
}
.modifiedAt {
  grid-row: 1/2;
  grid-column: 2/3;
  text-align: left;
}
</style>
