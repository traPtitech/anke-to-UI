<template>
  <span>
    <span @click="toggleShowColumn">
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
    isShowColumn: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    toggleShowColumn: () => true
  },
  setup(_, context) {
    const toggleShowColumn = () => {
      context.emit('toggleShowColumn')
    }
    return { toggleShowColumn }
  }
})
</script>
