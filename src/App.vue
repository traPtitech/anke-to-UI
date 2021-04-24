<template>
  <div :class="$style.container">
    <header-component />
    <side-bar :class="$style.sidebar" />
    <main :class="$style.content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '/@/components/Navigation/Header.vue'
import SideBar from '/@/components/Navigation/SideBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
    SideBar
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
  grid-area: content;
  padding: 1.5rem;
}
.sidebar {
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
}
</style>
