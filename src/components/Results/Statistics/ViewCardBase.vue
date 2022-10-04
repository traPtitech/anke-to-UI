<template>
  <Card>
    <template #content>
      <div :class="$style.head">
        <div :class="$style.title">{{ title }}</div>
        <div :class="$style.copybutton">
          <icon :name="'content-copy'" @click="copy" />
        </div>
      </div>
      <slot name="statistics"></slot>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '/@/components/UI/Card.vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'ViewCardBase',
  components: {
    Card,
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    copy: () => true
  },
  setup(props, context) {
    const copy = () => {
      context.emit('copy')
    }
    return { copy }
  }
})
</script>

<style lang="scss" module>
.head {
  display: flex;
  flex-direction: row;
}
.title {
  @include size-body;
  @include font-bold;
}
.copybutton {
  cursor: pointer;
  position: relative;
  margin-left: auto;
}
</style>
