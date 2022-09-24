<template>
  <Card>
    <template #header>自分の回答</template>
    <template #content>
      <ul>
        <li v-for="data in myResponses" :key="data.modified_at">
          <router-link :to="`'/responses/'${data.responseID}`">{{
            data.submitted_at
          }}</router-link
          ><Icon :name="'trash-can-outline'" />
        </li>
      </ul>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import Icon from '/@/components/UI/Icon.vue'
import { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'MyAnswer',
  components: { Card, Icon },
  props: {
    myResponses: {
      type: Array as PropType<ResponseSummary[]>
    }
  },
  setup() {
    return {}
  }
})
</script>
