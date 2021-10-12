<template>
  <Card :class="$style.card">
    <template #header>
      <InformationInput v-model="title" />
    </template>
    <template #content>
      <InformationTextarea v-model="description" />
      <TimeLimit
        v-model:date="date"
        v-model:isTimeLimitNone="isTimeLimitNone"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useStore } from '/@/store'
import Card from '/@/components/UI/Card.vue'
import InformationInput from './InformationInput.vue'
import InformationTextarea from './InformationTextarea.vue'
import TimeLimit from './TimeLimit.vue'

export default defineComponent({
  name: 'QuestionnaireCard',
  components: {
    Card,
    InformationInput,
    InformationTextarea,
    TimeLimit
  },
  setup() {
    const store = useStore()

    const title = ref(store.state.newQuestionnaire.title)
    const description = ref(store.state.newQuestionnaire.description)
    const date = ref(new Date())
    if (store.state.newQuestionnaire.res_time_limit !== '') {
      date.value = new Date(store.state.newQuestionnaire.res_time_limit)
    }
    const isTimeLimitNone = ref(false)

    watchEffect(() => {
      const newQuestionnaire = store.state.newQuestionnaire
      newQuestionnaire.title = title.value
      newQuestionnaire.description = description.value
      if (isTimeLimitNone.value) {
        newQuestionnaire.res_time_limit = ''
      } else {
        newQuestionnaire.res_time_limit = date.value.toISOString()
      }

      store.commit.setNewQuestionnaire(newQuestionnaire)
    })

    return { title, description, date, isTimeLimitNone }
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1px #e0d1c5;
  box-shadow: 0 0.25rem 0.5rem #00000030;
}
</style>
