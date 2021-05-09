<template>
  <div :class="$style.container">
    <header-component
      :is-side-bar-shown="isSideBarShown"
      :can-side-bar-shown="canSideBarShown"
      @open="open"
    />
    <div :class="$style.main">
      <side-bar v-if="!canSideBarShown" :class="$style.desktopSideBar" />
      <div v-else v-show="isSideBarShown">
        <side-bar :class="$style.mobileSideBar" />
      </div>
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

const useNavigationShown = () => {
  const { isOpen, toggle: toggleSideBarShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isSideBarShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
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

    const open = () => {
      toggleSideBarShown()
    }

    return {
      isSideBarShown,
      canSideBarShown,
      toggleSideBarShown,
      open
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
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
  position: fixed;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  animation: slideIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) 1 forwards;
}

@keyframes slideIn {
  0% {
    transform: translateX(-180px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
  }
}
</style>
