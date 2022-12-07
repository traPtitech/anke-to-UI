<template>
  <div :class="$style.container">
    <div v-show="canSideBarShown" :class="$style.navIcon" @click="toggle">
      <icon v-if="!isSideBarShown" name="menu" />
      <icon v-else name="close" />
    </div>
    <router-link to="/targeted">
      <img :class="$style.logo" :src="Logo" />
    </router-link>
    <user-icon :class="$style.icon" :user-name="myName" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserIcon from '/@/components/Navigation/UserIcon.vue'
import Icon from '/@/components/UI/Icon.vue'
import useMe from '/@/use/me'
import Logo from '/@/assets/anke-to_logo.png'

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
      myName,
      Logo
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
.icon {
  margin-left: auto;
}
.navIcon {
  align-items: center;
  display: flex;
  cursor: pointer;
}
</style>
