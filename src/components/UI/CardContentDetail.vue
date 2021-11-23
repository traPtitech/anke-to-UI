<template>
  <div
    v-for="(questionnaire, index) in questionnaires"
    :key="index"
    :class="$style.container"
  >
    <LinkIconQuestion
      :id="questionnaire.questionnaireID"
      :title="questionnaire.title"
      :iconsize="24"
      :textsize="20"
      :status="questionnaire.has_response || questionnaire.all_responded"
    ></LinkIconQuestion>
    <div :class="$style.tableItemDescription">
      <p>{{ questionnaire.description }}</p>
    </div>
    <div :class="$style.tableItemDate">
      <div :class="$style.column">
        <div>回答期限: {{ questionnaire.res_time_limit }}</div>
        <div>更新日: {{ questionnaire.modified_at }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LinkIconQuestion from '/@/components/UI/LinkIconQuestion.vue'
import { Questionnaire } from '/@/lib/apis'

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
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  border-bottom: solid 1.5px #d9d9d9;
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.container:first-of-type {
  padding-top: 0;
}
.container:last-of-type {
  padding-bottom: 0;
  border: none;
}
.tableItemDescription {
  margin-bottom: 0.8rem;
  word-break: break-all;
}
.tableItemDate {
  padding-left: 24px;
}
.column {
  padding: 0;
  div:first-of-type {
    margin-right: 100px;
  }
  margin-bottom: 0;
  font-weight: 550;
  display: flex;
  align-items: center;
}
</style>
