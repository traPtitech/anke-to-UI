<template>
  <div :class="$style.container">
    <div v-show="canSideBarShown" :class="$style.navIcon" @click="toggle">
      <icon v-if="!isSideBarShown" name="menu" />
      <icon v-else name="close" />
    </div>
    <router-link to="/targeted">
      <img :class="$style.logo" src="/@/assets/anke-to_logo.png" />
    </router-link>
    <a :class="$style.help" href="https://wiki.trap.jp/SysAd/docs/anke-to">
      <icon name="help-circle-outline" />
    </a>
    <user-icon :class="$style.icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserIcon from '/@/components/Navigation/UserIcon.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Header',
  components: { UserIcon, Icon },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    canSideBarShown: {
      type: Boolean,
      required: true
    },
    isSideBarShown: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    toggle: () => true
  },
  setup(props, context) {
    const toggle = () => {
      context.emit('toggle')
    }

    return {
      toggle
    }
  }
})
</script>

<style lang="scss" module>
.container {
  background-color: #dfe0d7;
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  z-index: 11;
}
.logo {
  max-height: 1.75rem;
  margin: 0 16px;
}
.help {
  color: #92413b;
  height: 24px;
  margin-left: 1rem;
  &:hover {
    color: #cfb998;
  }
}
.icon {
  margin-left: auto;
}
.navIcon {
  align-items: center;
  display: flex;
  cursor: pointer;
}
</style>
