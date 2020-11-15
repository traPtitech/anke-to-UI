<template>
  <div v-if="isFetched" :class="$style.container">
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
        @toggle="toggleSideBarShown()"
      />
      <main :class="$style.content">
        <router-view />
      </main>
    </div>
  </div>
  <div v-else>読み込み中…</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, readonly, ref, onMounted } from 'vue'
import HeaderComponent from '/@/components/Navigation/Header.vue'
import SideBarWrapper from '/@/components/Navigation/SideBarWrapper.vue'
import useOpener from '/@/use/opener'
import useIsMobile from '/@/use/isMobile'
import router from './router'
import { useStore } from '/@/store'

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
    const { isSideBarShown, canSideBarShown, toggleSideBarShown } =
      useNavigationShown()

    const isFetched = ref(false)
    onMounted(async () => {
      await store.dispatch.fetchMe()
      isFetched.value = true
    })

    return {
      isSideBarShown,
      canSideBarShown,
      toggleSideBarShown,
      isFetched
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  flex-shrink: 0;
}
.content {
  padding: 1.5rem;
  overflow-y: auto;
  width: 100%;
}
.main {
  display: flex;
  flex: 1;
  min-height: 0;
}
</style>
