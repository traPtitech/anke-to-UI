<template>
  <tr
    v-for="(questionnaire, index) in data.questionnaires"
    :key="index"
    :class="$style.body"
  >
    <td :class="$style.tableItemTitle">
      <router-link :to="'/questionnaires/' + questionnaire.questionnaireID">
        {{ questionnaire.title }}
      </router-link>
    </td>
    <td :class="$style.tableItemDate">
      {{ questionnaire.res_time_limit }}
    </td>
    <td :class="$style.tableItemDate">
      {{ questionnaire.submitted_at }}
    </td>
    <!-- response.submitted_at == 'NULL' | '未提出'  のときに {データをもう一度確認してくる | このテーブルを移さないようにする}-->
    <td :class="$style.tableItemDate">
      {{ questionnaire.modified_at }}
    </td>
    <td :class="$style.myAnswer">
      <router-link
        :to="'/responses/' + questionnaire.questionnaireID"
        :class="$style.link"
      >
        <icon name="open-in-new" :class="$style.icon" />
        <span>Open</span>
      </router-link>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'ResponsesTable',
  components: {
    Icon
  },
  setup() {
    const data = reactive({
      questionnaires: [
        {
          questionnaireID: 1,
          title: 'こんにちは',
          res_time_limit: '2020-12-31',
          submitted_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        },
        {
          questionnaireID: 2,
          title: 'こんばんは',
          res_time_limit: '2020-12-31',
          submitted_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        },
        {
          questionnaireID: 3,
          title:
            '長いversionーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー',
          res_time_limit: '2020-12-31',
          submitted_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        }
      ]
    })
    return {
      data
    }
  }
})
</script>

<style lang="scss" module>
td {
  vertical-align: middle;
  font-size: 0.7em;
}
.body {
  min-width: 12em;
  font-size: 1.4em;
  border-bottom: solid 1.5px #d9d9d9;
  &:nth-child(even) {
    background-color: #fafafa;
  }
}
.table-item-title {
  min-width: 8em;
  max-width: 15em;
  text-align: left;
  padding: 0.4em 0em 1.8em 0.8em;
}
.table-item-date {
  min-width: 6em;
  max-width: 9em;
  padding-left: 0.4em 0em;
  text-align: center;
}
.my-answer {
  text-align: middle;
  min-width: 4em;
  max-width: 6em;
  padding: 0em 0.6em;
  .icon {
    height: 1em;
    width: 1em;
  }
}
</style>
