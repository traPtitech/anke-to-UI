<template>
  <Description />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Description from '/@/components/NewQuestionnaire/Description.vue'
import { useTitle } from './use/title'

export default defineComponent({
  name: 'NewQuestionnaire',
  components: {
    Description
  },
  setup() {
    useTitle(ref('新規アンケート作成'))
    return {}
  }
})
</script>
