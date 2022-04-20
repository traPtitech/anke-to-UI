<template>
  <div :class="$style.container">
    <div :class="$style.contents">
      <img :class="$style.logo" :src="Logo" />
      <p>Now Loading...</p>
      <icon :class="$style.icon" name="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import Logo from '/@/assets/anke-to_logo.png'

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    return {
      Logo
    }
  }
})
</script>

<style lang="scss" module>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contents {
  max-height: 600px;
}
.logo {
  max-height: 3rem;
  margin-bottom: 8rem;
}
.icon {
  animation-name: loading;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
}
@keyframes loading {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
