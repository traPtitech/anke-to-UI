<template>
  <div :class="$style.container">
    <header-component
      :is-side-bar-shown="isSideBarShown"
      :can-side-bar-shown="canSideBarShown"
      :class="$style.header"
      @toggle="toggleSideBarShown()"
    />
    <div :class="$style.main">
      <transition name="sidebar">
        <side-bar v-if="!canSideBarShown" :class="$style.desktopSideBar" />
        <div v-else v-show="isSideBarShown">
          <side-bar :class="$style.mobileSideBar" />
          <transition name="overlay">
            <div v-if="isSideBarShown" :class="$style.overlay"></div>
          </transition>
        </div>
      </transition>
      <main :class="$style.content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, readonly } from 'vue'
import HeaderComponent from '/@/components/Navigation/Header.vue'
import SideBar from '/@/components/Navigation/SideBar.vue'
import useOpener from '/@/use/opener'
import useIsMobile from '/@/use/isMobile'
import router from './router'

const useNavigationShown = () => {
  const { isOpen, toggle: toggleSideBarShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isSideBarShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
  })
  router.afterEach(() => {
    isOpen.value = false
  })

  return {
    isSideBarShown,
    canSideBarShown: readonly(isMobile),
    toggleSideBarShown
  }
}

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
    SideBar
  },
  setup() {
    const {
      isSideBarShown,
      canSideBarShown,
      toggleSideBarShown
    } = useNavigationShown()

    return {
      isSideBarShown,
      canSideBarShown,
      toggleSideBarShown
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
}
.header {
  flex-shrink: 1;
}
.content {
  padding: 1.5rem;
}
.main {
  display: flex;
}
.desktopSideBar {
  height: 100vh;
}
.mobileSideBar {
  position: absolute;
  height: 100vh;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
}

:global {
  .sidebar-enter-active,
  .sidebar-leave-active {
    transform: translate(0px, 0px);
    transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1) 0ms;
    height: 100vh;
    z-index: 10;
  }
  .sidebar-enter-from,
  .sidebar-leave-to {
    transform: translateX(-200px) translateX(0px);
    height: 100vh;
    z-index: 10;
  }
  .overlay-enter-active,
  .overlay-leave-active {
    transition: opacity 0.3s ease;
  }
  .overlay-enter-from,
  .overlay-leave-to {
    opacity: 0;
  }
}
</style>
