<template>
  <div v-if="isOpen" :class="$style.dropdown_menu">
    <p
      v-for="(content, index) in contents"
      :key="index"
      :class="$style.contents"
    >
      {{ content.str }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DropdownSortOrders, DropdownTargetedOptions } from './use/useOptions'

export default defineComponent({
  name: 'DropdownContents',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    contents: {
      type: Array as PropType<DropdownSortOrders[] | DropdownTargetedOptions[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.dropdown_menu {
  position: absolute;
  .contents {
    background-color: #ffffff;
    box-shadow: 0.5 0 1 -0.3 rgba(10, 10, 10, 0.1);
    border: solid 0.01 #e7e7e7;
    border-radius: 0.3;
    margin: 0;
    padding: 0.5 1;
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f4ecec;
    }
  }
}
</style>
