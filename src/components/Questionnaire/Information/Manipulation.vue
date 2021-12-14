<template>
  <Card>
    <template #header>操作</template>
    <template #content>
      <div>
        <router-link :to="'/responses/new/' + questionnaire.questionnaireID"
          >回答する</router-link
        >
      </div>
      <div>
        <input type="url" :value="questionnaireLink" readonly />
        <span
          ><button
            @click="
              linkcopy = true;
              LinkCopy()
            "
          >
            リンクコピー
          </button></span
        >
        <p v-if="linkcopy === true">リンクコピーされました</p>
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
import { defineComponent, PropType, ref } from 'vue'
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
    const questionnaireLink = `https://anke-to.trap.jp/responses/new/${props.questionnaire.questionnaireID}`
    const linkcopy = ref(false)
    const LinkCopy = () => {
      navigator.clipboard.writeText(questionnaireLink)
    }
    return { questionnaireLink, LinkCopy, linkcopy }
  }
})
</script>
