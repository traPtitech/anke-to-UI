<template>
  <div>
    <Button
      text="回答する"
      :to="'/responses/new/' + questionnaire.questionnaireID"
      :show-icon="false"
    />
    <Button
      :text="'結果を見る'"
      :to="'/results/' + questionnaire.questionnaireID"
      :is-secondary="true"
      :show-icon="false"
    />
    <div>回答期限 : {{ getTimeLimit(questionnaire.res_time_limit) }}</div>
    <div>公開範囲 : {{ questionnaire.res_shared_to }}</div>
    <!-- <div>
      <input type="url" :value="questionnaireLink" readonly />
      <span><button @click="linkCopy()">リンクコピー</button></span>
      <p v-if="isLinkCopied === true">リンクコピーされました</p>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { QuestionnaireByID } from '/@/lib/apis'
import Button from '/@/components/UI/Button.vue'
import { getTimeLimit } from '/@/components/Explorer/use/useOptions'

export default defineComponent({
  name: 'Manipulation',
  components: { Button },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    }
  },
  setup(props) {
    const questionnaireLink = ref(
      `https://anke-to.trap.jp/responses/new/${props.questionnaire.questionnaireID}`
    )
    const isLinkCopied = ref(false)
    const linkCopy = () => {
      navigator.clipboard.writeText(questionnaireLink.value)
      isLinkCopied.value = true
      setTimeout(() => (isLinkCopied.value = false), 1000)
    }
    return {
      questionnaireLink,
      linkCopy,
      isLinkCopied,
      getTimeLimit
    }
  }
})
</script>
