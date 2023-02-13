<template>
  <div :class="$style.container">
    <input
      type="text"
      placeholder="アンケート名で検索"
      :class="$style.input"
      :value="modelValue"
      @input="update"
      @keypress.enter="search"
    />
    <button :class="[$style.button, $style.searchIcon]" @click="search">
      <icon name="magnify" :class="$style.icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'SearchInput',
  components: {
    Icon
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    search: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(props, context) {
    const update = (e: Event) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
    const search = () => {
      context.emit('search')
    }

    return { update, search }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  margin-right: auto;
}
.input {
  border: none;
  outline: none;
  border-radius: 0.25rem 0 0 0.25rem;
  width: 100%;
  padding-left: 1rem;
  &::placeholder {
    @include size-body-small-3;
    color: $ui-secondary;
  }
}
.searchIcon {
  display: flex;
  align-items: center;
  border-radius: 0 0.25rem 0.25rem 0;
  .icon {
    height: 1.25rem;
    width: 1.5rem;
    padding: 0.3rem;
    color: $ui-white;
  }
}
.button {
  background-color: $accent-primary;
  border: solid 0.1rem $accent-primary;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: $accent-primary-highlight;
    border: solid 0.1rem $accent-primary-highlight;
  }
}
</style>
