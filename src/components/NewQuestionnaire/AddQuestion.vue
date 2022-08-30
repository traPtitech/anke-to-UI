<template>
  <Card>
    <template #content>
      <div :class="$style.container">
        <Icon :class="$style.plus" :name="'plus'" />
        <InputText
          :class="$style.input"
          :placeholder="'新しい質問のタイトルを入力'"
          :is-hover="false"
          :model-value="''"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import Card from '/@/components/UI/Card.vue'
import InputText from '/@/components/UI/InputText.vue'

export default defineComponent({
  name: 'AddQuestion',
  components: {
    Icon,
    Card,
    InputText
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.plus {
  color: $ui-secondary;
}
.input {
  flex-grow: 1;
}
</style>
