<template>
  <button>
    新しい質問を追加
    <Icon name="chevron-down" />
  </button>
  <div>
    <button
      v-for="(questionType, key) in questionTypes"
      :key="key"
      @click="addQuestion(key)"
    >
      {{ questionType.label }}
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { questionTypes } from './use/utils'

export default defineComponent({
  name: 'AddButtons',
  components: {
    Icon
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addQuestion: (key: string) => true
  },
  setup(props, context) {
    const addQuestion = (key: string) => {
      context.emit('addQuestion', key)
    }
    return {
      addQuestion,
      questionTypes
    }
  }
})
</script>
