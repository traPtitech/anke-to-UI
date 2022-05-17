<template>
  <button @click="Isappeared = !Isappeared">
    新しい質問を追加
    <Icon v-if="Isappeared" name="chevron-down" />
    <Icon v-if="!Isappeared" name="chevron-right" />
  </button>
  <div v-if="Isappeared">
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
    const Isappeared = ref(false)
    const add = (key: string) => {
      context.emit('add', key)
    }
    return {
      Isappeared,
      add,
      questionTypes
    }
  }
})
</script>
