<template>
  <div>
    <router-link :to="{ name: 'index' }">Index</router-link>
    <span>|</span>
    <router-link :to="{ name: 'hello' }">Hello</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Routes',
  setup() {
    const pages = [
      { path: '/', name: 'Home' },
      { path: '/explorer', name: 'Explorer' },
      { path: '/responses', name: 'Responses' },
      { path: '/targeted', name: 'Targeted' },
      { path: '/results', name: 'Results' }
    ]

    return { pages }
  }
})
</script>

<style module>
.re {
  font-weight: bold;
}
</style>
