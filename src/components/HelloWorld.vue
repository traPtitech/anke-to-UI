<template>
  <h1>{{ msg }}</h1>
  <button @click="increment">count: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module
    <span :class="$style.re">replacement</span>.
  </p>
  <icon name="chevron-down" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Icon
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const count = computed(() => store.getters.countString)
    const { increment } = store.commit
    return { count, increment }
  }
})
</script>

<style module>
.re {
  font-weight: bold;
}
</style>
