<template>
  <transition
    :enter-active-class="$style.enter_active"
    :leave-active-class="$style.leave_active"
  >
    <div v-if="isOpen" :class="$style.dropdown_menu">
      <p
        v-for="(content, index) in contents"
        :key="index"
        :class="$style.contents"
      >
        {{ content.str }}
      </p>
    </div>
  </transition>
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
.enter-active {
  transition: opacity 0.5s;
}
.leave-active {
  transition: opacity 0.5s;
}
.dropdown_menu {
  position: absolute;
  margin-top: 0.5rem;
  .contents {
    background-color: #ffffff;
    box-shadow: 0.5rem 0rem 1rem -0.3rem rgba(10, 10, 10, 0.1);
    border: solid 0.01rem #e7e7e7;
    border-radius: 0.3;
    margin: 0;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f4ecec;
    }
  }
}
</style>
