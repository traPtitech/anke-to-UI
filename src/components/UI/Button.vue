<template>
  <router-link
    :to="to"
    :class="[$style.container, isSecondary ? $style.secondary : '']"
  >
    <icon v-if="showIcon" :name="iconName" :class="$style.icon" />
    <div :class="$style.text">{{ text }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import icon from './Icon.vue'
export default defineComponent({
  name: 'Button',
  components: { icon },
  props: {
    showIcon: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String,
      default: 'chevron-down'
    },
    text: {
      type: String,
      default: 'Text'
    },
    to: {
      type: String,
      required: true
    },
    isSecondary: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem 1rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background-color: $accent-primary;
  transition: 0.3s;
  &:hover {
    background-color: $accent-primary-highlight;
  }
  color: $ui-white;
  text-decoration: none;
}
.secondary {
  color: $ui-primary;
  background-color: $bg-primary;
  &:hover {
    color: $ui-white;
    background-color: $ui-primary;
  }
  border: solid 2px $ui-primary;
}
.text {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0;
  line-height: 1.5rem;
}
.icon {
  position: absolute;
  left: 1rem;
}
</style>
