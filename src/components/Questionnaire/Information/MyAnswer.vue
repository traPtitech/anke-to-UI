<template>
  <CardWithHeader>
    <template #header>自分の回答</template>
    <template #content>
      <ul>
        <li v-for="data in myResponses" :key="data.modified_at">
          <router-link :to="`/responses/${data.responseID}`">{{
            data.submitted_at
          }}</router-link
          ><Icon :name="'trash-can-outline'" />
        </li>
      </ul>
    </template>
  </CardWithHeader>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CardWithHeader from '/@/components/UI/CardWithHeader.vue'
import Icon from '/@/components/UI/Icon.vue'
import { ResponseSummary } from '/@/lib/apis'

export default defineComponent({
  name: 'MyAnswer',
  components: { CardWithHeader, Icon },
  props: {
    myResponses: {
      type: Array as PropType<ResponseSummary[]>,
      default: []
    }
  },
  setup() {
    return {}
  }
})
</script>
