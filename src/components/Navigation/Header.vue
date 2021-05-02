<template>
  <div :class="$style.container">
    <div v-show="canSideBarShown" @click="open">
      <icon v-if="!isSideBarShown" name="menu" />
      <icon v-else name="close" />
    </div>
    <router-link to="/targeted">
      <img :class="$style.logo" src="/@/assets/anke-to_logo.png" />
    </router-link>
    <a :class="$style.help" href="https://wiki.trap.jp/SysAd/docs/anke-to">
      <icon name="help-circle-outline" />
    </a>
    <route />
    <user-icon :class="$style.icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Route from '/@/components/Routes.vue'
import UserIcon from '/@/components/Navigation/UserIcon.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Header',
  components: { Route, UserIcon, Icon },
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
    open: () => true
  },
  setup(props, context) {
    const open = () => {
      context.emit('open')
    }

    return {
      open
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
}
.logo {
  max-height: 1.75rem;
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
.nav_icon {
  display: flex;
  @media (max-width: 1024px) {
    display: block;
  }
}

.icon {
  transition: 0.3s;
}
.rotate {
  transform: rotate(-90deg);
}
</style>
