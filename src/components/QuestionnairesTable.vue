<template>
  <div>
    <table :class="$style.table">
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          :class="$style.header"
        >
          {{ header }}
        </th>
      </tr>
      <tr
        v-for="(questionnaire, index) in data.questionnaires"
        :key="index"
        :class="$style.body"
      >
        <td :class="$style.table_item_title">
          <router-link
            :to="'/questionnaires/' + questionnaire.questionnaireID"
            :class="$style.link"
            >{{ questionnaire.title }}</router-link
          >
        </td>
        <td :class="$style.table_item_date">
          {{ questionnaire.res_time_limit }}
        </td>
        <td :class="$style.table_item_date">{{ questionnaire.modified_at }}</td>
        <td :class="$style.table_item_date">{{ questionnaire.created_at }}</td>
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
    </table>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default {
  name: 'QuestionnairesTable',
  components: {
    icon: Icon
  },
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

<style lang="scss" module>
.table {
  width: 100%;
  max-width: fit-content;
  margin: 1em 0;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
.header {
  padding: 0.4em 0;
}
.body {
  border: solid 1.5px #d9d9d9;
  &:nth-child(odd) {
    background-color: #fafafa;
  }
  .table_item_title {
    min-width: 10em;
    text-align: left;
    padding-left: 0.8em;
  }
  .table_item_date {
    min-width: 8em;
    padding-left: 0.8em;
  }
  .result {
    text-align: left;
    padding: 0.2em 0.8em;
    .open {
      margin: 0;
    }
    .icon {
      height: 1em;
      width: 1em;
    }
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
