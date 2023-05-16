<template>
  <div :class="$style.container">
    <QuestionCardBase :title="'タイトル'">
      <InputText
        v-model="newQuestionnaireData.title"
        :placeholder="'質問の回答を入力'"
        :is-textarea="true"
    /></QuestionCardBase>
    <QuestionCardBase :title="'説明'">
      <InputText
        v-model="newQuestionnaireData.description"
        :placeholder="'質問に関する説明を入力'"
        :is-textarea="true"
      />
    </QuestionCardBase>
    <IdTable v-model="newQuestionnaireData.administrators" :title="'管理者'" />
    <IdTable v-model="newQuestionnaireData.targets" :title="'対象者'" />
    <OpenRangeSelect v-model="newQuestionnaireData.res_shared_to" />
    <Deadline v-model="newQuestionnaireData.res_time_limit" />
    <ClearQuestionnaire @click="clear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watchEffect } from 'vue'
import { NewQuestionnaire } from '/@/lib/apis'
import QuestionCardBase from '/@/components/UI/QuestionCardBase.vue'
import InputText from '/@/components/UI/InputText.vue'
import OpenRangeSelect from './OpenRangeSelect.vue'
import Deadline from './Deadline.vue'
import IdTable from './IdTable.vue'
import ClearQuestionnaire from './ClearQuestionnaire.vue'

export default defineComponent({
  name: 'NewInformation',
  components: {
    QuestionCardBase,
    InputText,
    OpenRangeSelect,
    Deadline,
    IdTable,
    ClearQuestionnaire
  },
  props: {
    data: {
      type: Object as PropType<NewQuestionnaire>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:data': (data: NewQuestionnaire) => true,
    clear: () => true
  },
  setup(props, context) {
    const newQuestionnaireData = ref(props.data)
    const clear = () => {
      const result = confirm('アンケートを削除しますか？')
      if (result) {
        context.emit('clear')
      }
    }
    watchEffect(() => {
      context.emit('update:data', newQuestionnaireData.value)
    })
    return { newQuestionnaireData, clear }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.question {
  display: flex;
  flex-direction: row;
}
.border {
  border-right: 1px solid $ui-secondary;
  padding-right: 8px;
  margin-right: 8px;
}
</style>
