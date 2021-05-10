<template>
  <input
    type="text"
    placeholder="検索"
    :class="$style.input"
    :value="modelValue"
    @input="update"
    @keypress.enter="search"
  />
  <button :class="[$style.button, $style.search_icon]" @click="search">
    <icon name="magnify" :class="$style.icon" />
  </button>
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
    const update = (e: InputEvent) => {
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
.input {
  border: solid 0.1rem #dbdbdb;
  border-radius: 0.3rem 0 0 0.3rem;
  padding-left: 0.8rem;
  &::placeholder {
    color: #dbdbdb;
  }
}
.search_icon {
  display: flex;
  align-items: center;
  border-radius: 0 0.3rem 0.3rem 0;
  .icon {
    height: 1.1rem;
    width: 1.1rem;
    padding: 0.3rem;
  }
}
.button {
  background-color: #ffffff;
  border: solid 0.1rem #cfb998;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f4ecec;
  }
}
</style>
