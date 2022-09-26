<template>
  <div>
    <router-link
      v-if="isAdmin"
      :to="'questionnaires/' + questionnaire.questionnaireID + '/edit'"
      :class="$style.link"
    >
      管理者ページへ
      <icon name="chevron-right" :class="$style.icon" />
    </router-link>
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
import { defineComponent, PropType, ref, computed } from 'vue'
import { QuestionnaireByID } from '/@/lib/apis'
import Button from '/@/components/UI/Button.vue'
import icon from '/@/components/UI//Icon.vue'
import { getTimeLimit } from '/@/components/UI/use/useOptions'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'Manipulation',
  components: { Button, icon },
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
    const isAdmin = computed(() =>
      props.questionnaire.administrators.includes(useMe().traqID.value)
    )
    return {
      questionnaireLink,
      linkCopy,
      isLinkCopied,
      getTimeLimit,
      isAdmin
    }
  }
})
</script>

<style lang="scss" module>
.link {
  @include size-body;
  @include weight-bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: $accent-primary;
  text-decoration: none;
  text-align: center;
  align-items: flex-end;
  gap: 0.5rem;
  padding-left: 2rem;

  &:hover {
    color: $accent-primary-highlight;
  }
}
.icon {
  flex: none;
  right: 0.5rem;
}
</style>
