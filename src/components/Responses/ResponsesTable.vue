<template>
  <tr
    v-for="(responseSummary, index) in responseSummaries"
    :key="index"
    :class="$style.body"
  >
    <td :class="$style.tableItemTitle">
      <router-link
        :to="'/questionnaires/' + responseSummary.questionnaireID"
        :class="$style.link"
      >
        {{ responseSummary.questionnaire_title }}
      </router-link>
    </td>
    <td :class="$style.tableItemDate">
      {{
        responseSummary.res_time_limit == NULL
          ? 'なし'
          : responseSummary.res_time_limit
      }}
    </td>
    <td :class="$style.tableItemDate">
      {{
        responseSummary.submitted_at == NULL
          ? '未提出'
          : responseSummary.submitted_at
      }}
    </td>
    <!-- response.submitted_at == 'NULL' | '未提出'  のときに {データをもう一度確認してくる | このテーブルを移さないようにする}-->
    <td :class="$style.tableItemDate">
      {{ responseSummary.modified_at }}
    </td>
    <td :class="$style.myAnswer">
      <router-link
        :to="'/responses/' + responseSummary.responseID"
        :class="$style.link"
        target="_blank"
      >
        <icon name="open-in-new" :class="$style.icon" /><span>Open</span>
      </router-link>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'ResponsesTable',
  components: {
    Icon
  },
  props: {
    responseSummaries: {
      type: Array as PropType<ResponseSummary[]>,
      required: true
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
td {
  vertical-align: middle;
  font-size: 0.7em;
}
.body {
  min-width: 10em;
  font-size: 1.4em;
  border-bottom: solid 1.5px #d9d9d9;
  &:nth-child(even) {
    background-color: #fafafa;
  }
}
.table-item-title {
  min-width: 10em;
  text-align: left;
  padding: 0.4em 0em 1.8em 0.8em;
}
.table-item-date {
  min-width: 8em;
  font-size: 15px;
  padding: 0.4em 0em 1.8em 0.8em;
  text-align: center;
}
.link {
  cursor: pointer;
  color: #92413b;
  text-decoration: none;
  &:hover {
    color: #cfb998;
  }
}
.my-answer {
  text-align: middle;
  min-width: 4em;
  max-width: 6em;
  padding: 0.4em 0em 1.8em 0.8em;
  .icon {
    height: 1em;
    width: 1em;
  }
}
</style>
