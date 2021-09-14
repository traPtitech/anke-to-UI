<template>
  <Card :class="$style.card">
    <template #header>操作</template>
    <template #content>
      <button :class="$style.button">
        <Icon name="delete" />
        <span>アンケートを削除</span>
      </button>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '/@/components/UI/Card.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  components: {
    Card,
    Icon
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1px #e0d1c5;
  box-shadow: 0 0.25rem 0.5rem #00000030;
}
.button {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: solid 1px #cfb998;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem;
  margin: 1rem;
  &:hover {
    background-color: #f4ecec;
  }
}
</style>
