<template>
  <Card>
    <template #content>
      <div :class="$style.container">
        <div :class="$style.header">
          <div :class="$style.title">
            {{ title }}
          </div>
          <div v-if="isRequired" :class="$style.required">※必答</div>
        </div>
        <slot />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '/@/components/UI/Card.vue'

export default defineComponent({
  name: 'QuestionCardBase',
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title {
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  color: $ui-primary;
}
.required {
  font-size: 12px;
  line-height: 18px;
  margin-left: auto;
  color: $accent-error;
}
</style>
