<template>
  <div :class="$style.container">
    <div :class="[$style.content, $style.keep]" @click="keep">
      <Icon :name="'content-save-all-outline'" />
      <div>{{ keeptxt }}</div>
    </div>
    <div :class="[$style.content, $style.answer]" @click="answer">
      <Icon :name="'send-circle'" />
      <div>{{ answertxt }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'KeepAnswerButton',
  components: {
    Icon
  },
  props: {
    keeptxt: {
      type: String,
      required: true
    },
    answertxt: {
      type: String,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    keep: () => true,
    answer: () => true
  },
  setup(props, context) {
    const keep = () => {
      context.emit('keep')
    }
    const answer = () => {
      context.emit('answer')
    }
    return { keep, answer }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.content {
  @include weight-bold;
  @include size-body-2;
  width: 132px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
}
.keep {
  border: 1px solid $ui-primary;
}
.answer {
  background-color: $accent-primary;
  color: $ui-white;
}
</style>
