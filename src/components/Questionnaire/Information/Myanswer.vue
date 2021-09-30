<template>
  <Card :class="$style.card">
    <template #header>自分の回答</template>
    <template #content>
      <ul>
        <li v-for="data in myresponses" :key="data.modified_at">
          <router-link :to="'/responses/' + data.responseID">{{
            data.submitted_at
          }}</router-link
          ><span></span>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'Myanswer',
  components: { Card },
  props: {
    myresponses: {
      type: Array as PropType<ResponseSummary[]>,
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
