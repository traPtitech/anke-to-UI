<template>
  <img
    :class="$style.icon"
    :src="'https://q.trap.jp/api/v3/public/icon/' + userID"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UserIcon',
  setup() {
    const userID = 'traP'

    return { userID }
  }
})
</script>

<style lang="scss" module>
.icon {
  border-radius: 18px;
  width: 36px;
  height: 36px;
}
</style>
