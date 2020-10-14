<template>
  <span class="header-wrapper">
    <span class="header-icon-left" @click="toggleShowColumn(k)">
      <Icon
        :name="isColumnHidden(k) ? 'eye-closed' : 'eye'"
        color="var(--base-darkbrown)"
        class="clickable"
      />
    </span>
    <span class="header-label">
      {{ header }}
    </span>
    <Icon
      :name="sorted !== k + 1 ? 'chevron-up' : 'chevron-down'"
      @click="sort(k + 1)"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'HeaderElem',
  components: {
    Icon
  },
  props: {
    isColumnHidden: {
      type: Function,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    sorted: {
      type: [Number, String],
      required: true
    },
    sort: {
      type: Function,
      required: true
    },
    k: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {
    const toggleShowColumn = (k: number) =>
      context.emit('toggle-show-column', k)
    return {
      toggleShowColumn
    }
  }
})
</script>
