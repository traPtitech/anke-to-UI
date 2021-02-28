<template>
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot name="content"></slot>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PageTemplate'
})
</script>
