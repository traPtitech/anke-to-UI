<template>
  <router-link v-if="isInternallink" :class="$style.container" :to="to">
    <icon :name="name" />
    <div>{{ title }}</div>
  </router-link>
  <a v-else :class="$style.container" :href="to">
    <icon :name="name" />
    <div>{{ title }}</div>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'SideBarLink',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isInternallink = computed(() => {
      return !props.to.match(/^(http(s)?|ftp):\/\//)
    })
    return { isInternallink }
  }
})
</script>

<style lang="scss" module>
.container {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  @include size-head-small;
  @include weight-bold;
  gap: 8px;
  position: relative;
  padding: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.5rem 2rem;
  border-radius: 9999px;
  @include colors($ui-white, #00000000);
}
</style>
