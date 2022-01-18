<template>
  <icon v-if="isResponded" name="check" :class="$style.icon" :size="size" />
  <icon v-else name="alert" :class="$style.icon" :size="size" />
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

<style lang="scss" module>
.icon {
  min-height: 1rem;
  min-width: 1rem;
}
</style>
