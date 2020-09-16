<template>
  <div :class="$style.wrapper">
    <div>
      <header :class="$style.title">自分の回答</header>
    </div>
    <responses-table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Routes from '/@/components/Routes.vue'
import ResponsesTable from '/@/components/Responses/ResponsesTable.vue'

export default defineComponent({
  name: 'Responses',
  component: {
    Routes,
    ResponsesTable
  }
})
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.title {
  font-size: 2em;
}
</style>
