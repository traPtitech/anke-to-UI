<template>
  <span>
    <span @click="toggleShowColumn(headerKey)">
      <Icon :name="isShowColumn ? 'eye' : 'eye-closed'" />
    </span>
    <span>
      {{ headerName }}
    </span>
    <Icon name="chevron-up" />
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
    headerName: {
      type: String,
      required: true
    },
    headerKey: {
      type: Number,
      required: true
    },
    toggleShowColumn: {
      type: Function,
      required: true
    },
    isShowColumn: {
      type: Boolean,
      required: true
    }
  }
})
</script>
