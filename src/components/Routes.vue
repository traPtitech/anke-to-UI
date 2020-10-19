<template>
  <div>
    <router-link :to="pages[0].path">{{ pages[0].name }}</router-link>
    <template v-for="page in pages.slice(1)" :key="page.path">
      <span>|</span>
      <router-link :to="page.path">
        {{ page.name }}
      </router-link>
    </template>
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
      { path: '/targeted', name: 'Targeted' }
    ]

    return { pages }
  }
})
</script>

<style lang="scss" module>
.re {
  font-weight: bold;
}
</style>
