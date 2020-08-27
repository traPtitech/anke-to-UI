<template>
  <div>
    <button @click="state.isOpen = !state.isOpen">
      <div class="dropdown-trigger">
        <p>{{ menuName }}</p>
        <span class="ti-angle-down"></span>
      </div>
    </button>
    <div v-if="state.isOpen" class="dropdown-menu">
      <p v-for="(content, key) in contents" :key="key">
        {{ content.str }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

export default {
  name: 'DropdownMenu',
  props: {
    menuName: {
      type: String,
      default: ''
    },
    contents: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
    const state = reactive({
      isOpen: false
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss">
.dropdown-trigger {
  position: relative;
  display: inherit;
  padding: 0.5em 1.5em;
  span {
    padding: 0.2em;
  }
  p {
    margin: 0 8px 0 0;
  }
}
.dropdown-menu {
  position: absolute;
  p {
    box-shadow: 0.5em 0 1em -0.3em rgba(10, 10, 10, 0.1);
    box-sizing: inherit;
    border: solid 0.01em #e7e7e7;
    border-radius: 0.3em;
    margin: 0;
    padding: 0.5em 1em;
    text-align: left;
    &:hover {
      background-color: #f4ecec;
    }
  }
}
</style>
