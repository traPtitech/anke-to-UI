<template>
  <icon v-if="isResponded" name="check" :size="size" />
  <icon v-else name="alert" :size="size" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'SwitchIcon',
  components: {
    Icon
  },
  props: {
    isResponded: {
      type: Boolean,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 24
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module></style>
