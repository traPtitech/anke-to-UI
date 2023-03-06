<template>
  <div>
    <div :class="$style.clear">アンケートを削除</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClearQuestionnaire',
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.clear {
  color: $accent-error-highlight;
  cursor: pointer;
  @include size-body-small-4;
  margin-left: auto;
  margin-right: auto;
  width: 10rem;
}
</style>
