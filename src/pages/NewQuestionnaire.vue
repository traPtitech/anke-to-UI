<template>
  <Information />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Information from '/@/components/NewQuestionnaire/Information.vue'
import { useTitle } from './use/title'

export default defineComponent({
  name: 'NewQuestionnaire',
  components: {
    Information
  },
  setup() {
    useTitle(ref('新規アンケート作成'))
    return {}
  }
})
</script>
