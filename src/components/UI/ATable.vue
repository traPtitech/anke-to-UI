<template>
  <table :class="$style.tablecontainer">
    <tr :class="$style.header">
      <slot name="tableheader"></slot>
    </tr>
    <slot name="tablecontent"></slot>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ATable'
})
</script>

<style lang="scss" module>
.tablecontainer {
  min-width: 100%;
  font-size: 1rem;
  border-collapse: collapse;
}
.header {
  width: 100%;
  border-bottom: solid 2px #dbdbdb;
}
</style>
