<template>
  <div :class="$style.tableItemTitle">
    <switch-icon
      v-if="withIcon"
      :is-responded="isResponded"
      :size="iconsize"
      :class="$style.icon"
    />
    <router-link
      :to="`/questionnaires/${id}`"
      :class="$style.link"
      :style="fontSize"
    >
      {{ title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
    textsize: {
      type: Number,
      required: false,
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
  setup(props) {
    const fontSize = computed(() => `font-size: ${props.textsize}px;`)
    return {
      fontSize
    }
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
  color: #92413b;
  text-decoration: none;
  &:hover {
    color: #cfb998;
  }
  margin-left: 8px;
}
.icon {
  flex-shrink: 0;
}
</style>
