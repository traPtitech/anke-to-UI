<template>
  <tr :class="$style.row">
    <td :class="$style.table_item_title">
      <router-link
        :to="'/questionnaires/' + questionnaire.questionnaireID"
        :class="$style.link"
        >{{ questionnaire.title }}</router-link
      >
    </td>
    <td :class="$style.table_item_date">
      {{ getTimeLimit(questionnaire.res_time_limit) }}
    </td>
    <td :class="$style.table_item_date">
      {{ getRelativeTime(questionnaire.modified_at) }}
    </td>
    <td :class="$style.table_item_date">
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
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Questionnaire } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import {
  getTimeLimit,
  getRelativeTime
} from '/@/components/Explorer/use/useOptions'

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
.row {
  border: solid 1.5px #d9d9d9;
  &:nth-child(odd) {
    background-color: #fafafa;
  }
}
.table_item_title {
  min-width: 10rem;
  text-align: left;
  padding-left: 0.8rem;
}
.table_item_date {
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
