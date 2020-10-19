<template>
  <div :class="$style.container">
    <div>Targeted</div>
    <div>Administrates</div>
    <div>Responses</div>
    <div>Explorer</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {}
  }
})
</script>

<style module>
.container {
  grid-area: sidebar;
}
</style>
