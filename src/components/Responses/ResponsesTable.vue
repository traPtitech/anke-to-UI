<template>
  <table :class="$style.table">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(response, index) in data.responses"
        :key="index"
        :class="$style.header"
      >
        <td :class="$style.table - item - title">
          <router-link :to="'/questionnaires/' + response.questionnaireID">{{
            response.title
          }}</router-link>
        </td>
        <td :class="$style.table - item - date">
          {{ response.res_time_limit }}
        </td>
        <td :class="$style.table - item - date">{{ response.submitted_at }}</td>
        <!-- response.submitted_at == 'NULL' | '未提出'  のときに {データをもう一度確認してくる | このテーブルを移さないようにする}-->
        <td :class="$style.table - item - date">{{ response.modified_at }}</td>
        <td :class="$style.table - item - myAnswer">
          <router-link
            :to="'/responses/' + response.responseID"
            target="_blank"
          >
            <icon name="mdi-open-in-new" />
            <br />Open
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
    const headers = [
      'anke-to_title',
      '回答期限',
      '回答日時',
      '更新日時',
      '回答'
    ]
    const data = reactive({
      responses: [
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
        }
      ]
    })
    return {
      headers,
      data
    }
  }
})
</script>

<style lang="scss" module>
td {
  vertical-align: middle;
  font-size: 0.9em;
}
.header {
  min-width: 12em;
  font-size: 1.5em;
}
.table-item-title {
  min-width: 10em;
  font-size: 1em;
}
.table-item-date {
  min-width: 8em;
  text-align: center;
}
.table-item-myAnswer {
  vertical-align: middle;
  .icon {
    height: 1em;
  }
}
</style>
