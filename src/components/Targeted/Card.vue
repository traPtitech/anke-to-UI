<template>
  <tr
    v-for="(questionnaire, index) in data.questionnaires"
    :key="index"
    :class="$style.body"
  >
    <div :class="$style.table_item_title">
      <icon name="open-in-new" :class="$style.icon" />
      <router-link
        :to="'/questionnaires/' + questionnaire.questionnaireID"
        :class="$style.link"
        >{{ questionnaire.title }}</router-link
      >
    </div>
    <div :class="$style.table_item_description">
      <p>{{ questionnaire.description }}</p>
    </div>
    <div class="media">
      <div :class="$style.table_item_date">
        <th class="content column res-time-limit">
          回答期限: {{ questionnaire.res_time_limit }}
        </th>
        <th class="content column modified-at">
          更新日: {{ questionnaire.modified_at }}
        </th>
      </div>
    </div>
  </tr>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Card',
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
.body {
  border: solid 1.5px #d9d9d9;
  .table_item_title {
    min-width: 10em;
    text-align: left;
    padding-top: 0.8em;
    padding-left: 0.8em;
    font-size: 15pt;
  }
  .table_item_description {
    min-width: 8em;
    text-align: left;
    padding-left: 1.6em;
    padding-right: 1.6em;
    padding-bottom: 0.8em;
    word-break: break-all;
  }
  .table_item_date {
    min-width: 8em;
    padding-left: 0.8em;
    padding-bottom: 0.8em;
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
