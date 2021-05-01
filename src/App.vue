<template>
  <div :class="$style.container">
    <header-component />
    <div :class="$style.main">
      <side-bar v-if="!canSideBarShown" :class="$style.desktopSideBar" />
      <div v-else v-show="isSideBarShown" :class="$style.mobileSideBarWrapper">
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
  const { isOpen, toggle: sideBarShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isSideBarShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
  })

  return {
    isSideBarShown,
    canSideBarShown: readonly(isMobile),
    sideBarShown
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
      sideBarShown
    } = useNavigationShown()

    return {
      isSideBarShown,
      canSideBarShown,
      sideBarShown
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
}
.mobileSideBarWrapper {
}
.mobileSideBar {
}
</style>
