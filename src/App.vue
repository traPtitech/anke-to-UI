<template>
  <div :class="$style.container">
    <header-component />
    <side-bar v-if="!canSideBarShown" :class="$style.desktopSideBar" />
    <div v-else v-show="isSideBarShown" :class="$style.mobileSideBarWrapper">
      <side-bar :class="$style.mobileSideBar" />
    </div>
    <main :class="$style.content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, watch, readonly } from 'vue'
import HeaderComponent from '/@/components/Navigation/Header.vue'
import SideBar from '/@/components/Navigation/SideBar.vue'
import useOpener from '/@/use/opener'
import useIsMobile from '/@/use/isMobile'
import { useStore } from 'vuex'

const useNavigationShown = () => {
  const { isOpen, toggle: sideBarShown } = useOpener()
  const { isMobile } = useIsMobile()

  const isSideBarShown = computed(() => !isMobile.value || isOpen.value)
  watch(isMobile, isMobile => {
    isOpen.value = !isMobile
  })

  return {
    isSideBarShown,
    canSideBarshown: readonly(isMobile),
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
      canSideBarshown,
      sideBarShown
    } = useNavigationShown()
    const store = useStore()
    const fetchedMe = computed(() => store.state.me !== null)

    onBeforeMount(() => {
      if (fetchedMe.value) return
      store.dispatch.fetchMe()
    })

    return {
      isSideBarShown,
      canSideBarshown,
      sideBarShown,
      fetchedMe
    }
  }
})
</script>

<style lang="scss" module>
.container {
  min-width: 100%;
  min-height: 100%;
  display: grid;
  position: relative;
  grid-template-areas:
    'header header'
    'sidebar content';
  grid-template-rows: min-content 1fr;
  grid-template-columns: max(12rem, 15%) 1fr;
}
.content {
  flex: 1;
  overflow: {
    x: hidden;
    y: scroll;
  }
}
.desktopSideBar {
  flex-shrink: 0;
}
.mobileSideBarWrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
.mobileSideBar {
  width: 260px;
  flex-shrink: 0;
}
</style>
