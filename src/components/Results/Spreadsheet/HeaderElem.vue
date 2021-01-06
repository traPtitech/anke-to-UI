<template>
  <span>
    <span>
      <Icon name="eye" />
    </span>
    <span>
      {{ header }}
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
    header: {
      type: String,
      required: true
    },
    k: {
      type: Number,
      required: true
    }
  }
})
</script>
