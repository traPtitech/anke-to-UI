<template>
  <div :class="$style.container">
    <div :class="$style.sideBar">
      <transition name="sidebar">
        <side-bar v-if="!canSideBarShown" :class="$style.desktopSideBar" />
        <div v-else v-show="isSideBarShown">
          <side-bar :class="$style.mobileSideBar" />
        </div>
      </transition>
    </div>
    <transition name="overlay" :class="$style.overlay" @click="toggle">
      <div v-if="isSideBarShown && canSideBarShown" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from '/@/components/Navigation/SideBar.vue'

export default defineComponent({
  name: 'SideBarWrapper',
  components: {
    SideBar
  },
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
    return {
      toggle
    }
  }
})
</script>

<style lang="scss" module>
.sideBar {
  z-index: 10;
  position: relative;
  display: flex;
  flex: 1;
  min-height: 100%;
}
.desktopSideBar {
}
.mobileSideBar {
  position: absolute;
  min-height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;
}

:global {
  .sidebar-enter-active,
  .sidebar-leave-active {
    transform: translate(0px, 0px);
    transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1) 0ms;
  }
  .sidebar-enter-from,
  .sidebar-leave-to {
    transform: translateX(-200px) translateX(0px);
  }
  .overlay-enter-from,
  .overlay-leave-to {
    opacity: 0;
  }
}
</style>
