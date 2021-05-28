<template>
  <div :class="$style.container">
    <div v-for="(link, index) in links" :key="index" :class="$style.link">
      <side-bar-link :title="link.title" :to="link.to" />
    </div>
    <div :class="$style.border" />
    <div :class="$style.link">
      <side-bar-link title="New Questionnaire" to="/questionnaires/new" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBarLink from '/@/components/Navigation/SideBarLink.vue'

export default defineComponent({
  name: 'SideBar',
  components: { SideBarLink },
  setup() {
    const links = [
      { title: 'Targeted', to: '/targeted' },
      { title: 'Administrates', to: '/administrates' },
      { title: 'Responses', to: '/responses' },
      { title: 'Explorer', to: '/explorer' }
    ]

    return { links }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  background-color: #e0d1c5;
  grid-area: sidebar;
  text-align: left;
  min-width: fit-content;
  padding: 1rem;
  box-sizing: border-box;
}
.link {
  padding: 0.5rem 0;
}
.border {
  background-color: #7c6c4d;
  height: 4px;
  margin: 0.3rem 0;
}
</style>
