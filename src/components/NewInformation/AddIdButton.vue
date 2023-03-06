<template>
  <div :class="$style.plus">
    <Icon :class="$style.icon" :name="'plus'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'AddIdButton',
  components: {
    Icon
  }
})
</script>

<style lang="scss" module>
$height: 22px;
.plus {
  width: fit-content;
  height: $height;
  padding: 2px 16px;
  background: $ui-primary;
  border-radius: 4px;
  @include size-body-small-2;
  line-height: $height;
  color: $ui-primary;
  cursor: pointer;
}
.icon {
  color: $ui-white;
  padding: 1px;
}
</style>
