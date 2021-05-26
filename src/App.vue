<template>
  <div :class="$style.container">
    <header-component
      :is-side-bar-shown="isSideBarShown"
      :can-side-bar-shown="canSideBarShown"
      :class="$style.header"
      @toggle="toggleSideBarShown()"
    />
    <div :class="$style.main">
      <side-bar-wrapper
        :can-side-bar-shown="canSideBarShown"
        :is-side-bar-shown="isSideBarShown"
      />
      <main :class="$style.content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, readonly } from 'vue'
import HeaderComponent from '/@/components/Navigation/Header.vue'
import SideBarWrapper from '/@/components/Navigation/SideBarWrapper.vue'
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
    SideBarWrapper
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
  flex-shrink: 0;
}
.content {
  padding: 1.5rem;
}
.main {
  display: flex;
}
</style>
