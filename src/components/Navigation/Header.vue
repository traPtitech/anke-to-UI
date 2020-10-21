<template>
  <div :class="$style.container">
    <router-link :class="$style.title" to="/targeted">
      <img :class="$style.logo" src="/@/assets/anke-to_logo.png" />
    </router-link>
    <a :class="$style.help" href="https://wiki.trap.jp/SysAd/docs/anke-to">
      <icon name="help-circle-outline" />
    </a>
    <route />
    <user-icon :class="$style.icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Route from '/@/components/Routes.vue'
import UserIcon from '/@/components/Navigation/UserIcon.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Header',
  components: { Route, UserIcon, Icon },
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
  margin: 0.5rem 0.7rem;
  .logo {
    max-height: 1.75rem;
  }
}
.help {
  color: #92413b;
  height: 24px;
  margin-left: 0.5rem;
  &:hover {
    color: #cfb998;
  }
}
.icon {
  margin: 0 1rem 0 auto;
}
</style>
