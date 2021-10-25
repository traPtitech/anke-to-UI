<template>
  <img :class="$style.icon" :src="iconUri" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'UserIcon',
  props: {
    userName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const iconUri = computed(
      () => `https://q.trap.jp/api/v3/public/icon/${props.userName}`
    )
    return { iconUri }
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
