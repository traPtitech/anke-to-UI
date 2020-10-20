<template>
  <div :class="$style.container">
    <router-link :class="$style.title" to="/targeted">
      <img :class="$style.logo" src="/@/assets/anke-to_logo.png" />
    </router-link>
    <a :class="$style.help" href="https://wiki.trap.jp/SysAd/docs/anke-to">
      <icon name="help-circle-outline" />
    </a>
    <route />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Route from '/@/components/Routes.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Header',
  components: { Route, Icon },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  background-color: #dfe0d7;
  grid-area: header;
  display: flex;
  align-items: center;
}
.title {
  width: 8rem;
  padding: 0.5rem 0.7rem;
  .logo {
    width: 100%;
  }
}
.help {
  color: #92413b;
  margin: 0.4rem 2rem 0 0.5rem;
  &:hover {
    color: #cfb998;
  }
}
</style>
