<template>
  <table :class="$style.table">
    <tbody>
      <tr
        v-for="(questionnaire, index) in data.questionnaires"
        :key="index"
        :class="$style.body"
      >
        <td :class="$style.tableItemTitle">
          <router-link
            :to="'/questionnaires/' + questionnaire.questionnaireID"
            >{{ questionnaire.title }}</router-link
          >
        </td>
        <td :class="$style.tableItemDate">
          {{ questionnaire.res_time_limit }}
        </td>
        <td :class="$style.tableItemDate">
          {{ questionnaire.submitted_at }}
        </td>
        <!-- response.submitted_at == 'NULL' | '未提出'  のときに {データをもう一度確認してくる | このテーブルを移さないようにする}-->
        <td>
          {{ questionnaire.modified_at }}
        </td>
        <td :class="$style.myAnswer">
          <router-link
            :to="'/responses/' + questionnaire.questionnaireID"
            :class="$style.link"
          >
            <icon name="open-in-new" :class="$style.icon" />
            <p>Open</p>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
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
          title: '長いversionーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー',
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
.table {
  border: solid 1.5px #d9d9d9;
  .body {
    min-width: 12em;
    font-size: 1.5em;
  }
  .table-item-title {
    min-width: 10em;
    text-align: left;
    padding-left: 0.8em;
  }
  .table-item-date {
    min-width: 8em;
    text-align: center;
  }
  .my-answer {
    vertical-align: middle;
    padding: 0.2em 0.8em;
    .icon {
      height: 1em;
      width: 1em;
    }
  }
}
</style>
