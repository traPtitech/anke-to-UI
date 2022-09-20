<template>
  <td :class="$style.tableItemTitle">
    <router-link
      :to="'/questionnaires/' + questionnaire.questionnaireID"
      :class="$style.link"
      >{{ questionnaire.title }}</router-link
    >
  </td>
  <td :class="$style.tableItemDate">
    {{ getTimeLimit(questionnaire.res_time_limit) }}
  </td>
  <td :class="$style.tableItemDate">
    {{ getRelativeTime(questionnaire.modified_at) }}
  </td>
  <td :class="$style.tableItemDate">
    {{ getRelativeTime(questionnaire.created_at) }}
  </td>
  <td :class="$style.result">
    <router-link
      :to="'/results/' + questionnaire.questionnaireID"
      target="_blank"
      :class="$style.link"
    >
      <icon name="open-in-new" :class="$style.icon" />
      <p :class="$style.open">Open</p>
    </router-link>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Questionnaire } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import { getTimeLimit, getRelativeTime } from '/@/components/UI/use/useOptions'

export default defineComponent({
  name: 'QuestionnaireTableRow',
  components: {
    Icon
  },
  props: {
    questionnaire: {
      type: Object as PropType<Questionnaire>,
      required: true
    }
  },
  setup() {
    return { getTimeLimit, getRelativeTime }
  }
})
</script>

<style lang="scss" module>
.tableItemTitle {
  min-width: 10rem;
  text-align: left;
  padding-left: 0.8rem;
}
.tableItemDate {
  min-width: 8rem;
  padding-left: 0.8rem;
}
.result {
  text-align: left;
  padding: 0.2rem 0.8rem;
  .open {
    margin: 0;
  }
  .icon {
    height: 1rem;
    width: 1rem;
  }
}
.link {
  cursor: pointer;
  color: #92413b;
  text-decoration: none;
  &:hover {
    color: #cfb998;
  }
}
</style>
