<template>
  <div :class="$style.container">
    <router-link to="/targeted">Targeted</router-link>
    <router-link to="/administrates">Administrates</router-link>
    <router-link to="/responses">Responses</router-link>
    <router-link to="/explorer">Explorer</router-link>
    <div :class="$style.border" />
    <router-link to="/questionnaires/new">New Questionnaire</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {}
  }
})
</script>

<style module>
.container {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.border {
  background-color: #7c6c4d;
  height: 2px;
  width: 100%;
}
</style>
