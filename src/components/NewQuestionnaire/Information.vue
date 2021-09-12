<template>
  <Card :class="$style.card">
    <template #header>
      <InformationInput v-model="title" />
    </template>
    <template #content>
      <InformationTextarea v-model="description" />
      <TimeLimit v-model="date" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Card from '/@/components/UI/Card.vue'
import InformationInput from './InformationInput.vue'
import InformationTextarea from './InformationTextarea.vue'
import TimeLimit from './TimeLimit.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Card,
    InformationInput,
    InformationTextarea,
    TimeLimit
  },
  setup() {
    const title = ref('')
    const description = ref('')
    const date = ref(new Date())

    return { title, description, date }
  }
})
</script>

<style lang="scss" module>
.card {
  box-shadow: 0 0 0.5rem #00000030;
}
</style>
