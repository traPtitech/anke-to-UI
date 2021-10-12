<template>
  <button :class="$style.submit" @click="postQuestionnaire">
    <div>送信</div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '/@/store'
import apis from '/@/lib/apis'

export default defineComponent({
  name: 'SubmitButton',
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
.submit {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  color: #ffffff;
  background-color: #5abe5f;
  border: none;
  border-radius: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.75rem 1.75rem;
  transition: 0.2s;
  &:hover {
    background-color: #7cd481;
  }
}
</style>
