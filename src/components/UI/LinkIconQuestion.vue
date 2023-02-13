<template>
  <div :class="$style.tableItemTitle">
    <switch-icon
      v-if="withIcon"
      :is-responded="isResponded"
      :size="iconsize"
      :class="$style.icon"
    />
    <router-link :to="`/questionnaires/${id}`" :class="$style.link">
      {{ title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwitchIcon from '/@/components/UI/SwitchIcon.vue'

export default defineComponent({
  name: 'LinkIconQuestion',
  components: {
    SwitchIcon
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    iconsize: {
      type: Number,
      default: 24
    },
    isResponded: {
      type: Boolean,
      default: false
    },
    withIcon: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.tableItemTitle {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}
.link {
  cursor: pointer;
  color: $ui-primary;
  @include size-head-small;
  @include weight-bold;
  text-decoration: none;
  &:hover {
    opacity: 0.5;
  }
  margin-left: 8px;
}
.icon {
  flex-shrink: 0;
}
</style>
