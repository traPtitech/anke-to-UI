<template>
  <input
    type="text"
    placeholder="検索"
    :class="$style.input"
    :value="modelValue"
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
    const search = () => {
      context.emit('search')
    }

    return { search }
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
  border-radius: 0 0.3rem 0.3rem 0;
  .icon {
    height: 1.5rem;
    width: 1.5rem;
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
