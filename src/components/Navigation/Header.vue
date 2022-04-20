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
    <user-icon :class="$style.icon" :user-name="myName" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserIcon from '/@/components/Navigation/UserIcon.vue'
import Icon from '/@/components/UI/Icon.vue'
import useMe from '/@/use/me'

export default defineComponent({
  name: 'Header',
  components: { UserIcon, Icon },
  props: {
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
    const { traqID: myName } = useMe()
    return {
      toggle,
      myName
    }
  }
})
</script>

<style lang="scss" module>
.container {
  background-color: $bg-secondary;
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
  color: $accent-primary;
  height: 24px;
  margin-left: 1rem;
  &:hover {
    color: $accent-primary-highlight;
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
