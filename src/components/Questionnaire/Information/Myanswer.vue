<template>
  <Card :class="$style.card">
    <template #header>自分の回答</template>
    <template #content>
      <!-- idを用いたvfor -->
      <router-link :to="'/responses/' + id">
        >
        <!-- {{ 回答時間 }} -->
      </router-link>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import { responsesがわかるようなapiがはいる } from '/@/lib/apis'

export default defineComponent({
  name: 'Myanswer',
  components: { Card },
  props: {
    questionnaire: {
      type: Object as PropType<>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  padding: 1rem;
}
</style>
