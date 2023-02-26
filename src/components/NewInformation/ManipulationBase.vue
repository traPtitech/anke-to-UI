<template>
  <div>
    <div :class="$style.head">
      <div :class="$style.title">{{ title }}</div>
      <slot name="title" :class="$style.button"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManipulationBase',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
}
.title {
  @include size-title;
  color: $ui-primary;
  text-align: left;
  flex-grow: 1;
}
</style>
