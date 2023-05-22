<template>
  <div :class="$style.id">{{ id }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IdConteinerBase',
  props: {
    id: {
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
$height: 22px;
.id {
  width: fit-content;
  text-align: center;
  height: $height;
  padding: 2px 16px;
  background: $ui-white;
  border-radius: 4px;
  @include size-body-small-2;
  line-height: $height;
  color: $ui-primary;
}
</style>
