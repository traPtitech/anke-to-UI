<template>
  <Card>
    <template #header>操作</template>
    <template #content>
      <button :class="$style.button" @click="postQuestionnaire">
        <Icon name="file-plus" />
        <span>アンケートを作成</span>
      </button>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '/@/store'
import apis from '/@/lib/apis'
import Card from '/@/components/UI/Card.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  components: {
    Card,
    Icon
  },
  setup() {
    const store = useStore()
    const postQuestionnaire = () => {
      const newQuestionnaire = store.state.newQuestionnaire
      apis.postQuestionnaire(newQuestionnaire).then(() => {
        store.commit.clearNewQuestionnaire()
      })
    }

    return { postQuestionnaire }
  }
})
</script>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: solid 1px #cfb998;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem;
  margin: 1rem;
  &:hover {
    background-color: #f4ecec;
  }
}
</style>
