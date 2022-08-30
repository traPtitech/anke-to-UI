<template>
  <div>
    <div v-show="headerVisible" :class="$style.header">
      <slot name="header"></slot>
    </div>
    <div :class="$style.content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardWithHeader', //paddingなし
  props: {
    headerVisible: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" module>
.header {
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem;
}
.content {
  background-color: $bg-secondary;
  border-radius: 8px;
}
</style>
