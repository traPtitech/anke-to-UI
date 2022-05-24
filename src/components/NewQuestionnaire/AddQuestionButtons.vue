<template>
  <button @click="isAppeared = !isAppeared">
    新しい質問を追加
    <Icon v-if="isAppeared" name="chevron-down" />
    <Icon v-if="!isAppeared" name="chevron-right" />
  </button>
  <div v-if="isAppeared">
    <button
      v-for="(questionType, key) in questionTypes"
      :key="key"
      @click="add(key)"
    >
      {{ questionType.label }}
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { questionTypes } from './use/utils'

export default defineComponent({
  name: 'AddQuestionButtons',
  components: {
    Icon
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add: (key: string) => true
  },
  setup(props, context) {
    const isAppeared = ref(false)
    const add = (key: string) => {
      context.emit('add', key)
    }
    return {
      isAppeared,
      add,
      questionTypes
    }
  }
})
</script>
