<template>
  <div :class="$style.container">
    <div :class="$style.title">anke-to</div>
    <route />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Route from '/@/components/Routes.vue'

export default defineComponent({
  name: 'Header',
  components: { Route },
  setup() {
    return {}
  }
})
</script>

<style module>
.container {
  background-color: #dfe0d7;
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  padding: 1rem;
}
</style>
