<template>
  <img
    :class="$style.icon"
    :src="`https://q.trap.jp/api/v3/public/icon/${userID}`"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UserIcon',
  props: {
    userID: {
      type: String,
      default: 'traP'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.icon {
  border-radius: 16px;
  width: 32px;
  height: 32px;
}
</style>
