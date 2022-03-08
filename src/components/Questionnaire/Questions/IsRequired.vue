<template>
  <span v-if="required === true">
    <span :class="$style.required">必須</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'IsRequired',
  props: {
    required: {
      type: Object as PropType<boolean>,
      required: true
    }
  },

  setup() {
    return {}
  }
})
</script>
<style lang="scss" module>
.required {
  font-size: 12.8px;
  color: red;
}
</style>
