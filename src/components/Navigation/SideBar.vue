<template>
  <div :class="$style.container">
    <router-link :class="$style.link" to="/targeted">Targeted</router-link>
    <router-link :class="$style.link" to="/administrates"
      >Administrates</router-link
    >
    <router-link :class="$style.link" to="/responses">Responses</router-link>
    <router-link :class="$style.link" to="/explorer">Explorer</router-link>
    <div :class="$style.border" />
    <router-link :class="$style.link" to="/questionnaires/new"
      >New Questionnaire</router-link
    >
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

<style lang="scss" module>
.container {
  background-color: #e0d1c5;
  grid-area: sidebar;
  text-align: left;
  min-width: fit-content;
  padding: 1rem;
}
.link {
  position: relative;
  display: table;
  color: #313033;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem;
  &::after {
    position: absolute;
    bottom: 3.5px;
    left: 0.2rem;
    content: '';
    width: 95%;
    height: 2px;
    background: #cfb998;
    transform: scale(0, 1);
    transform-origin: left top;
    transition: 0.3s;
  }
  &:hover::after {
    transform-origin: right top;
    transform: scale(1, 1);
  }
}
.border {
  background-color: #7c6c4d;
  height: 4px;
  margin: 0.3rem 0;
}
</style>
