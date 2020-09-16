<template>
  <div class="wrapper">
    <List />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import List from '/@/components/Targeted/List.vue'

export default defineComponent({
  name: 'Targeted',
  components: {
    List
  }
})
</script>
