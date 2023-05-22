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
  padding: 0.5rem 2rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  @include colors($ui-white, $accent-primary);
  text-decoration: none;
}
.secondary {
  @include colors($ui-primary, #00000000);
  border: solid 2px $ui-primary;
}
.text {
  @include size-body;
  @include weight-bold;
  margin-bottom: 0;
}
.icon {
  position: absolute;
  left: 1rem;
}
</style>
