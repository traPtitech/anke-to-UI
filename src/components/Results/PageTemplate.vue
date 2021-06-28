<template>
  <header>
    <slot name="header"></slot>
  </header>
  <div>
    <slot name="content"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PageTemplate'
})
</script>
