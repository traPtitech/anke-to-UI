<template>
  <div
    v-for="(questionnaire, index) in data.questionnaires"
    :key="index"
    :class="$style.container"
  >
    <div :class="$style.tableItemTitle">
      <icon name="open-in-new" :class="$style.icon" />
      <router-link
        :to="'/questionnaires/' + questionnaire.questionnaireID"
        :class="$style.link"
        >{{ questionnaire.title }}</router-link
      >
    </div>
    <div :class="$style.tableItemDescription">
      <p>{{ questionnaire.description }}</p>
    </div>
    <div>
      <div :class="$style.tableItemDate">
        <div :class="$style.columnLimit">
          回答期限: {{ questionnaire.res_time_limit }}
        </div>
        <div :class="$style.columnModified">
          更新日: {{ questionnaire.modified_at }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'CardContentDetail',
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
.container {
  padding: 1rem;
  border-bottom: solid 1.5px #d9d9d9;
  .tableItemTitle {
    min-width: 10em;
    text-align: left;
    padding-bottom: 0.8em;
    font-size: 15pt;
  }
  .tableItemDescription {
    min-width: 8em;
    text-align: left;
    padding-bottom: 0.8em;
    word-break: break-all;
  }
  .tableItemDate {
    text-align: left;
    min-width: 5em;
    padding-top: 0.8em;
  }
}

.columnLimit {
  padding: 0;
  margin-right: 100px;
  margin-left: 24px;
  margin-bottom: 0;
  display: inline-block;
}
.columnModified {
  padding: 0;
  margin-left: 24px;
  margin-bottom: 0;
  display: inline-block;
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
