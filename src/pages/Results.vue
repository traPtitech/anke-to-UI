<template>
  <div>
    <div v-if="true" class="details is-fullheight">
      <ResultTab />
    </div>
    <div
      v-if="/* information.administrators && !canViewResults */ false"
      class="message is-danger"
    >
      <p class="message-body error-message">結果を閲覧する権限がありません</p>
    </div>
  </div>
</template>

<script lang="ts">
// import InformationSummary from '@/components/Information/InformationSummary'
import { defineComponent } from 'vue'
import ResultTab from '/@/components/Results/ResultTab.vue'

export default defineComponent({
  name: 'Results',
  components: {
    ResultTab
  }
})
</script>
