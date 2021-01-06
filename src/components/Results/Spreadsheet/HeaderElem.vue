<template>
  <span>
    <span>
      <Icon name="eye" />
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
    }
  }
})
</script>
