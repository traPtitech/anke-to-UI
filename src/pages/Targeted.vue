<template>
  <Card>
    <template #header>回答対象になっているアンケート</template>
    <template #content>
      <div :class="$style.test">
        <CardContentDetail />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '/@/components/UI/Card.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'

export default defineComponent({
  name: 'List',
  components: {
    Card,
    CardContentDetail
  }
})
</script>
<style lang="scss" module>
.test {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
  padding: 1rem;
}
</style>
