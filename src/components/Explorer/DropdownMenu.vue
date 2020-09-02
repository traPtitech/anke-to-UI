<template>
  <div :class="$style.dropdown">
    <button :class="$style.button" @click="open">
      <div :class="$style.dropdown_trigger">
        <p :class="$style.title">{{ title }}</p>
        <icon name="chevron-down" :class="$style.icon" />
      </div>
    </button>
    <div v-if="isOpen" :class="$style.dropdown_menu">
      <p
        v-for="(content, index) in contents"
        :key="index"
        :class="$style.contents"
      >
        {{ content.str }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default {
  name: 'DropdownMenu',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    contents: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['open'],
  setup(props, { emit }) {
    const state = reactive({ isOpen: false })

    const open = (e: any) => {
      emit('open', e)
    }

    return {
      state,
      open
    }
  }
}
</script>

<style lang="scss" module>
.dropdown_trigger {
  position: relative;
  display: flex;
  padding: 0.3em 1em 0.3em 1.4em;
  .title {
    padding-top: 0.2em;
    margin: 0 0.3em 0 0;
  }
}
.dropdown_menu {
  position: absolute;
  .contents {
    background-color: #ffffff;
    box-shadow: 0.5em 0 1em -0.3em rgba(10, 10, 10, 0.1);
    box-sizing: inherit;
    border: solid 0.01em #e7e7e7;
    border-radius: 0.3em;
    margin: 0;
    padding: 0.5em 1em;
    text-align: left;
    cursor: pointer;
    &:hover {
      background-color: #f4ecec;
    }
  }
}
.button {
  background-color: #ffffff;
  border: solid 0.1em #cfb998;
  border-radius: 0.3em;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f4ecec;
  }
}
</style>
