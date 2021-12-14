<template>
  <Card>
    <template #header>自分の回答</template>
    <template #content>
      <ul>
        <li v-for="data in myresponses" :key="data.modified_at">
          <router-link :to="`'/responses/'${data.responseID}`">{{
            data.submitted_at
          }}</router-link
          ><span>ゴミ箱</span>
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
