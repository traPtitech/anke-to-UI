<template>
      <Card :class="$style.card">
    <template #header>操作</template>
    <template #content>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '/@/components/UI/Card.vue'

export default defineComponent({
  components: { Card },
    setup() {
        
    },
})
</script>

