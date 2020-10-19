<template>
  <div
    v-for="(questionnaire, index) in data.questionnaires"
    :key="index"
    :class="$style.container"
  >
    <CardTitle
      :id="questionnaire.questionnaireID"
      :title="questionnaire.title"
    ></CardTitle>
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
import { defineComponent, reactive } from 'vue'
import CardTitle from '/@/components/UI/CardTitle.vue'

export default defineComponent({
  name: 'CardContentDetail',
  components: {
    CardTitle
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
          is_targeted: true,
          description: 'mijikai'
        },
        {
          questionnaireID: 2,
          title: 'こんばんは',
          res_time_limit: '2020-12-31',
          created_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true,
          description:
            'nagaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
        },
        {
          questionnaireID: 3,
          title: 'こんにちは',
          res_time_limit: '2020-12-31',
          created_at: '2020-1-1',
          modified_at: '2020-1-1',
          res_shared_to: 'public',
          is_targeted: true,
          description: 'あいうえおかきくけこさしすせそ'
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
  margin-bottom: 0.8em;
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
