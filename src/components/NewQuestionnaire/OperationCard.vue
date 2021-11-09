<template>
  <Card>
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
