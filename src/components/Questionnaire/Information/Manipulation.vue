<template>
  <Card :class="$style.card">
    <template #header>操作</template>
    <template #content>
      <div>
        <router-link :to="'/responses/new/' + questionnaire.questionnaireID"
          >回答する</router-link
        >
      </div>
      <div>
        <input type="url" :value="questionnaireLink" readonly />
        <span><button @click="LinkCopy()">リンクコピー</button></span>
        <p v-if="linkcopy == true">リンクコピーされました</p>
      </div>
      <div>
        <router-link :to="'/results/' + questionnaire.questionnaireID"
          >結果を見る</router-link
        >
      </div>
      <div><button>アンケートを締め切る</button></div>
      <div><button>アンケートを削除</button></div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import { QuestionnaireByID } from '/@/lib/apis'

export default defineComponent({
  name: 'Manipulation',
  components: { Card },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    }
  },
  setup(props) {
    const questionnaireLink =
      'https://anke-to.trap.jp/responses/new/' +
      props.questionnaire.questionnaireID
    let linkcopy = false
    const LinkCopy = function () {
      navigator.clipboard.writeText(questionnaireLink)
    }
    const message = function () {
      setTimeout(mmm, 3000)
    }
    const mmm = function () {
      linkcopy = true
    }
    return { questionnaireLink, LinkCopy, message, linkcopy }
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  padding: 1rem;
}
</style>
