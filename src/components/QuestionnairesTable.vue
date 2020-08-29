<template>
  <div>
    <table class="table">
      <tr class="header">
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
      <tr v-for="(questionnaire, index) in data.questionnaires" :key="index">
        <td class="table-item-title">
          <router-link
            :to="'/questionnaires/' + questionnaire.questionnaireID"
            class="link"
            >{{ questionnaire.title }}</router-link
          >
        </td>
        <td class="table-item-date">{{ questionnaire.res_time_limit }}</td>
        <td class="table-item-date">{{ questionnaire.modified_at }}</td>
        <td class="table-item-date">{{ questionnaire.created_at }}</td>
        <td class="result">
          <router-link
            :to="'/results/' + questionnaire.questionnaireID"
            target="_blank"
            class="link"
          >
            <span class="ti-new-window"></span>
            <p>Open</p>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'QuestionnairesTable',
  setup() {
    const data = reactive({
      questionnaires: [
        {
          questionnaireID: 1,
          title: 'こんにちは',
          res_time_limit: '2020-12-31',
          created_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        },
        {
          questionnaireID: 2,
          title: 'こんばんは',
          res_time_limit: '2020-12-31',
          created_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true
        }
      ]
    })

    const headers = ['', '回答期限', '更新日時', '作成日時', '結果']

    return {
      data,
      headers
    }
  }
}
</script>

<style lang="scss">
table {
  width: 100%;
  max-width: fit-content;
  margin: 1em 0;
  border: solid 1px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
th {
  padding: 0.4em 0;
}
td {
  padding-left: 0.8em;
}
tr {
  border: solid 1.5px #d9d9d9;
}
.header {
  border-bottom: solid 2px #d9d9d9;
}
.table-item-title {
  min-width: 10em;
  text-align: left;
}
.table-item-date {
  min-width: 8em;
}
.result {
  text-align: left;
  p {
    margin: 0;
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
