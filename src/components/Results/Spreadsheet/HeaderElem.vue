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
    <span
      class="header-icon-right clickable"
      :class="sorted !== k + 1 ? 'ti-angle-up' : 'ti-angle-down'"
      @click="sort(k + 1)"
    ></span>
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
    toggleshowColumn: {
      type: Function,
      required: true
    },
    isColumnHidden: {
      type: Function,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    sorted: {
      type: Boolean,
      required: true
    },
    sort: {
      type: Function,
      required: true
    }
  },
  setup() {}
})
</script>
