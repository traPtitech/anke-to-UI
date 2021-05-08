<template>
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
      responseSummary.res_time_limit === null
        ? 'なし'
        : responseSummary.res_time_limit
    }}
  </td>
  <td :class="$style.tableItemDate">
    {{
      (responseSummary.submitted_at === null
        ? (responseSummary.submitted_at = '未提出')
        : getMyResponses,
      responseSummary.submitted_at)
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'ResponsesTableRow',
  components: {
    Icon
  },
  props: {
    responseSummary: {
      type: Array as PropType<ResponseSummary[]>,
      required: true
    },
    getMyResponses: {
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
  font-size: 0.7rem;
}
.table-item-title {
  word-break: break-all;
  text-align: left;
  padding: 0.8rem;
}
.table-item-date {
  font-size: 15px;
  padding: 0.8rem;
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
  max-width: 6rem;
  padding: 0.8rem;
  .icon {
    height: 1rem;
    width: 1rem;
  }
}
</style>
