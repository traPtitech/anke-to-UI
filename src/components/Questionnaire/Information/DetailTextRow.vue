<template>
  <div :class="[$style.container, isMobile ? $style.mobile : '']">
    <div :class="$style.term">
      {{ term }}
    </div>
    <div :class="$style.description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useIsMobile from '/@/use/isMobile'

export default defineComponent({
  name: 'DetailTextRow',
  props: {
    term: {
      type: String,
      default: 'Text',
      required: true
    },
    description: {
      type: String,
      default: 'Text',
      required: true
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    return { isMobile: isMobile }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  gap: 2rem;
  font-weight: 700;
  font-size: 0.875rem;
  text-align: left;
}
.mobile {
  flex-direction: column;
  gap: 0.5rem;
}
.term {
  width: 5rem;
  color: $ui-secondary;
}
.description {
  width: 100%;
  color: $ui-primary;
}
</style>
