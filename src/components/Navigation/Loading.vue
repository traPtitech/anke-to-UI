<template>
  <div>
    <img :class="$style.logo" src="/@/assets/anke-to_logo.png" />
    <p>Now Loading...</p>
    <icon :class="$style.icon" name="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  components: {
    Icon
  }
})
</script>

<style lang="scss" module>
.logo {
  max-height: 3rem;
  margin: 12rem auto;
  z-index: 10;
  position: relative;
  display: flex;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
}
.loading {
  width: 160px;
  height: 160px;
  border-radius: 150px;
  border: 15px solid #fff;
  border-top-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -80px;
  margin-left: -80px;
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
