<template>
  <router-link :class="$style.link" :to="to">{{ title }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBarLink',
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
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
.link {
  position: relative;
  display: table;
  color: #313033;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem;
  &::after {
    position: absolute;
    bottom: 3.5px;
    left: 0.2rem;
    content: '';
    width: 95%;
    height: 2px;
    background: #cfb998;
    transform: scale(0, 1);
    transform-origin: left top;
    transition: 0.3s;
  }
  &:hover::after {
    transform-origin: right top;
    transform: scale(1, 1);
  }
}
</style>
